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
import { useBill } from "./Provider.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../../../components/password-input.jsx";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { schema } from "../data/schema.js";

export default function ActionDialog({ open }) {
    const { axiosUser } = useAxios();
    const { setOpen, setRefreshData } = useBill();
    const [billCategories, setBillCategories] = useState([]);
    const [flatList, setFlatList] = useState([]);

    useEffect(() => {
        axiosUser.get(`/owner/flats?per_page=-1`).then((res) => setFlatList(res.data.data));
    }, []);
    
    useEffect(() => {
        axiosUser.get("/owner/bill-categories?per_page=-1").then((res) => setBillCategories(res.data.data));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(schema()),
    });

    const onSubmit = async (values) => {
        try {

            const payload = {
                bills: [
                    {
                        month: values.month,
                        total_amount: values.total_amount,
                        bill_category_id: values.bill_category_id,
                    },
                ],
            };

            await axiosUser.post(`/owner/flats/${values.flat_id}/bills`, payload);
                toast.success("Bill Added successfully");

            setOpen(null);
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
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Bill</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new Bill.
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
                        <Label htmlFor="month">Month</Label>
                        <Input id="month" type="month" {...register("month")} />
                        {errors.month && (
                            <p className="text-sm text-red-600">{errors.month.message}</p>
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
                            {flatList.map((flat) => (
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

                    <div className="space-y-2">
                        <Label
                            htmlFor="flat_id"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Bill Category
                        </Label>
                        <select
                            id="bill_category_id"
                            className="border rounded p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            {...register("bill_category_id")}
                        >
                            <option value="">Select Category</option>
                            {billCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                            ))}
                        </select>
                        {errors.bill_category_id && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                            {errors.bill_category_id.message}
                            </p>
                        )}
                    </div>
    
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" {...register("total_amount")} />
                        {errors.total_amount && (
                            <p className="text-sm text-red-600">{errors.total_amount.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="w-full md:w-auto cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Creating...'
                                : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
