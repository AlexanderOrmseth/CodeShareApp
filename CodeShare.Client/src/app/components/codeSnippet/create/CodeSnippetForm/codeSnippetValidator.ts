import { z } from "zod";

export const FormValidation = z.object({
  title: z.string().trim().max(32).optional(),
  author: z.string().trim().max(32).optional(),
  code: z.string().min(10).max(4000)
});

export type FormModel = z.infer<typeof FormValidation>;

export const ValidationErrorsSchema = z.object({
  title: z.string(),
  status: z.number(),
  type: z.string(),
  errors: z.record(z.array(z.string()))
});

export type ValidationErrors = z.infer<typeof ValidationErrorsSchema>;
