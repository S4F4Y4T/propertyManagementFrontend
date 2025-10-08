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
import { useCat } from "./Provider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../../../components/password-input.jsx";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { schema } from "../data/schema.js";

export default function ActionDialog({ open }) {
    const { axiosUser } = useAxios();
    const { setOpen, currentRow, setCurrentRow, setRefreshData } = useCat();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(schema(!!currentRow)),
        defaultValues: {
            name: currentRow?.name || "",
        },
    });

    const onSubmit = async (values) => {
        try {
            const payload = { ...values };

            if (currentRow && !payload.password) {
                delete payload.password;
            }

            if (currentRow) {
                await axiosUser.put(`/owner/bill-categories/${currentRow.id}`, payload);
                toast.success("Bill Category updated successfully");
            } else {
                await axiosUser.post("/owner/bill-categories", payload);
                toast.success("Bill Category created successfully");
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
                    <DialogTitle>{currentRow ? "Edit" : "Add"} Bill Category</DialogTitle>
                    <DialogDescription>
                        Fill in the details to {currentRow ? "edit" : "create a new"} Bill Category.
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
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name.message}</p>
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
