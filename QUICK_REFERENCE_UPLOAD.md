# Quick Reference: Upload Lecture Video

## API Flow

```
┌─────────────────────────────────────────────────────┐
│  1. User selects video file and enters metadata    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  2. POST /api/admin/lectures/create                │
│     ├─ Backend creates lecture record              │
│     └─ Returns upload_url & AccessKey              │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  3. PUT [upload_url] (Bunny.net)                   │
│     ├─ Headers: { AccessKey, Content-Type }        │
│     ├─ Body: raw video binary                      │
│     └─ Track progress with XMLHttpRequest          │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  4. Success/Error handling & UI updates            │
└─────────────────────────────────────────────────────┘
```

## Function: uploadLectureVideo

```typescript
uploadLectureVideo(
  file: File,                    // Video file to upload
  lectureMeta: LectureMeta,      // Lecture metadata
  apiFetch: Function,            // API fetch function
  onProgress?: (p: number) => void  // Progress callback (0-100)
): Promise<UploadResult>
```

### Returns
```typescript
{
  success: true,
  lectureId: string,
  videoUrl: string
}
// OR
{
  success: false,
  error: string
}
```

## Lecture Metadata Object

```typescript
interface LectureMeta {
  fileName: string;              // "lecture.mp4"
  name: string;                  // "Anatomy 101"
  description: string;           // "Introduction to human anatomy"
  course: string;                // "Anatomy"
  tags?: string[];               // ["Anatomy", "Biology"]
  user_restriction?: string;     // "All Users" | "Premium Users" | "Admins Only"
  quiz_blocks?: number[];        // [1, 2, 3]
  additional_file_name?: string; // "notes.pdf"
}
```

## Usage Example

```typescript
import { uploadLectureVideo, formatFileSize } from "../../utils/uploadLectureVideo";

const handleUpload = async () => {
  setUploading(true);
  setError(null);

  try {
    const result = await uploadLectureVideo(
      videoFile,
      {
        fileName: videoFile.name,
        name: "My Lecture",
        description: "Description",
        course: "Anatomy",
        tags: ["tag1", "tag2"],
      },
      apiFetch,
      (progress) => setProgress(progress)
    );

    if (result.success) {
      toast.success("Upload complete!");
    } else {
      toast.error(result.error);
    }
  } catch (err) {
    toast.error("Upload failed");
  } finally {
    setUploading(false);
  }
};
```

## Progress Display

```tsx
<div className="w-full bg-gray-300 rounded-full h-2">
  <div
    className="bg-blue-600 h-full transition-all"
    style={{ width: `${uploadProgress}%` }}
  />
</div>
<span>{uploadProgress}%</span>
```

## File Validation

```typescript
import { validateVideoFile } from "../../utils/uploadLectureVideo";

const validation = validateVideoFile(file, ["video/mp4"]);
if (!validation.valid) {
  console.error(validation.error);
  // "Invalid file type. Allowed types: video/mp4"
}
```

## Format File Size

```typescript
import { formatFileSize } from "../../utils/uploadLectureVideo";

const size = formatFileSize(1048576); // "1 MB"
const size = formatFileSize(5368709120); // "5 GB"
```

## Key Points

✅ **File is uploaded as binary**, not JSON or form-data
✅ **Progress tracking** works with XMLHttpRequest
✅ **Upload URL expires** after 1 hour  
✅ **Single-use URLs** - cannot reuse
✅ **Large files** supported
✅ **Proper error handling** with user feedback
✅ **Clean separation** between lecture creation and video upload

## Common Issues

| Issue | Solution |
|-------|----------|
| Upload URL not found | Backend must return `upload_info` in response |
| Progress not updating | Check XMLHttpRequest `upload.progress` event |
| File appears as 0% | Very small files may complete instantly |
| Upload timeout | Check network, file size, CDN status |
| Access denied (403) | Verify AccessKey header is correct |

## Component Props/States

```typescript
// UploadLecturePopupFlow.tsx
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isUploading, setIsUploading] = useState(false);
const [uploadProgress, setUploadProgress] = useState<number>(0);
const [uploadError, setUploadError] = useState<string | null>(null);
const [title, setTitle] = useState("");
const [subTitle, setSubTitle] = useState("");
const [selectedCourse, setSelectedCourse] = useState("Course");
const [tags, setTags] = useState<string[]>([]);
const [selectedUserRestriction, setSelectedUserRestriction] = useState("All Users");
const [selectedQuizBlocks, setSelectedQuizBlocks] = useState<{ id: number; name: string }[]>([]);
const [selectedAdditionalFile, setSelectedAdditionalFile] = useState<File | null>(null);
```

## Backend Integration

Your backend `/api/admin/lectures/create` endpoint should:

1. **Accept** POST with lecture metadata
2. **Create** lecture record in database
3. **Generate** upload credentials from Bunny.net CDN
4. **Return** response with:
   ```json
   {
     "id": "lecture_id",
     "upload_info": {
       "upload_url": "https://bunny-cdn/...",
       "headers": {
         "AccessKey": "your-key"
       },
       "expires_in": 3600
     }
   }
   ```

The frontend handles the actual video upload to Bunny.net - **NOT through your backend**.
