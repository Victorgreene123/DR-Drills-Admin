# Backend Implementation Reference

## Overview

The backend needs to handle lecture creation and provide Bunny.net upload credentials. The actual video upload happens on the frontend directly to Bunny.net.

## Endpoint: POST /api/admin/lectures/create

### Request Schema

```typescript
{
  fileName: string;                  // "lecture.mp4"
  name: string;                      // "Lecture Title"
  description: string;               // "Description"
  course: string;                    // "Anatomy"
  tags?: string[];                   // ["tag1", "tag2"]
  user_restriction?: string;         // "All Users" | "Premium Users" | "Admins Only"
  quiz_blocks?: number[];            // [1, 2, 3]
  additional_file_name?: string;     // "notes.pdf" or null
}
```

### Response Schema

```typescript
{
  id: string;                        // Lecture ID
  upload_info: {
    upload_url: string;              // Bunny.net upload URL
    headers: {
      AccessKey: string;             // Bunny.net access key
    };
    expires_in: number;              // Expiration time in seconds (3600 = 1 hour)
  };
  // ... other lecture data
}
```

## Implementation Examples

### Node.js/Express

```typescript
import express from "express";
import { authenticateUser } from "./middleware/auth";
import { validateLectureInput } from "./validators";

const router = express.Router();

router.post(
  "/admin/lectures/create",
  authenticateUser,
  async (req, res) => {
    try {
      const { fileName, name, description, course, tags, user_restriction, quiz_blocks, additional_file_name } = req.body;

      // Validate input
      const validation = validateLectureInput(req.body);
      if (!validation.valid) {
        return res.status(400).json({ message: validation.error });
      }

      // Create lecture record in database
      const lecture = await Lecture.create({
        fileName,
        name,
        description,
        course,
        tags: tags || [],
        user_restriction: user_restriction || "All Users",
        quiz_blocks: quiz_blocks || [],
        additional_file_name,
        created_by: req.user.id,
        status: "uploading", // Will be "published" after video upload
      });

      // Generate Bunny.net upload credentials
      const bunnyUploadInfo = await generateBunnyUploadUrl(
        lecture.id,
        fileName
      );

      // Return response
      res.json({
        id: lecture.id,
        upload_info: {
          upload_url: bunnyUploadInfo.uploadUrl,
          headers: {
            AccessKey: bunnyUploadInfo.accessKey,
          },
          expires_in: 3600, // 1 hour
        },
      });
    } catch (error) {
      console.error("Error creating lecture:", error);
      res.status(500).json({ message: "Failed to create lecture" });
    }
  }
);

// Helper to generate Bunny.net upload URL
async function generateBunnyUploadUrl(
  lectureId: string,
  fileName: string
): Promise<{ uploadUrl: string; accessKey: string }> {
  const bunnyApiKey = process.env.BUNNY_API_KEY;
  const bunnyStorageName = process.env.BUNNY_STORAGE_NAME;

  // Generate unique upload path
  const uploadPath = `lectures/${lectureId}/${fileName}`;

  // Create signed URL (Bunny.net specific implementation)
  const uploadUrl = `https://storage.bunnycdn.com/${bunnyStorageName}/${uploadPath}`;

  // Get access token from Bunny.net API
  const accessKey = bunnyApiKey; // Simplified - use proper token generation

  return {
    uploadUrl,
    accessKey,
  };
}

export default router;
```

### Python/Django

```python
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Lecture
from .serializers import LectureSerializer
import requests
import os

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_lecture(request):
    try:
        data = request.data
        
        # Validate input
        if not all(k in data for k in ['fileName', 'name', 'description', 'course']):
            return Response(
                {'message': 'Missing required fields'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create lecture record
        lecture = Lecture.objects.create(
            file_name=data['fileName'],
            name=data['name'],
            description=data['description'],
            course=data['course'],
            tags=data.get('tags', []),
            user_restriction=data.get('user_restriction', 'All Users'),
            quiz_blocks=data.get('quiz_blocks', []),
            additional_file_name=data.get('additional_file_name'),
            created_by=request.user,
            status='uploading'
        )
        
        # Generate Bunny.net upload credentials
        upload_info = generate_bunny_upload_url(
            str(lecture.id),
            data['fileName']
        )
        
        return Response({
            'id': str(lecture.id),
            'upload_info': {
                'upload_url': upload_info['upload_url'],
                'headers': {
                    'AccessKey': upload_info['access_key']
                },
                'expires_in': 3600
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"Error creating lecture: {str(e)}")
        return Response(
            {'message': 'Failed to create lecture'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def generate_bunny_upload_url(lecture_id: str, file_name: str) -> dict:
    bunny_api_key = os.getenv('BUNNY_API_KEY')
    bunny_storage_name = os.getenv('BUNNY_STORAGE_NAME')
    
    upload_path = f"lectures/{lecture_id}/{file_name}"
    upload_url = f"https://storage.bunnycdn.com/{bunny_storage_name}/{upload_path}"
    
    return {
        'upload_url': upload_url,
        'access_key': bunny_api_key
    }
```

### Java/Spring Boot

```java
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class LectureController {
    
    private final LectureService lectureService;
    
    @PostMapping("/lectures/create")
    public ResponseEntity<?> createLecture(
        @RequestBody CreateLectureRequest request,
        @AuthenticationPrincipal UserPrincipal user
    ) {
        try {
            // Validate input
            if (!isValidLectureRequest(request)) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse("Invalid input", false));
            }
            
            // Create lecture
            Lecture lecture = lectureService.createLecture(request, user.getId());
            
            // Get Bunny.net credentials
            UploadInfo uploadInfo = lectureService.generateBunnyUploadUrl(
                lecture.getId(),
                request.getFileName()
            );
            
            CreateLectureResponse response = CreateLectureResponse.builder()
                .id(lecture.getId())
                .uploadInfo(uploadInfo)
                .build();
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error creating lecture", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Failed to create lecture", false));
        }
    }
}

@Service
@RequiredArgsConstructor
public class LectureService {
    
    private final LectureRepository lectureRepository;
    private final BunnyService bunnyService;
    
    public Lecture createLecture(CreateLectureRequest request, Long userId) {
        Lecture lecture = Lecture.builder()
            .fileName(request.getFileName())
            .name(request.getName())
            .description(request.getDescription())
            .course(request.getCourse())
            .tags(request.getTags())
            .userRestriction(request.getUserRestriction() != null ? 
                request.getUserRestriction() : "All Users")
            .quizBlocks(request.getQuizBlocks())
            .additionalFileName(request.getAdditionalFileName())
            .createdBy(userId)
            .status("uploading")
            .build();
        
        return lectureRepository.save(lecture);
    }
    
    public UploadInfo generateBunnyUploadUrl(String lectureId, String fileName) {
        String uploadPath = String.format("lectures/%s/%s", lectureId, fileName);
        String uploadUrl = bunnyService.generateUploadUrl(uploadPath);
        String accessKey = System.getenv("BUNNY_API_KEY");
        
        return UploadInfo.builder()
            .uploadUrl(uploadUrl)
            .headers(Map.of("AccessKey", accessKey))
            .expiresIn(3600)
            .build();
    }
}
```

## Key Backend Responsibilities

1. **Validate Input**: Check all required fields are present
2. **Database Record**: Create lecture entry in pending/uploading state
3. **Bunny.net Integration**: Generate upload URL and access credentials
4. **Return Response**: Include upload info for frontend
5. **Security**: Ensure user is authenticated and authorized
6. **Error Handling**: Return appropriate error messages

## Bunny.net Integration

### API Documentation Reference

```bash
# Generate upload URL (example using Bunny.net)
curl -X GET \
  "https://api.bunnycdn.com/storagezone/{StorageZoneName}/generateSignedUrl?token={APIKey}&expires=3600&path=lectures/{lectureId}/{fileName}" \
  -H "Accept: application/json"
```

### Environment Variables

```env
BUNNY_API_KEY=your_api_key
BUNNY_STORAGE_NAME=your_storage_zone
BUNNY_REGION=de  # or other region
```

## Database Schema Example

### Lecture Table

```sql
CREATE TABLE lectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  course VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  user_restriction VARCHAR(50) DEFAULT 'All Users',
  quiz_blocks INTEGER[] DEFAULT '{}',
  additional_file_name VARCHAR(255),
  video_url VARCHAR(500),  -- Set after upload completes
  status VARCHAR(50) DEFAULT 'uploading',  -- 'uploading', 'published', 'failed'
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

## Video Upload Completion Webhook (Optional)

If using Bunny.net webhooks to detect completion:

```typescript
@PostMapping("/webhooks/bunny/upload-complete")
public ResponseEntity<?> onBunnyUploadComplete(
    @RequestBody BunnyWebhookPayload payload
) {
    try {
        // Extract lecture ID from path
        String lectureId = extractLectureIdFromPath(payload.getPath());
        
        // Update lecture status to published
        Lecture lecture = lectureRepository.findById(lectureId);
        lecture.setStatus("published");
        lecture.setVideoUrl(payload.getUrl());
        lectureRepository.save(lecture);
        
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        log.error("Error processing webhook", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
```

## Testing

### Test the Endpoint

```bash
curl -X POST http://localhost:3000/api/admin/lectures/create \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "lecture.mp4",
    "name": "Anatomy 101",
    "description": "Introduction to anatomy",
    "course": "Anatomy",
    "tags": ["anatomy", "biology"],
    "user_restriction": "All Users",
    "quiz_blocks": [1, 2],
    "additional_file_name": "notes.pdf"
  }'
```

Expected Response:
```json
{
  "id": "lecture-uuid",
  "upload_info": {
    "upload_url": "https://storage.bunnycdn.com/zone/lectures/lecture-uuid/lecture.mp4",
    "headers": {
      "AccessKey": "your-api-key"
    },
    "expires_in": 3600
  }
}
```

## Security Considerations

1. **API Authentication**: Verify user is authenticated and authorized
2. **Access Control**: Only admins can create lectures
3. **Rate Limiting**: Prevent upload abuse
4. **Bunny.net Security**: Use separate API keys for production
5. **HTTPS Only**: All endpoints must use HTTPS
6. **Input Validation**: Sanitize file names and metadata
7. **Audit Logging**: Log all lecture creation attempts

## Monitoring

```typescript
// Log lecture creation
logger.info('Lecture created', {
  lectureId: lecture.id,
  fileName: lecture.file_name,
  createdBy: user.id,
  timestamp: new Date()
});

// Monitor upload completion
logger.info('Video upload started', {
  lectureId,
  fileSize: fileName,
  uploadUrl: masked_url
});
```

## Next Steps

1. Implement the endpoint in your backend framework
2. Configure Bunny.net API credentials
3. Test with the frontend implementation
4. Add webhook handlers for completion tracking
5. Set up monitoring and error handling
