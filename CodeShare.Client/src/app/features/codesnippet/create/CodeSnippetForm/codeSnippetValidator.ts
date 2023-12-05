import { z } from "zod";

const tenNonSpaceCharacters = z
  .string()
  .max(4000)
  .refine(
    (value) => {
      const nonSpaceChars = value
        .split("")
        .filter((char) => char.trim()).length;
      return nonSpaceChars >= 10;
    },
    {
      message: "Your code must be at least 10 non-space characters."
    }
  );

export const FormValidation = z.object({
  title: z.string().trim().max(32).optional(),
  author: z.string().trim().max(32).optional(),
  code: tenNonSpaceCharacters
});

export type FormModel = z.infer<typeof FormValidation>;

export const ValidationErrorsSchema = z.object({
  title: z.string(),
  status: z.number(),
  type: z.string(),
  errors: z.record(z.array(z.string()))
});

export type ValidationErrors = z.infer<typeof ValidationErrorsSchema>;
