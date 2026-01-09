# Lecture Video Upload Implementation Guide

## Overview

This implementation provides a two-step lecture upload flow for the admin dashboard:

1. **Lecture Creation**: POST to backend to create lecture and obtain upload credentials
2. **Direct Video Upload**: PUT the video file directly to Bunny.net CDN

The system properly handles:
- Progress tracking with real-time feedback
- Proper error handling and recovery
- Single-use, time-limited upload URLs
- Large video file support

## Architecture

### Files

1. **`src/utils/uploadLectureVideo.ts`** - Core upload logic
   - `uploadLectureVideo()` - Main orchestration function
   - `createLectureAndGetUploadUrl()` - Step 1: Create lecture on backend
   - `uploadVideoToBunny()` - Step 2: Upload video to Bunny.net
   - Utility functions: `formatFileSize()`, `validateVideoFile()`

2. **`src/components/popups/UploadLecturePopupFlow.tsx`** - UI Component
   - Step 1: File selection with drag-and-drop
   - Step 2: Metadata entry (title, description, course, tags, etc.)
   - Real-time upload progress display
   - Error handling and retry capability

## How It Works

### Step 1: Lecture Creation

```typescript
const lectureResponse = await createLectureAndGetUploadUrl(apiFetch, lectureMeta);
```

**Request:**
```json
POST /api/admin/lectures/create
{
  "fileName": "lecture.mp4",
  "name": "Lecture Title",
  "description": "Lecture description",
  "course": "Anatomy",
  "tags": ["tag1", "tag2"],
  "user_restriction": "All Users",
  "quiz_blocks": [1, 2, 3],
  "additional_file_name": "notes.pdf" (optional)
}
```

**Response:**
```json
{
  "id": "lecture_123",
  "upload_info": {
    "upload_url": "https://bunny-cdn.com/upload/xyz",
    "headers": {
      "AccessKey": "your-access-key"
    },
    "expires_in": 3600
  }
}
```

### Step 2: Video Upload to Bunny.net

```typescript
await uploadVideoToBunny(
  file,
  uploadInfo.upload_url,
  uploadInfo.headers.AccessKey,
  (progress) => console.log(`Upload: ${progress}%`)
);
```

**Request:**
```
PUT https://bunny-cdn.com/upload/xyz
Headers:
  AccessKey: your-access-key
  Content-Type: video/mp4
Body: (binary video data)
```

## Usage in Component

### Basic Implementation

```typescript
import {
  uploadLectureVideo,
  formatFileSize,
  validateVideoFile,
} from "../../utils/uploadLectureVideo";

// In your component
const handlePublish = async () => {
  const lectureMeta = {
    fileName: selectedFile.name,
    name: title,
    description: subTitle,
    course: selectedCourse,
    tags: tags,
    user_restriction: selectedUserRestriction,
    quiz_blocks: selectedQuizBlocks.map((b) => b.id),
    additional_file_name: selectedAdditionalFile?.name || null,
  };

  const result = await uploadLectureVideo(
    selectedFile,
    lectureMeta,
    apiFetch,
    (progress) => setUploadProgress(progress) // Progress callback (0-100)
  );

  if (result.success) {
    toast.success("Lecture created successfully!");
  } else {
    toast.error(result.error);
  }
};
```

## UI Features

### File Selection (Step 1)
- **Drag and Drop**: Drop video files directly
- **File Browser**: Click "Select from device" button
- **Validation**: Only MP4 files accepted
- **Real-time Feedback**: Toast notifications for errors

### Metadata Entry (Step 2)
- **Title**: Lecture name (max 100 chars)
- **Subtitle**: Short description (max 100 chars)
- **Course**: Dropdown selection
- **Tags**: Multi-select with suggestions
- **User Restriction**: Access level control
- **Quiz Blocks**: Optional practice quizzes
- **Additional Resources**: PDF file upload
- **Video Preview**: Local video preview

### Upload Progress
- **Progress Bar**: Real-time percentage display
- **Status Indicator**: "Uploading... X%"
- **Error Display**: Clear error messages if upload fails
- **URL Info**: Displays upload URL expiration details

## Error Handling

The system handles several error scenarios:

### Validation Errors
```typescript
// File validation
const validation = validateVideoFile(file);
if (!validation.valid) {
  console.error(validation.error); // "Invalid file type..."
}

// Form validation
if (!title.trim()) {
  toast.error("Please enter a lecture title");
}
```

### Upload Errors
```typescript
{
  success: false,
  error: "Network error during upload" | 
         "Upload failed with status 403" |
         "Session expired. Please log in again."
}
```

### Retry Logic
- Upload failures display error message
- User can modify form and try again
- Error state is cleared on new upload attempt

## Important Constraints

1. **Upload URL Expiration**: URLs expire after 1 hour
2. **Single-Use URLs**: Each URL can only be used once
3. **File Size**: Large video files are supported
4. **Content-Type**: Must match video file MIME type
5. **No JSON/Form-Data**: Video sent as raw binary data

## Progress Tracking

Progress is tracked via XMLHttpRequest's upload event:

```typescript
xhr.upload.addEventListener("progress", (event) => {
  const percentComplete = (event.loaded / event.total) * 100;
  onProgress(percentComplete); // 0-100
});
```

Provides accurate byte-level progress for large files.

## Security

1. **Access Key**: Passed in headers, never in URL
2. **Single-Use URLs**: Cannot be reused
3. **Time-Limited**: URLs expire automatically
4. **Auth Headers**: API calls include Bearer token
5. **HTTPS Only**: All connections encrypted

## Testing

### Test Upload
```typescript
const file = new File(["test"], "test.mp4", { type: "video/mp4" });
const lectureMeta = {
  fileName: "test.mp4",
  name: "Test Lecture",
  description: "Test",
  course: "Anatomy",
};

const result = await uploadLectureVideo(file, lectureMeta, apiFetch);
console.log(result);
```

### Monitor Progress
```typescript
const result = await uploadLectureVideo(
  file,
  lectureMeta,
  apiFetch,
  (progress) => console.log(`${progress}% uploaded`)
);
```

## Troubleshooting

### Upload Fails with 403
- Check if AccessKey is valid
- Verify upload URL hasn't expired (1 hour limit)
- Ensure URL hasn't been used before (single-use)

### Progress Shows 0%
- Check file size
- Verify XMLHttpRequest support in browser
- Check network tab for actual progress

### Slow Upload
- Check network speed
- Verify file size
- Monitor Bunny.net CDN status

### User Sees "Session expired"
- User needs to re-authenticate
- API call returned 401 status
- Check auth context and token refresh

## Future Enhancements

1. **Resumable Uploads**: For very large files
2. **Pause/Resume**: Allow pausing mid-upload
3. **Batch Uploads**: Upload multiple lectures
4. **Transcoding**: Automatic video format conversion
5. **Thumbnail Generation**: Auto-generate preview images
6. **Storage Analytics**: Track storage usage
