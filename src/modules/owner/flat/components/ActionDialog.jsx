"use client";

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useFlat } from "./Provider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../../../components/password-input.jsx";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { schema } from "../data/schema.js";

export default function ActionDialog({ open }) {
    const { axiosUser } = useAxios();
    const { setOpen, currentRow, setCurrentRow, setRefreshData } = useFlat();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(schema(!!currentRow)),
        defaultValues: {
            flat_number: currentRow?.flat_number || "",
            floor: currentRow?.floor || "",
            rooms: currentRow?.rooms || "",
        },
    });


    const onSubmit = async (values) => {
        try {
            const payload = { ...values };

            if (currentRow && !payload.password) {
                delete payload.password;
            }

            if (currentRow) {
                await axiosUser.put(`/owner/flats/${currentRow.id}`, payload);
                toast.success("Flat updated successfully");
            } else {
                await axiosUser.post("/owner/flats", payload);
                toast.success("Flat created successfully");
            }

            setOpen(null);
            setCurrentRow(null);
            setRefreshData((prev) => !prev);
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;

                Object.keys(errors).forEach((field) => {
                    setError(field, { message: errors[field].join(" ") });

                });
            } else {
                setError("root", {
                    message:
                        err.response?.data?.message ||
                        "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                reset();
                setOpen(null);
                setCurrentRow(null);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{currentRow ? "Edit" : "Add"} Flat</DialogTitle>
                    <DialogDescription>
                        Fill in the details to {currentRow ? "edit" : "create a new"} flat.
                    </DialogDescription>

                    {errors.root?.message && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircleIcon />
                            <AlertTitle>{errors.root.message}</AlertTitle>
                        </Alert>
                    )}
                </DialogHeader>

                <form className="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <Label htmlFor="flat_number">Flat Number</Label>
                        <Input id="flat_number" {...register("flat_number")} />
                        {errors.flat_number && (
                            <p className="text-sm text-red-600">{errors.flat_number.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="flat_number">Floor</Label>
                        <Input id="flat_number" {...register("floor")} />
                        {errors.floor && (
                            <p className="text-sm text-red-600">{errors.floor.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="flat_number">Rooms</Label>
                        <Input id="rooms" {...register("rooms")} />
                        {errors.rooms && (
                            <p className="text-sm text-red-600">{errors.rooms.message}</p>
                        )}
                    </div>



                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="w-full md:w-auto cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? currentRow
                                    ? "Updating..."
                                    : "Creating..."
                                : currentRow
                                ? "Update"
                                : "Create"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
