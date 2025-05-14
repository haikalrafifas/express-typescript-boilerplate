<!-- omit in toc -->
# ExpressTS REST API Boilerplate

A lightweight and flexible boilerplate for building JSON-based REST APIs, designed to serve as a foundation for common backend applications such as:
- 🏷️ White-label platforms
- 📊 Admin dashboards and analytics tools
- 📰 Headless CMS implementations
- 🗃️ Data management systems with full CRUD support

This boilerplate is built with extensibility in mind, and is ready to integrate with modern backend technologies like WebSockets, message brokers, third-party APIs, and more. Use it as a starting point for scalable and modular backend architectures.

<!-- omit in toc -->
## Table of Content
- [Installation](#installation)
  - [Bare Metal](#bare-metal)
  - [Docker](#docker)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Specification](#api-specification)
  - [Standard Response](#standard-response)
    - [Success Response](#success-response)
    - [Error Response](#error-response)
  - [Authentication (non MFA)](#authentication-non-mfa)
    - [Register](#register)
    - [Login](#login)
    - [Refresh Access Token](#refresh-access-token)
    - [Logout](#logout)
  - [CRUD Example (Events)](#crud-example-events)
    - [Get All Events](#get-all-events)
    - [Get Event by Slug](#get-event-by-slug)
    - [Create a new Event](#create-a-new-event)
    - [Update an Event](#update-an-event)
    - [Delete an Event](#delete-an-event)
- [Notes](#notes)

## Installation
### Bare Metal
- Get `Node.js` runtime @^18
- Get node package manager (`pnpm` is preferred)
- Clone this repository
  ```
  git clone https://github.com/haikalrafifas/express-typescript-boilerplate.git
  ```
- Install dependencies
  ```
  pnpm install
  ```
- Copy `.env.example` file into `.env` and modify the values
- Build the application
  ```
  pnpm run build
  ```
- Populate database (if exist)
  ```
  pnpm run db migrate:latest
  pnpm run db seed:run
  ```
- Start the application
  ```
  pnpm start
  ```
### Docker
- Get `Docker` and `Docker Compose`
- Clone this repository
  ```
  git clone https://github.com/haikalrafifas/express-typescript-boilerplate.git
  ```
- Copy `.env.example` file into `.env` and modify the values
- Build the application
  ```
  docker-compose build
  ```
- Start the application
  ```
  docker-compose up -d
  ```
- Populate the database (if exist)
  ```
  docker exec -it {appname}.api npm run db migrate:latest
  docker exec -it {appname}.api npm run db seed:run
  ```

## Core Features
|Name|Description|
|--|--|
|**Structured Codebase**|Clear separation of concerns using Model-View-Controller architecture.|
|**JWT Authentication**|Secure and token-based authentication for APIs.|
|**Built-in Middleware**|Authentication, request validation, and consistent response formatting.|
|**Utility Toolkit**|Includes helpers for:<br>- Cryptography<br>- JWT handling<br>- Logging<br>- Resource serialization<br>- String manipulation<br>- Filesystem operations|
|**Module Aliases**|Simplified imports using `@` alias.|
|**Type Safety**|Comes with pre-defined types.|
|**ORM and DB Management**|`Objection.js` as Object Relational Mapper, and `Knex.js` as query builder, database migration, and seeder.|

## Tech Stack
|Category|Technology|
|-|-|
|**Application**|Node.js + Express.js + Typescript|
|**Web Server**|Any (Nginx preferred)|
|**Database**|Any SQL database (PostgreSQL by default)|
|**Mailer**|Nodemailer (e.g., Mailtrap, SMTP, etc.)|
|**File Storage**|Local filesystem or Cloud Storage (e.g., Cloudinary)|
|**Auth**|JSON Web Token (JWT)|
|**Query Builder**|Knex.js|
|**ORM**|Objection.js (built on top of Knex.js)|
|**Schema**|Knex.js (for migrations and seeders)|

## Project Structure
Here's a breakdown of the main directories inside the `src/` folder:
|Name|Purpose|
|-|-|
|**config/**|Environment configs, app setup, and dependency initializations.|
|**controllers/**|Handles request and returns response.|
|**database/**|Database migrations and seed data.|
|**mails/**|Mail templates and sending logic.|
|**middlewares/**|Sits between route handlers.|
|**models/**|Data representation and business logic.|
|**resources/**|Schema definitions for JSON resource serialization.|
|**routes/**|Application resource routings.|
|**services/**|Reusable business logic extracted from controllers.|
|**types/**|Custom TypeScript types and interfaces.|
|**utilities/**|Reusable tools for the codebase.|
|**validators/**|Schema definitions for request validation.|
|**app.ts**|Main application entrypoint.|

## API Specification
### Standard Response
#### Success Response
```
{
  "statusCode": "number",
  "message": "string",
  "data": "object[] | object"
}
```
#### Error Response
```
{
  "statusCode": "number",
  "message": "string",
  "errors": "Record<string, string[]>",
}
```
### Authentication (non MFA)
#### Register
Request:
- Method: POST
- Path: /api/v1/auth/register
- Header:
    - Content-Type:
      - application/json
      - application/x-www-form-urlencoded
      - multipart/form-data
- Body:
  ```
  {
    "name": "string",
    "email": "string|email",
    "password": "string|min:6"
  }
  ```
Response:
- Success:
  ```
  {
    "statusCode": 200,
    "message": "Successfully registered new user!",
    "data": "Partial<UserData>"
  }
  ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "name": ["string"],
        "email": ["string"],
        "password": ["string"]
      }
    }
    ```
  - Conflict:
    ```
    {
      "statusCode": 409,
      "message": "User already registered"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Login
Request:
- Method: POST
- Path: /api/v1/auth/login
- Header:
  - Content-Type:
    - application/json
    - application/x-www-form-urlencoded
    - multipart/form-data
- Body:
  ```
  {
    "email": "string|email",
    "password": "string|min:6"
  }
  ```
Response:
- Success:
  - Header:
    - Set-Cookie: "refresh_token=<REFRESH_TOKEN>"
  - Body:
    ```
    {
      "statusCode": 200,
      "message": "Successfully logged in!",
      "data": {
        "user": "Partial<UserData>",
        "token": {
          "type": "string",
          "access": "string",
          "expiresIn": "string|number"
        },
      },
    }
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "email": ["string"],
        "password": ["string"]
      }
    }
    ```
  - Unauthorized:
    ```
    {
      "statusCode": 401,
      "message": "Invalid credentials"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Refresh Access Token
Request:
- Method: POST
- Path: /api/v1/auth/refresh
- Header:
  - Cookie: "refresh_token=<REFRESH_TOKEN>"

Response:
- Success:
  - Header:
    - Set-Cookie: "refresh_token=<NEW_REFRESH_TOKEN>"
  - Body:
    ```
    {
      "statusCode": 200,
      "message": "Successfully refreshed access token!",
      "data": {
        "user": "Partial<UserData>",
        "token": {
          "type": "string",
          "access": "string",
          "expiresIn": "string|number"
        }
      }
    }
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Refresh token is required"
    }
    ```
  - Unauthorized:
    ```
    {
      "statusCode": 401,
      "message": "Invalid refresh token"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Logout
Request:
- Method: DELETE
- Path: /api/v1/auth/logout
- Header:
  - Cookie: "refresh_token=<REFRESH_TOKEN>"

Response:
- Success:
  - Header:
    - Set-Cookie: "refresh_token="
  - Body:
    ```
    "statusCode": 200,
    "message": "Successfully logged out!",
    "data": "Partial<UserData>"
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Refresh token is required"
    }
    ```
  - Unauthorized -> Invalid refresh token:
    ```
    {
      "statusCode": 401,
      "message": "Invalid refresh token"
    }
    ```
  - Unauthorized -> User session not found:
    ```
    {
      "statusCode": 401,
      "message": "User session not found"
    }
    ```
  - Unauthorized -> User not found:
    ```
    {
      "statusCode": 401,
      "message": "User not found"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

### CRUD Example (Events)
#### Get All Events
Request:
- Method: GET
- Path: /api/v1/events
- Query:
  - page: "number"
  - perPage: "number"
  - sortBy: "string|only:starts_at,ends_at"
  - sortDirection: "string|only:asc,desc"

Response:
- Success:
  ```
  {
    "statusCode": 200,
    "message": "Successfully get events!",
    "data": [
      {
        ...Partial<EventData>,
        "category": Partial<EventCategoryData>
      },
      ...
    ]
  }
  ```
- Error:
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Get Event by Slug
Request:
- Method: GET
- Path: /api/v1/events/:slug

Response:
- Success:
  ```
  {
    "statusCode": 200,
    "message": "Successfully get event by identifier!",
    "data": {
      ...Partial<EventData>,
      "category": Partial<EventCategoryData>
    }
  }
  ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "slug": ["string"]
      }
    }
    ```
  - Not found:
    ```
    {
      "statusCode": 404,
      "message": "Event not found"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Create a new Event
Request:
- Method: POST
- Path: /api/v1/events
- Header:
  - Authentication: "Bearer <ACCESS_TOKEN>"
  - Content-Type:
    - application/json
    - application/x-www-form-urlencoded
    - multipart/form-data
- Body:
  ```
  {
    "category_id": "number",
    "title": "string",
    "snippet": "string|optional",
    "content": "string",
    "cover": "image|optional",
    "starts_at": "timestamp",
    "ends_at": "timestamp"
  }
  ```
Response:
- Success:
  - Body:
    ```
    {
      "statusCode": 200,
      "message": "Successfully create an event!",
      "data": {
        ...Partial<EventData>,
        "category": Partial<EventCategoryData>
      }
    }
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "category_id": ["string"],
        "title": ["string"],
        "snippet": ["string"],
        "content": ["string"],
        "cover": ["string"],
        "starts_at": ["string"],
        "ends_at": ["string"],
      }
    }
    ```
  - Unauthorized:
    ```
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Update an Event
Request:
- Method: PATCH
- Path: /api/v1/events/:slug
- Header:
  - Authentication: "Bearer <ACCESS_TOKEN>"
  - Content-Type:
    - application/json
    - application/x-www-form-urlencoded
    - multipart/form-data
- Body:
  ```
  {
    "category_id": "number|optional",
    "title": "string|optional",
    "snippet": "string|optional",
    "content": "string|optional",
    "cover": "image|optional",
    "starts_at": "timestamp|optional",
    "ends_at": "timestamp|optional"
  }
  ```
Response:
- Success:
  - Body:
    ```
    {
      "statusCode": 200,
      "message": "Successfully update an event!",
      "data": {
        ...Partial<EventData>,
        "category": Partial<EventCategoryData>
      }
    }
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "slug": ["string"],
        "category_id": ["string"],
        "title": ["string"],
        "snippet": ["string"],
        "content": ["string"],
        "cover": ["string"],
        "starts_at": ["string"],
        "ends_at": ["string"],
      }
    }
    ```
  - Unauthorized:
    ```
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```
  - Not found:
    ```
    {
      "statusCode": 404,
      "message": "Event not found"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Delete an Event
Request:
- Method: DELETE
- Path: /api/v1/events/:slug
- Header:
  - Authentication: "Bearer <ACCESS_TOKEN>"

Response:
- Success:
  - Body:
    ```
    {
      "statusCode": 200,
      "message": "Successfully delete an event!",
      "data": {
        ...Partial<EventData>,
        "category": Partial<EventCategoryData>,
        "deleted_at": "timestamp"
      }
    }
    ```
- Error:
  - Bad request:
    ```
    {
      "statusCode": 400,
      "message": "Validation failed",
      "errors": {
        "slug": ["string"],
      }
    }
    ```
  - Unauthorized:
    ```
    {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    ```
  - Not found:
    ```
    {
      "statusCode": 404,
      "message": "Event not found"
    }
    ```
  - Internal server error:
    ```
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

## Notes
Since this boilerplate uses JWT with a combination of short and long-lived token expiration,
the invalidation of user session is NOT as immediate as a traditional session-based authentication.
For a specific use case where immediate invalidation of user session is the top-priority,
please use the latter approach for authentication.

This boilerplate also enforces multi factor authentication using email as its sole factor.
Developers can disable this feature and use the default authentication flow by changing the value
of `ENABLE_EMAIL_VERIFICATION` to `false` on the environment variable.
Any other support (other than OAuth2.0), will require a small patch to the database schema.
