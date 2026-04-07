import { z } from "zod";

export const createActivitySchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  isPremium: z.boolean().optional()
});

export const updateActivitySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  isPremium: z.boolean().optional()
});
