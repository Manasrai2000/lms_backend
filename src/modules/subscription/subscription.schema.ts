import { z } from "zod";

export const activateSchema = z.object({
  userId: z.number(),
  type: z.enum(["lifetime"])
});
