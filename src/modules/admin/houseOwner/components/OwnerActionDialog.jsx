"use client";

import React from "react";

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

import { useOwner } from "./OwnersProvider.jsx";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../../../components/password-input.jsx";

import { ownerSchema } from "../data/schema.js";
import { toast } from "react-toastify";

import useAxios from "@/hooks/useAxios";

export default function OwnerActionDialog({ open }) {
    const { axiosUser } = useAxios();
    const { setOpen, currentRow, setCurrentRow, setRefreshData } = useOwner();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(ownerSchema(!!currentRow)),
        defaultValues: {
            name: currentRow?.name || "",
            email: currentRow?.email || "",
            password: "",
            building: {
                name: currentRow?.building?.name || "",
                address: currentRow?.building?.address || "",
                note: currentRow?.building?.note || "",
            },
        },
    });

    const onSubmit = async (values) => {


        try {
            const payload = { ...values };

            if (currentRow && !payload.password) {
                delete payload.password;
            }

            if (currentRow) {
                await axiosUser.put(`/admin/house-owners/${currentRow.id}`, payload);
                toast.success("House updated successfully");
            } else {
                await axiosUser.post("/admin/house-owners", payload);
                toast.success("House created successfully");
            }

            reset();
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
                    <DialogTitle>{currentRow ? "Edit" : "Add"} User</DialogTitle>
                    <DialogDescription>
                        Fill in the details to {currentRow ? "edit" : "create a new"} user.
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

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            placeholder="e.g., S3cur3P@ssw0rd"
                            className="col-span-4"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Building Details */}
                    <div className="border-t pt-4">
                        <h3 className="font-medium">Building Details</h3>

                        <div className="space-y-2 mt-2">
                            <Label htmlFor="buildingName">Building Name</Label>
                            <Input id="buildingName" {...register("building.name")} />
                            {errors.building?.name && (
                                <p className="text-sm text-red-600">
                                    {errors.building.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 mt-2">
                            <Label htmlFor="buildingAddress">Building Address</Label>
                            <Input id="buildingAddress" {...register("building.address")} />
                            {errors.building?.address && (
                                <p className="text-sm text-red-600">
                                    {errors.building.address.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 mt-2">
                            <Label htmlFor="buildingNote">Building Note</Label>
                            <Input id="buildingNote" {...register("building.note")} />
                            {errors.building?.note && (
                                <p className="text-sm text-red-600">
                                    {errors.building.note.message}
                                </p>
                            )}
                        </div>
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
                                ? "Update Owner"
                                : "Create Owner"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
