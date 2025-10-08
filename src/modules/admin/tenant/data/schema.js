import { z } from "zod";

export const schema = (isEdit = false) =>
    z.object({
        name: z.string().min(1, "Name is required"),
        contact_number: z
            .string()
            .min(10, "Contact number must be at least 10 digits")
            .max(15, "Contact number is too long"),
        email: z.string().email("Invalid email"),
        flat_id: z.string({
            required_error: "Flat is required",
        }),
        owner_id: z.string({
            required_error: "Owner is required",
        }),
    });
