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
import { useTenant } from "./Provider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../../../components/password-input.jsx";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { schema } from "../data/schema.js";

export default function ActionDialog({ open }) {
    const { axiosUser } = useAxios();
    const { setOpen, currentRow, setCurrentRow, setRefreshData } = useTenant();

    const [owners, setOwners] = useState([]);
    const [flats, setFlats] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(schema(!!currentRow)),
        defaultValues: {
            name: currentRow?.name || "",
            contact_number: currentRow?.contact_number || "",
            email: currentRow?.email || "",
            password: "",
            owner_id: currentRow?.owner_id || "",
            flat_id: currentRow?.flat?.flat_id || "",
        },
    });

    const selectedOwner = watch("owner_id");

    useEffect(() => {
        axiosUser.get("/admin/house-owners?includes=building&per_page=-1").then((res) => setOwners(res.data.data));
    }, []);

    useEffect(() => {
        reset({
            name: currentRow?.name || "",
            contact_number: currentRow?.contact_number || "",
            email: currentRow?.email || "",
            password: "",
            owner_id: currentRow?.owner_id || "",
            flat_id: currentRow?.flat?.id || "",
        });
    }, [currentRow, reset]);

    useEffect(() => {
        if (selectedOwner) {
            axiosUser.get(`/admin/house-owners/${selectedOwner}/flats`).then((res) => {
                setFlats(res.data.data);

                if (currentRow?.flat?.id) {
                    reset((prev) => ({
                        ...prev,
                        flat_id: currentRow.flat.id,
                    }));
                }
            });
        } else {
            setFlats([]);
        }
    }, [selectedOwner, currentRow, reset]);

    const onSubmit = async (values) => {
        try {
            const payload = { ...values };

            if (currentRow && !payload.password) {
                delete payload.password;
            }

            if (currentRow) {
                await axiosUser.put(`/admin/tenants/${currentRow.id}`, payload);
                toast.success("Tenant updated successfully");
            } else {
                await axiosUser.post("/admin/tenants", payload);
                toast.success("Tenant created successfully");
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
                    <DialogTitle>{currentRow ? "Edit" : "Add"} Tenant</DialogTitle>
                    <DialogDescription>
                        Fill in the details to {currentRow ? "edit" : "create a new"} tenant.
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
                        <Label htmlFor="contact_number">Contact Number</Label>
                        <Input id="contact_number" {...register("contact_number")} />
                        {errors.contact_number && (
                            <p className="text-sm text-red-600">
                                {errors.contact_number.message}
                            </p>
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
                        <Label
                            htmlFor="owner_id"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Owner
                        </Label>
                        <select
                            id="owner_id"
                            className="border rounded p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            {...register("owner_id")}
                        >
                            <option value="">Select Owner</option>
                            {owners.map((owner) => (
                            <option key={owner.id} value={owner.id}>
                                {owner.name}
                            </option>
                            ))}
                        </select>
                        {errors.owner_id && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                            {errors.owner_id.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                    <Label
                        htmlFor="flat_id"
                        className="text-gray-700 dark:text-gray-300"
                    >
                        Flat
                    </Label>
                    <select
                        id="flat_id"
                        className="border rounded p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        {...register("flat_id")}
                    >
                        <option value="">Select Flat</option>
                        {flats.map((flat) => (
                        <option key={flat.id} value={flat.id}>
                            {flat.flat_number}
                        </option>
                        ))}
                    </select>
                    {errors.flat_id && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.flat_id.message}
                        </p>
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
                                ? "Update Tenant"
                                : "Create Tenant"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
