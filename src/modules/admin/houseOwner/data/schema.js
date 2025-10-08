import { z } from "zod";

export const ownerSchema = (isEdit = false) =>
    z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        password: isEdit
            ? z.string().optional()
            : z.string().min(6, "Password must be at least 6 characters"),
        building: z.object({
            name: z.string().min(1, "Building name is required"),
            address: z.string().min(1, "Building address is required"),
            note: z.string().optional(),
        }),
    });
