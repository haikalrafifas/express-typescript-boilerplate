# Express Typescript REST API Boilerplate

A boilerplate code of JSON REST API for common backend application.
This includes:

- JWT Authentication
- MVC Pattern
- Built-in Middlewares (authentication, request validation)
- Built-in Libraries (jwt, file storage)
- Built-in Utilities (crypto, logger, string)
- Module alias (@) + built-in types

It is mainly intended for this tech stack:
- Application: Node.js + Express.js + Typescript
- Database: PostgreSQL
- Mailer: Nodemailer
- File Storage: Local | Cloud Storage
- Authentication: JSON Web Token (JWT)
- Query Builder: Knex.js

## Usage

This boilerplate can be used for common backend applications such as:
- Point of Sale (PoS)
- Admin Dashboard and Analytics
- Content Management System
- Basic CRUD (Create, Read, Update, Delete)

And can be integrated with a more complex systems like WebSocket, Webhooks, third-party APIs, and so on.

## Installation

- Get `Node.js` runtime @^22
- Get `pnpm` package manager
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
- Serve the application
  ```
  pnpm start
  ```

## Notes

This boilerplate is also designed to be "plug and play"-able to any well-known third parties
other than the ones specified on the `deployment` section, making it more modular.
