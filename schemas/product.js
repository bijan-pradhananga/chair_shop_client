import * as z from "zod"

export const productFormSchema = z.object({
    name: z
        .string().min(1, 'Name is required').
        max(100, 'Name must be less than 100 characters'),
    description: z
        .string().max(500, 'Description must be less than 500 characters')
        .optional(),
    price: z
        .preprocess((val) => parseFloat(val),
            z.number().positive('Price must be greater than 0')),
    stock: z.
        preprocess((val) => parseInt(val),
            z.number().
                nonnegative('Stock must be 0 or more')),
    category: z
        .string()
        .min(1, 'Category is required'),
    brand: z
        .string()
        .min(1, 'Brand is required'),
    images: z
        .any()
        .refine((files) =>
            files instanceof FileList && files.length <= 5,
            'You can upload up to 5 images only'),
});


export const editProductFormSchema = z.object({
    name: z
        .string().min(1, 'Name is required').
        max(100, 'Name must be less than 100 characters'),
    description: z
        .string().max(500, 'Description must be less than 500 characters')
        .optional(),
    price: z
        .preprocess((val) => parseFloat(val),
            z.number().positive('Price must be greater than 0')),
    stock: z.
        preprocess((val) => parseInt(val),
            z.number().
                nonnegative('Stock must be 0 or more')),
    category: z
        .string()
        .min(1, 'Category is required'),
    brand: z
        .string()
        .min(1, 'Brand is required'),
});
