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

- [ExpressTS REST API Boilerplate](#expressts-rest-api-boilerplate)
  - [Table of Content](#table-of-content)
  - [Installation](#installation)
    - [Bare Metal](#bare-metal)
    - [Vercel](#vercel)
    - [Docker](#docker)
  - [Core Features](#core-features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [API Specification](#api-specification)
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
- Copy `.env.example` file into `.env` and modify the values (set `DATABASE_DRIVER=mysql2` for MySQL, `pg` for PostgreSQL)
- Build the application
  ```
  pnpm build
  ```
- Populate database (if exist)
  ```
  pnpm db migrate:latest
  pnpm db seed:run
  ```
- Start the application
  ```
  pnpm start
  ```

### Vercel

- Install Vercel CLI
- Deploy
  ```
  vercel --prod
  ```

### Docker

- Get `Docker` and `Docker Compose`
- Clone this repository
  ```
  git clone https://github.com/haikalrafifas/express-typescript-boilerplate.git
  ```
- Copy `.env.example` file into `.env` and modify the values (set `DATABASE_DRIVER=mysql2` for MySQL, `pg` for PostgreSQL)
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

| Name                      | Description                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Structured Codebase**   | Clear separation of concerns using Model-View-Controller architecture.                                                     |
| **JWT Authentication**    | Secure and token-based authentication for APIs.                                                                            |
| **Built-in Middleware**   | Authentication, request validation, and consistent response formatting.                                                    |
| **Utility Toolkit**       | Includes helpers for:<br>- Cryptography<br>- JWT handling<br>- Logging<br>- String manipulation<br>- Filesystem operations |
| **Module Aliases**        | Simplified imports using `@` alias.                                                                                        |
| **Type Safety**           | Comes with pre-defined types.                                                                                              |
| **ORM and DB Management** | `Objection.js` as Object Relational Mapper, and `Knex.js` as query builder, database migration, and seeder.                |

## Tech Stack

| Category          | Technology                                           |
| ----------------- | ---------------------------------------------------- |
| **Application**   | Node.js + Express.js + Typescript                    |
| **Web Server**    | Any (Nginx preferred)                                |
| **Database**      | PostgreSQL or MySQL (configurable via env)           |
| **Mailer**        | Nodemailer (e.g., Mailtrap, SMTP, etc.)              |
| **File Storage**  | Local filesystem or Cloud Storage (e.g., Cloudinary) |
| **Auth**          | JSON Web Token (JWT)                                 |
| **Query Builder** | Knex.js                                              |
| **ORM**           | Objection.js (built on top of Knex.js)               |
| **Schema**        | Knex.js (for migrations and seeders)                 |

## Project Structure

```
src/
├── app.ts                     # Main application entrypoint
├── config/                    # Environment configs and app setup
├── database/                  # Database migrations and seed data
├── domains/                   # Domain-driven design domains
│   └── v1/                    # API version
│       └── [domain]/          # e.g., auth, book, user
│           ├── controller.ts  # Request handling
│           ├── entity.ts      # Database entity mapper
│           ├── interface.ts   # Local/internal interface
│           ├── model.ts       # Data models
│           ├── route.ts       # Route definitions
│           ├── schema.ts      # Validation schema (Zod)
│           └── service.ts     # Business logic
├── lang/                      # Internationalization files
├── mails/                     # Email templates
├── middlewares/               # Express middlewares
├── types/                     # TypeScript global types
└── utilities/                 # Reusable utilities
```

| Directory        | Purpose                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| **config/**      | Environment configs, app setup, and dependency initializations.                |
| **database/**    | Database migrations and seed data.                                             |
| **domains/**     | Domain-driven design structure with controllers, models, routes, and services. |
| **lang/**        | Translation files for internationalization.                                    |
| **mails/**       | Email templates and sending logic.                                             |
| **middlewares/** | Express middlewares for authentication, validation, etc.                       |
| **types/**       | Custom TypeScript global types.                                                |
| **utilities/**   | Reusable tools like crypto, JWT, logging, etc.                                 |
| **app.ts**       | Main application entrypoint.                                                   |

## API Specification

See the full [API Specification](docs/api.md) for details.

## Notes

Since this boilerplate uses JWT with a combination of short and long-lived token expiration,
the invalidation of user session is NOT as immediate as a traditional session-based authentication.
For a specific use case where immediate invalidation of user session is the top-priority,
please use the latter approach for authentication.

This boilerplate also enforces multi factor authentication using email as its sole factor.
Developers can disable this feature and use the default authentication flow by changing the value
of `ENABLE_EMAIL_VERIFICATION` to `false` on the environment variable.
Any other support (other than OAuth2.0), will require a small patch to the database schema.
