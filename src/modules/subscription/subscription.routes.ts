import { Router } from "express";
import { SubscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { activateSchema } from "./subscription.schema";

const router = Router();
const controller = new SubscriptionController();

/**
 * @swagger
 * /api/subscription/activate:
 *   post:
 *     summary: Activate a user's subscription (Admin Only)
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [lifetime]
 *     responses:
 *       200:
 *         description: Subscription activated
 */
router.post("/activate", authMiddleware(["admin"]), validate(activateSchema), controller.activate);

/**
 * @swagger
 * /api/subscription:
 *   get:
 *     summary: Get current user's subscription status
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription info
 */
router.get("/", authMiddleware(), controller.get);

export default router;
