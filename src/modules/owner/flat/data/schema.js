import { z } from "zod";

export const schema = (isEdit = false) =>
    z.object({
        note: z.string().optional(),
        flat_number: z.string({
            required_error: "Flat No. is required",
        }),
        rooms: z.coerce
            .number({
                required_error: "Rooms is required",
            })
            .min(1, "Rooms must be at least 1"),
        floor: z.coerce
            .number({
                required_error: "Floor is required",
            })
            .min(0, "Floor must be a positive number"),
    });
