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

import { useBill } from "./Provider.jsx";
import useAxios from "@/hooks/useAxios";

export default function PayDialog({ open }) {
    const { setRefreshData, currentRow, setCurrentRow , setOpen } = useBill();
    const { axiosUser } = useAxios();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onPay = async () => {

        if (!currentRow?.id) return;

        try {
            setLoading(true);
            await axiosUser.patch(`/owner/bills/${currentRow.id}/pay`);
            toast.success("Bill paid successfully");
            setOpen(null);
            setRefreshData((prev) => !prev);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete bill");
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
                    <DialogTitle>Pay Bill</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to pay?.
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
                        onClick={onPay}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
