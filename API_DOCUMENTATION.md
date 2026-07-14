# API Documentation - MyPortfolio

## Base URL

Development: `http://localhost:5000/api`
Production: `https://your-render-backend.onrender.com/api`

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

## Response Format

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

## Endpoints

### Authentication Endpoints

#### Register Admin
```
POST /auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePassword123!",
  "fullName": "Admin Name"
}

Response: 201 Created
{
  "success": true,
  "message": "Admin registered successfully"
}
```

#### Login Admin
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "fullName": "Admin Name",
    "role": "admin"
  }
}
```

#### Check Authentication
```
GET /auth/me
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "fullName": "Admin Name",
    "role": "admin"
  }
}
```

### Projects Endpoints

#### Get All Projects
```
GET /projects
Query Parameters: (optional)
- category: web|mobile|desktop|other
- featured: true|false

Response: 200 OK
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Name",
      "description": "Project description",
      "image": "https://...",
      "technologies": ["React", "Node.js"],
      "liveLink": "https://example.com",
      "githubLink": "https://github.com/user/repo",
      "category": "web",
      "featured": true,
      "order": 1,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Project by ID
```
GET /projects/:id

Response: 200 OK
{
  "success": true,
  "project": { ... }
}
```

#### Create Project
```
POST /projects
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data:
- title (required) - string
- description (required) - string
- technologies (required) - array of strings
- liveLink (optional) - string URL
- githubLink (required) - string URL
- category (optional) - web|mobile|desktop|other
- featured (optional) - boolean
- image (optional) - file

Response: 201 Created
{
  "success": true,
  "message": "Project created successfully",
  "project": { ... }
}
```

#### Update Project
```
PUT /projects/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data: (all optional)
- title - string
- description - string
- technologies - array
- liveLink - string
- githubLink - string
- category - string
- featured - boolean
- image - file

Response: 200 OK
{
  "success": true,
  "message": "Project updated successfully",
  "project": { ... }
}
```

#### Delete Project
```
DELETE /projects/:id
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Certificates Endpoints

#### Get All Certificates
```
GET /certificates

Response: 200 OK
{
  "success": true,
  "certificates": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Certificate Name",
      "provider": "Provider Name",
      "issueDate": "2024-01-15",
      "expiryDate": null,
      "credentialId": "CRED123",
      "credentialUrl": "https://...",
      "image": "https://...",
      "description": "Certificate description",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Certificate by ID
```
GET /certificates/:id

Response: 200 OK
{
  "success": true,
  "certificate": { ... }
}
```

#### Create Certificate
```
POST /certificates
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data:
- title (required) - string
- provider (required) - string
- issueDate (required) - ISO date string
- expiryDate (optional) - ISO date string
- credentialId (optional) - string
- credentialUrl (optional) - string URL
- description (optional) - string
- image (required) - file

Response: 201 Created
{
  "success": true,
  "message": "Certificate created successfully",
  "certificate": { ... }
}
```

#### Update Certificate
```
PUT /certificates/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data: (all optional)
- title - string
- provider - string
- issueDate - ISO date
- expiryDate - ISO date
- credentialId - string
- credentialUrl - string
- description - string
- image - file

Response: 200 OK
{
  "success": true,
  "message": "Certificate updated successfully",
  "certificate": { ... }
}
```

#### Delete Certificate
```
DELETE /certificates/:id
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": "Certificate deleted successfully"
}
```

### Messages Endpoints

#### Submit Contact Message
```
POST /messages
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}

Response: 201 Created
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here...",
    "status": "unread",
    "isSpam": false,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

#### Get All Messages
```
GET /messages
Authorization: Bearer <JWT_TOKEN>
Query Parameters:
- status: unread|read|replied
- isSpam: true|false

Response: 200 OK
{
  "success": true,
  "messages": [ ... ]
}
```

#### Get Message by ID
```
GET /messages/:id
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": { ... }
}
```

#### Update Message Status
```
PUT /messages/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "read|replied"
}

Response: 200 OK
{
  "success": true,
  "message": "Message status updated",
  "data": { ... }
}
```

#### Delete Message
```
DELETE /messages/:id
Authorization: Bearer <JWT_TOKEN>

Response: 200 OK
{
  "success": true,
  "message": "Message deleted successfully"
}
```

### Profile Endpoints

#### Get Profile
```
GET /profile

Response: 200 OK
{
  "success": true,
  "profile": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "Your Name",
    "title": "Full Stack Developer",
    "bio": "Your bio",
    "profileImage": "https://...",
    "email": "your@email.com",
    "phone": "+1-xxx-xxx-xxxx",
    "location": "City, Country",
    "resumeUrl": "https://...",
    "socialLinks": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      "twitter": "https://twitter.com/username",
      "instagram": "https://instagram.com/username",
      "portfolio": "https://yourportfolio.com"
    },
    "skills": [
      {
        "category": "Frontend",
        "items": ["React", "HTML", "CSS"]
      }
    ],
    "education": [
      {
        "institution": "University Name",
        "degree": "Bachelor",
        "field": "Computer Science",
        "startYear": 2020,
        "endYear": 2024
      }
    ],
    "about": "About section content"
  }
}
```

#### Update Profile
```
PUT /profile
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

Form Data: (all optional)
- fullName - string
- title - string
- bio - string
- email - string
- phone - string
- location - string
- resumeUrl - string URL
- socialLinks - JSON object
- skills - JSON array
- education - JSON array
- about - string
- profileImage - file

Response: 200 OK
{
  "success": true,
  "message": "Profile updated successfully",
  "profile": { ... }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": ["Error 1", "Error 2"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token required" | "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- express-rate-limit
- Set limits like 100 requests per 15 minutes

## Pagination

Current implementation doesn't have pagination. To add:

```javascript
GET /projects?page=1&limit=10&skip=0
```

## Filtering

Available filters:
- Projects: category, featured
- Messages: status, isSpam
- Certificates: provider

## Testing Endpoints

### Using cURL
```bash
# Get all projects
curl http://localhost:5000/api/projects

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Create project with auth
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN" \
  -F "title=My Project" \
  -F "description=Description" \
  -F "technologies=React,Node.js" \
  -F "githubLink=https://github.com/user/repo" \
  -F "image=@path/to/image.jpg"
```

### Using Postman
1. Import collection from project files
2. Set environment variables
3. Test each endpoint
4. Document responses

## WebSocket Events (Future Enhancement)

For real-time updates:
```javascript
socket.on('project:created', (project) => {})
socket.on('message:received', (message) => {})
socket.emit('project:update', projectId)
```

## Changelog

- v1.0.0 - Initial release
  - Auth system
  - CRUD for projects, certificates
  - Contact form
  - Profile management
