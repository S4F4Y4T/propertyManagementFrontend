"use client";

import React from "react";
import { useCat } from "./Provider.jsx";
import ActionDialog from "./ActionDialog.jsx";
import DeleteDialog from "./DeleteDialog.jsx";

export default function Dialog() {
    const { open, currentRow } = useCat();

        console.log(open, currentRow);


    return (
        <>
            <ActionDialog
                key={currentRow ? `edit-${currentRow.id}` : 'add'}
                open={open === 'add' || open === 'edit'}
            />

            {currentRow && (
                <DeleteDialog
                    key={`delete-${currentRow.id}`}
                    open={open === 'delete'}
                />
            )}
        </>
    );
}
