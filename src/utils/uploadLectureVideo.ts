/**
 * Lecture Upload Service
 * Handles two-step upload process:
 * 1. POST to backend to create lecture and get upload URL
 * 2. Direct PUT to Bunny.net CDN with the video file
 */

interface LectureMeta {
  fileName: string;
  name: string;
  description: string;
  course: string | number;
  tags?: string[];
//   user_restriction?: string;
  quiz_blocks?: number[];
//   additional_file_name?: string | null;
}

interface UploadInfo {
  upload_url: string;
  headers: {
    AccessKey: string;
  };
  expires_in?: number;
}

interface LectureCreateResponse {
  id?: string;
  upload_info: UploadInfo;
  [key: string]: any;
}

interface UploadProgressCallback {
  (progress: number): void;
}

interface UploadResult {
  success: boolean;
  lectureId?: string;
  videoUrl?: string;
  error?: string;
}

/**
 * Step 1: Create lecture on backend and get upload URL
 * Returns upload information including URL and access key
 */
export const createLectureAndGetUploadUrl = async (
  apiFetch: (url: string, options: RequestInit) => Promise<Response>,
  lectureMeta: LectureMeta
): Promise<LectureCreateResponse> => {
  const payload = {
    fileName: lectureMeta.fileName,
    name: lectureMeta.name,
    description: lectureMeta.description,
    course: lectureMeta.course,
    tags: lectureMeta.tags || [],
    // user_restriction: lectureMeta.user_restriction || "All Users",
    quiz_blocks: lectureMeta.quiz_blocks || [],
    // additional_file_name: lectureMeta.additional_file_name || null,
  };

  const response = await apiFetch("/api/admin/lectures/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create lecture");
  }

  const responseData = await response.json();
  
  // Handle nested response structure (data.upload_info)
  const uploadInfo = responseData.data?.upload_info || responseData.upload_info;
  const lectureId = responseData.data?.resourceId || responseData.data?.id || responseData.id;
  
  // Return structured response
  return {
    id: lectureId,
    upload_info: uploadInfo,
    ...responseData,
  };
};

/**
 * Step 2: Upload video file directly to Bunny.net CDN
 * Uses XMLHttpRequest for proper progress tracking
 * File is uploaded as binary data, NOT as JSON or form-data
 */
export const uploadVideoToBunny = async (
  file: File,
  uploadUrl: string,
  accessKey: string,
  onProgress?: UploadProgressCallback
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round(
          (event.loaded / event.total) * 100
        );
        onProgress(percentComplete);
      }
    });

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(
          new Error(
            `Upload failed with status ${xhr.status}: ${xhr.statusText}`
          )
        );
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload was cancelled"));
    });

    // Configure request
    xhr.open("PUT", uploadUrl, true);
    xhr.setRequestHeader("AccessKey", accessKey);
    xhr.setRequestHeader("Content-Type", file.type || "video/mp4");

    // Send file as binary data
    xhr.send(file);
  });
};

/**
 * Complete upload flow:
 * 1. Create lecture on backend
 * 2. Upload video directly to Bunny.net
 * 3. Return success/error result
 */
export const uploadLectureVideo = async (
  file: File,
  lectureMeta: LectureMeta,
  apiFetch: (url: string, options: RequestInit) => Promise<Response>,
  onProgress?: UploadProgressCallback
): Promise<UploadResult> => {
  try {
    // Validate inputs
    if (!file) {
      throw new Error("No file provided");
    }

    if (!lectureMeta.fileName || !lectureMeta.name) {
      throw new Error("Lecture metadata incomplete");
    }

    // Step 1: Create lecture and get upload info
    console.log("Creating lecture on backend...");
    const lectureResponse = await createLectureAndGetUploadUrl(
      apiFetch,
      lectureMeta
    );

    const uploadInfo = lectureResponse.upload_info;
    
    // Detailed validation with helpful error messages
    if (!uploadInfo) {
      console.error("Response structure:", JSON.stringify(lectureResponse, null, 2));
      throw new Error("No upload_info found in server response");
    }

    if (!uploadInfo.upload_url) {
      console.error("Upload info:", JSON.stringify(uploadInfo, null, 2));
      throw new Error("No upload_url provided by server");
    }

    if (!uploadInfo.headers?.AccessKey) {
      console.error("Headers:", JSON.stringify(uploadInfo.headers, null, 2));
      throw new Error("No AccessKey header provided by server");
    }

    console.log("Lecture created. Starting video upload to Bunny.net...");
    console.log("Upload URL:", uploadInfo.upload_url);

    // Step 2: Upload video to Bunny.net
    await uploadVideoToBunny(
      file,
      uploadInfo.upload_url,
      uploadInfo.headers.AccessKey,
      onProgress
    );

    console.log("Video uploaded successfully to Bunny.net");

    return {
      success: true,
      lectureId: lectureResponse.id,
      videoUrl: uploadInfo.upload_url,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Upload failed:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Utility to format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Validate video file
 */
export const validateVideoFile = (
  file: File,
  allowedTypes: string[] = ["video/mp4"]
): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  return { valid: true };
};
