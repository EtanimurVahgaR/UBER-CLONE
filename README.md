# Backend Documentation

This backend is built with Node.js, Express, and MongoDB using Mongoose.

## API Endpoints

### <u> User Registration </u>

**Endpoint:** `POST /users/register`

**Description:** Registers a new user in the system.

**Request Body:**

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**

- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

**Response:**

- **Success (201):**

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null
  }
}
```

- **Error (400):**

```json
{
  "errors": [
    {
      "msg": "error_message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```
