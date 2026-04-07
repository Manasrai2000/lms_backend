# LMS BACKEND

Backend API for the **LMS BACKEND**.

This backend handles:

-   User authentication (JWT + Google OAuth)
-   Meeting data management
-   File uploads
-   Email notifications
-   Secure API access
-   Swagger API documentation

Built using **Node.js, Express, TypeScript, TypeORM, and MySQL**.

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Node.js
-   Express 5
-   TypeScript
-   TypeORM
-   MySQL
-   Zod (Validation)
-   JWT Authentication
-   Swagger
-   Multer (File Upload)
-   Nodemailer
-   Google OAuth

------------------------------------------------------------------------

## 📂 Project Structure

    src
    │
    ├── config
    │   ├── data-source.ts
    │   ├── env.ts
    │   └── swagger.ts
    │
    ├── middleware
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   ├── upload.middleware.ts
    │   └── validate.middleware.ts
    │
    ├── migrations
    │
    ├── modules
    │   ├── auth
    │   └── user
    │       ├── user.controller.ts
    │       ├── user.model.ts
    │       ├── user.repository.ts
    │       ├── user.routes.ts
    │       ├── user.schema.ts
    │       └── user.service.ts
    │
    ├── utils
    │   ├── jwt.ts
    │   └── mailer.ts
    │
    ├── app.ts
    ├── server.ts
    └── uploads

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

⚠️ Never commit `.env` to version control.

Example:

    PORT=3000
    NODE_ENV=development

    # Database
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_database_name

    # JWT
    JWT_SECRET=your_super_secret_key
    JWT_ACCESS_TOKEN_EXPIRES_IN=15m
    JWT_REFRESH_TOKEN_EXPIRES_IN=7d

    # Email (SMTP)
    MAIL_HOST=smtp.example.com
    MAIL_PORT=587
    MAIL_USER=your_email@example.com
    MAIL_PASS=your_email_password
    MAIL_FROM=Meeting Analyser <no-reply@example.com>

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

------------------------------------------------------------------------

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

    git clone <your-repository-url>
    cd meeting-analyser-backend

### 2️⃣ Install Dependencies

    npm install

### 3️⃣ Create Database

    CREATE DATABASE your_database_name;

### 4️⃣ Run Migrations

    npm run migration:run

------------------------------------------------------------------------

## ▶️ Running the Application

### Development Mode

    npm run dev

### Production Mode

    npm run build
    npm start

------------------------------------------------------------------------

## 📜 Available Scripts

-   `npm run dev` -- Run in development mode
-   `npm run build` -- Compile TypeScript
-   `npm start` -- Run compiled project
-   `npm run migration:generate` -- Generate new migration
-   `npm run migration:run` -- Run migrations
-   `npm run migration:revert` -- Revert last migration

------------------------------------------------------------------------

## 🔐 Security Features

-   JWT Authentication
-   Password hashing (bcrypt)
-   Helmet
-   CORS configuration
-   Zod validation
-   Environment-based configuration

------------------------------------------------------------------------

## 📚 API Documentation

After running the server:

http://localhost:3000/api-docs

------------------------------------------------------------------------

## 🛑 Important Notes

-   Do not commit `.env`
-   Use strong JWT secrets in production
-   Restrict CORS in production
-   Enable HTTPS in production

------------------------------------------------------------------------

## 👨‍💻 Author

Sol9x
