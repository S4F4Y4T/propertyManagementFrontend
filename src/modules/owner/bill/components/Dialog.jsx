"use client";

import React from "react";
import { useBill } from "./Provider.jsx";
import ActionDialog from "./ActionDialog.jsx";
import DeleteDialog from "./DeleteDialog.jsx";
import PayDialog from "./PayDialog.jsx";

export default function Dialog() {
    const { open, currentRow } = useBill();

    return (
        <>
            <ActionDialog
                open={open === 'add'}
            />

            {currentRow && (
                <DeleteDialog
                    key={`delete-${currentRow.id}`}
                    open={open === 'delete'}
                />
            )}

            {currentRow && (
                <PayDialog
                    key={`pay-${currentRow.id}`}
                    open={open === 'pay'}
                />
            )}
        </>
    );
}
