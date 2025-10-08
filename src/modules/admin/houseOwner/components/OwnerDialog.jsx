"use client";

import React from "react";
import { useOwner } from "./OwnersProvider.jsx";
import OwnerActionDialog from "./OwnerActionDialog.jsx";
import OwnerDeleteDialog from "./OwnerDeleteDialog.jsx";

export default function OwnerDialog() {
    const { open, currentRow } = useOwner();

    return (
        <>
            <OwnerActionDialog
                key={currentRow ? `owner-edit-${currentRow._id}` : 'user-add'}
                open={open === 'add' || open === 'edit'}
            />

            {currentRow && (
                <OwnerDeleteDialog
                    key={`owner-delete-${currentRow._id}`}
                    open={open === 'delete'}
                />
            )}
        </>
    );
}
