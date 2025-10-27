Get all lecture banks - /api/admin/lecture-banks

{
    "success": true,
    "data": [
        {
            "name": "Anatomy",
            "data": [
                {
                    "id": 2,
                    "name": "Pathoma Video Lectures",
                    "description": "Comprehensive medical lecture bank for Pediatrics",
                    "created_by": 3,
                    "is_public": 1,
                    "school_id": 2,
                    "thumbnail": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300",
                    "course_id": 1,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        },
        {
            "name": "Physiology",
            "data": [
                {
                    "id": 4,
                    "name": "Dr. Najeeb Lectures",
                    "description": "Comprehensive medical lecture bank for Biochemistry",
                    "created_by": 3,
                    "is_public": 1,
                    "school_id": 9,
                    "thumbnail": "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=300",
                    "course_id": 2,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                },
                {
                    "id": 10,
                    "name": "Dr. Najeeb Lectures",
                    "description": "Comprehensive medical lecture bank for Surgery",
                    "created_by": 1,
                    "is_public": 1,
                    "school_id": 3,
                    "thumbnail": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
                    "course_id": 2,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        },
        {
            "name": "Biochemistry",
            "data": [
                {
                    "id": 6,
                    "name": "Dr. Najeeb Lectures",
                    "description": "Comprehensive medical lecture bank for Surgery",
                    "created_by": 3,
                    "is_public": 1,
                    "school_id": 10,
                    "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300",
                    "course_id": 3,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                },
                {
                    "id": 9,
                    "name": "Dr. Najeeb Lectures",
                    "description": "Comprehensive medical lecture bank for Obstetrics & Gynecology",
                    "created_by": 2,
                    "is_public": 1,
                    "school_id": 1,
                    "thumbnail": "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=300",
                    "course_id": 3,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        },
        {
            "name": "Pediatrics",
            "data": [
                {
                    "id": 1,
                    "name": "Osmosis",
                    "description": "Comprehensive medical lecture bank for Biochemistry",
                    "created_by": 3,
                    "is_public": 1,
                    "school_id": 9,
                    "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300",
                    "course_id": 10,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        },
        {
            "name": "Obstetrics & Gynecology",
            "data": [
                {
                    "id": 5,
                    "name": "Osmosis",
                    "description": "Comprehensive medical lecture bank for Community Medicine",
                    "created_by": 2,
                    "is_public": 1,
                    "school_id": 2,
                    "thumbnail": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
                    "course_id": 11,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        },
        {
            "name": "Psychiatry",
            "data": [
                {
                    "id": 8,
                    "name": "Dr. Najeeb Lectures",
                    "description": "Comprehensive medical lecture bank for Internal Medicine",
                    "created_by": 3,
                    "is_public": 1,
                    "school_id": 3,
                    "thumbnail": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300",
                    "course_id": 12,
                    "is_active": 1,
                    "created_at": "2025-09-15T11:23:42.000Z",
                    "updated_at": "2025-09-15T11:23:42.000Z"
                }
            ]
        }
    ]
}



Get lectures in a bank - /api/admin/lecture-banks/2


{
    "success": true,
    "data": {
        "id": 2,
        "name": "Pathoma Video Lectures",
        "description": "Comprehensive medical lecture bank for Pediatrics",
        "created_by": 3,
        "is_public": 1,
        "school_id": 2,
        "thumbnail": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300",
        "course_id": 1,
        "is_active": 1,
        "created_at": "2025-09-15T11:23:42.000Z",
        "updated_at": "2025-09-15T11:23:42.000Z",
        "resources": [
            {
                "id": 16,
                "name": "NBME Forms Collection",
                "description": "Medical education resource",
                "file_id": 8,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300",
                "view_count": 65,
                "download_count": 375,
                "requires_premium": 1,
                "created_by": 12,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:24.000Z",
                "updated_at": "2025-09-15T11:23:24.000Z",
                "fast_track_quiz_id": 14,
                "last_viewed_at": null
            },
            {
                "id": 25,
                "name": "First Aid for the USMLE Step 1 PDF",
                "description": "Medical education resource",
                "file_id": 1,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300",
                "view_count": 424,
                "download_count": 388,
                "requires_premium": 0,
                "created_by": 28,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:27.000Z",
                "updated_at": "2025-09-15T11:23:27.000Z",
                "fast_track_quiz_id": null,
                "last_viewed_at": null
            },
            {
                "id": 39,
                "name": "NBME Forms Collection",
                "description": "Medical education resource",
                "file_id": 11,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=300",
                "view_count": 422,
                "download_count": 114,
                "requires_premium": 0,
                "created_by": 6,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:32.000Z",
                "updated_at": "2025-09-15T11:23:32.000Z",
                "fast_track_quiz_id": 7,
                "last_viewed_at": null
            },
            {
                "id": 12,
                "name": "USMLE Step 1 Sample Questions",
                "description": "Medical education resource",
                "file_id": 34,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300",
                "view_count": 300,
                "download_count": 254,
                "requires_premium": 0,
                "created_by": 3,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:23.000Z",
                "updated_at": "2025-09-15T11:23:23.000Z",
                "fast_track_quiz_id": null,
                "last_viewed_at": null
            },
            {
                "id": 9,
                "name": "PharmCards PDF",
                "description": "Medical education resource",
                "file_id": 47,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=300",
                "view_count": 573,
                "download_count": 27,
                "requires_premium": 1,
                "created_by": 24,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:22.000Z",
                "updated_at": "2025-09-15T11:23:22.000Z",
                "fast_track_quiz_id": null,
                "last_viewed_at": null
            },
            {
                "id": 18,
                "name": "First Aid for the USMLE Step 1 PDF",
                "description": "Medical education resource",
                "file_id": 15,
                "is_featured": 0,
                "thumbnail": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300",
                "view_count": 736,
                "download_count": 71,
                "requires_premium": 0,
                "created_by": 28,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:25.000Z",
                "updated_at": "2025-09-15T11:23:25.000Z",
                "fast_track_quiz_id": null,
                "last_viewed_at": null
            },
            {
                "id": 1,
                "name": "PharmCards PDF",
                "description": "Medical education resource",
                "file_id": 50,
                "is_featured": 1,
                "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300",
                "view_count": 401,
                "download_count": 445,
                "requires_premium": 1,
                "created_by": 28,
                "last_opened": null,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:19.000Z",
                "updated_at": "2025-09-15T11:23:19.000Z",
                "fast_track_quiz_id": 10,
                "last_viewed_at": null
            }
        ]
    }
}


Fetch Lecture block by Id  - /api/admin/lecture-block/2

{
    "success": true,
    "data": {
        "id": 2,
        "name": "Medical Lecture Block 2",
        "description": "Organized collection of medical lectures",
        "created_by": 1,
        "is_public": 1,
        "course_id": 4,
        "thumbnail": null,
        "is_active": 1,
        "created_at": "2025-09-15T11:23:47.000Z",
        "updated_at": "2025-09-15T11:23:47.000Z",
        "banks": [
            {
                "id": 4,
                "name": "Dr. Najeeb Lectures",
                "description": "Comprehensive medical lecture bank for Biochemistry",
                "created_by": 3,
                "is_public": 1,
                "school_id": 9,
                "thumbnail": "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=300",
                "course_id": 2,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:42.000Z",
                "updated_at": "2025-09-15T11:23:42.000Z",
                "order": 1
            },
            {
                "id": 7,
                "name": "Osmosis",
                "description": "Comprehensive medical lecture bank for Pathology",
                "created_by": 3,
                "is_public": 0,
                "school_id": 10,
                "thumbnail": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=300",
                "course_id": 3,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:42.000Z",
                "updated_at": "2025-09-15T11:23:42.000Z",
                "order": 2
            },
            {
                "id": 6,
                "name": "Dr. Najeeb Lectures",
                "description": "Comprehensive medical lecture bank for Surgery",
                "created_by": 3,
                "is_public": 1,
                "school_id": 10,
                "thumbnail": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300",
                "course_id": 3,
                "is_active": 1,
                "created_at": "2025-09-15T11:23:42.000Z",
                "updated_at": "2025-09-15T11:23:42.000Z",
                "order": 3
            }
        ]
    }
}


Add new quiz block  - /api/admin/quiz-block

Payload:
{
  "name": "Test",
  "description": "This is a test",
  "isPublic": true,
  "courseId": 3,
  "tags": [],
  "quizIds": [1,3,4,5]
}


Add new lecture bank - /api/admin/lecture-banks

{
    "name": "Test 1",
    "description": "this is a test description",
    // "is_public": true or false,
    "school_id": 1,
    "course_id": 5,
    "thumbnail": null,
    "tags": ["test"],
    "resourceIds": [2,5,7]
}


