import { z } from "zod";

export const FormValidation = z.object({
  title: z.string().trim().max(32).optional(),
  author: z.string().trim().max(32).optional(),
  code: z.string().min(10).max(4000)
});

export type FormModel = z.infer<typeof FormValidation>;
