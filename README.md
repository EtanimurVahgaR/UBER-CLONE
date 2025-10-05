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

<br><br>

### <u>User Login</u>

**Endpoint:** `POST /users/login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Validation Rules:**

- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

**Response:**

- **Success (200):**

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
      "msg": "Invalid Credentials"
    }
  ]
}
```

<br><br>

### <u> User Profile </u>

**Endpoint:** `GET /users/profile`

**Description:** Retrieves the authenticated user's profile information.

**Headers:**

- `Authorization: Bearer <jwt_token>`

**Response:**

- **Success (200):**

```json
{
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

- **Error (401):** Unauthorized if no valid token provided.

<br/><br/>

### <u>User Logout</u>

**Endpoint:** `POST /users/logout`

**Description:** Logs out the user by clearing the authentication cookie and blacklisting the token.

**Headers (optional):**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

**Response:**

- **Success (200):**

```json
{
  "msg": "Logged out successfully"
}
```

- **Error (400):**

```json
{
  "msg": "No token found"
}
```

## Captain Endpoints

### <u>Captain Registration</u>

**Endpoint:** `POST /captains/register`

**Description:** Registers a new captain in the system.

**Request Body:**

```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string ( car , bike , auto )"
  }
}
```

**Validation Rules:**

- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be at least 1.
- `vehicle.vehicleType`: Must be one of "car", "bike", or "auto".

**Response:**

- **Success (201):**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string",
      "location": {
        "lat": null,
        "lng": null
      }
    }
  }
}
```

- **Error (400):**

```json
{
  "errors": [
    {
      "msg": "Captain with this email already exists"
    }
  ]
}
```

<br/><br/>

### <u> Captain Profile </u>

**Endpoint:** `GET /captains/profile`

**Description:** Retrieves the authenticated captain's profile information.

**Headers:**

- `Authorization: Bearer <jwt_token>`

**Response:**

- **Success (200):**

```json
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": 1,
      "vehicleType": "car",
      "location": {
        "lat": null,
        "lng": null
      }
    }
  }
}
```

- **Error (401):** Unauthorized if no valid token provided.
  <br><br>

### <u> Captain Logout </u>

**Endpoint:** `POST /captains/logout`

**Description:** Logs out the captain by clearing the authentication cookie and blacklisting the token.

**Headers (optional):**

- `Authorization: Bearer <jwt_token>` (if not using cookies)

**Response:**

- **Success (200):**

```json
{
  "msg": "Logged out successfully"
}
```

- **Error (400):**

```json
{
  "msg": "No token found"
}
```
