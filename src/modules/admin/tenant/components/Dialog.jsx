"use client";

import React from "react";
import { useTenant } from "./Provider.jsx";
import ActionDialog from "./ActionDialog.jsx";
import DeleteDialog from "./DeleteDialog.jsx";

export default function Dialog() {
    const { open, currentRow } = useTenant();

    return (
        <>
            <ActionDialog
                key={currentRow ? `owner-edit-${currentRow._id}` : 'user-add'}
                open={open === 'add' || open === 'edit'}
            />

            {currentRow && (
                <DeleteDialog
                    key={`owner-delete-${currentRow._id}`}
                    open={open === 'delete'}
                />
            )}
        </>
    );
}
