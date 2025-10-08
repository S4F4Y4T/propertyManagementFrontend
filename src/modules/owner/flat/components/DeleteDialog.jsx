"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "react-toastify";

import { useFlat } from "./Provider.jsx";
import useAxios from "@/hooks/useAxios";

export default function DeleteDialog({ open }) {
    const { setRefreshData, currentRow, setCurrentRow , setOpen } = useFlat();
    const { axiosUser } = useAxios();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onDelete = async () => {

        if (!currentRow?.id) return;

        try {
            setLoading(true);
            await axiosUser.delete(`/owner/flats/${currentRow.id}`);
            toast.success("Flat deleted successfully");
            setOpen(null);
            setRefreshData((prev) => !prev);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                setError(null);
                setOpen(null);
                setCurrentRow(null);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Flat</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{currentRow?.flat_number}</span>? This
                        action cannot be undone.
                    </DialogDescription>
                    {error && (
                        <Alert variant="destructive" className="mt-2">
                            <AlertCircleIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => {
                            setOpen(null);
                            setCurrentRow(null);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
