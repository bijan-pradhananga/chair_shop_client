import * as z from "zod"

export const brandFormSchema = z.object({
    name: z
        .string().min(1, 'Name is required').
        max(100, 'Name must be less than 100 characters'),
    description: z
        .string().max(500, 'Description must be less than 100 characters')
        .optional(),
});
