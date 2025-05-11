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
