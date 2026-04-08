import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";
import path from "path";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LMS Backend API",
        version: "1.0.0",
        description: "Complete API documentation for the LMS Backend system.",
      },
      servers: [
        {
          url: process.env.NODE_ENV === "production"
            ? "https://lms-backend-beryl-zeta.vercel.app"
            : `http://localhost:${process.env.PORT || 3000}`,
          description: process.env.NODE_ENV === "production" ? "Production" : "Local Development",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    // Support both ts (dev) and js (compiled) file paths
    apis: [
      path.join(__dirname, "../modules/**/*.route.ts"),
      path.join(__dirname, "../modules/**/*.routes.ts"),
      path.join(__dirname, "../modules/**/*.route.js"),
      path.join(__dirname, "../modules/**/*.routes.js"),
    ],
  };

  const specs = swaggerJsdoc(options);

  const uiOptions = {
    swaggerOptions: {
      tryItOutEnabled: true,
      persistAuthorization: true,
    },
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "LMS Backend API Docs",
  };

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, uiOptions));

  // Also expose raw JSON spec for Postman or other tools
  app.get("/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};