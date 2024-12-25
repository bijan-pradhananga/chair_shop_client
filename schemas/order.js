import * as z from "zod"

export const billingInfoSchema = z.object({
    name: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.coerce
        .number({ invalid_type_error: "Enter a valid phone number" })
        .min(1, "Enter a valid phone number"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z.enum(["Esewa", "Cash on Delivery"], {
        required_error: "Payment method is required",
        invalid_type_error: "Invalid payment method",
    }).default("Cash on Delivery"),
});