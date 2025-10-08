import { z } from "zod";

export const schema = (isEdit = false) =>
    z.object({
        note: z.string().optional(),
        name: z.string().min(1, "Name is required"),
    });
