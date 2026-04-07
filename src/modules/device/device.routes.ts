import { Router } from "express";
import { DeviceController } from "./device.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
const controller = new DeviceController();

/**
 * @swagger
 * /api/device:
 *   get:
 *     summary: Get current active device session
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active device session data
 */
router.get("/", authMiddleware(), controller.getSession);

/**
 * @swagger
 * /api/device/clear:
 *   post:
 *     summary: Log out from all devices (clear session)
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post("/clear", authMiddleware(), controller.clearSession);

export default router;
