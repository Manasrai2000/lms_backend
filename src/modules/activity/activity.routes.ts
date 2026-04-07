import { Router } from "express";
import { ActivityController } from "./activity.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createActivitySchema, updateActivitySchema } from "./activity.schema";
import { checkTrialOrSubscription } from "../../middleware/access.middleware";

const router = Router();
const controller = new ActivityController();

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activities
 */
router.get("/", authMiddleware(), checkTrialOrSubscription(), controller.getAll);

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     summary: Get an activity by ID
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Activity details
 */
router.get("/:id", authMiddleware(), checkTrialOrSubscription(), controller.getById);

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity (Admin Only)
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               isPremium:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Activity created
 */
router.post("/", authMiddleware(["admin"]), validate(createActivitySchema), controller.create);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an activity (Admin Only)
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               isPremium:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Activity updated
 */
router.put("/:id", authMiddleware(["admin"]), validate(updateActivitySchema), controller.update);

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete an activity (Admin Only)
 *     tags: [Activity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Activity deleted
 */
router.delete("/:id", authMiddleware(["admin"]), controller.delete);

export default router;
