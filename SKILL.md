# Module addition skill

This document describes the repository structure and the conventions for adding new modules.

Project layout (key folders/files)

- `src/app.ts` — central Express app; imports and mounts module routes.
- `src/server.ts` — DB init and app.listen.
- `src/modules/` — module folders (e.g. `auth`, `user`).
- `src/middleware/` — shared middleware: `auth.middleware.ts`, `validate.middleware.ts`, `upload.middleware.ts`, `error.middleware.ts`.
- `src/config/` — app config (DB, env, swagger).
- `src/utils/` — helpers like `jwt.ts`, `mailer.ts`.
- `uploads/` — static file storage served from `/uploads`.

Module folder convention

Each module lives under `src/modules/<moduleName>/` and typically contains:

- `<module>.controller.ts` — controller class with methods used by routes.
- `<module>.service.ts` — business logic and DB interactions.
- `<module>.model.ts` or `<module>.repository.ts` — TypeORM entities or repo wrappers.
- `<module>.schema.ts` — validation schemas for requests.
- `<module>.routes.ts` (or `auth.route.ts`) — an Express `Router` that:
  - Defines route paths and HTTP methods.
  - Imports validation middleware `validate()` and `authMiddleware()` as needed.
  - Adds Swagger docblocks above route definitions.

How routes are wired

- Add your router file that `export default router;`.
- Import the router in `src/app.ts` and mount it, e.g.:

  - `import myModuleRoutes from './modules/myModule/myModule.routes';`
  - `app.use('/api/my-module', myModuleRoutes);`

Validation & middleware

- Use `validate(<schema>)` from `src/middleware/validate.middleware.ts` for request validation.
- Protect endpoints with `authMiddleware()` where required.
- Use `upload` middleware from `upload.middleware.ts` for multipart uploads.

Swagger

- Route files include Swagger JSDoc comments; maintain those to keep API docs accurate. Swagger is set up in `src/config/swagger.ts` and invoked from `app.ts`.

Database

- DB is initialized in `src/server.ts` via `AppDataSource.initialize()` (TypeORM). Place entities/models under module folders and register them via data-source config.

Adding a new module — checklist

1. Create folder `src/modules/<moduleName>/`.
2. Add `<module>.model.ts` (TypeORM entity) and/or `repository`.
3. Add `<module>.service.ts` implementing business logic.
4. Add `<module>.controller.ts` exposing methods consumed by routes.
5. Add `<module>.schema.ts` for request validation (Zod/Joi/etc. depending on project).
6. Add `<module>.routes.ts`:
   - Create `Router`, instantiate controller, define routes.
   - Apply `validate()` and `authMiddleware()` where appropriate.
   - Add Swagger blocks above routes.
   - `export default router;`
7. Import and mount the router in `src/app.ts` under a suitable path.
8. If new DB entities were added, update TypeORM/data-source registration if necessary.
9. Add tests and update README/docs if applicable.

Example: wiring a `products` module

- Create `src/modules/products/products.routes.ts` exporting a router.
- In `src/app.ts` add: `import productRoutes from './modules/products/products.routes';` then `app.use('/api/products', productRoutes);`

Notes

- Keep route-level Swagger comments up to date to reflect request/response shapes.
- Use existing middleware patterns — follow `auth` and `user` modules as references.
- Static uploads are served from `/uploads` (see `app.use('/uploads', ...)`).

Reference files to inspect

- `src/app.ts` — route mounting and middleware
- `src/modules/auth/auth.route.ts` — example with validation, auth, swagger
- `src/modules/user/user.routes.ts` — example with file upload and update profile
