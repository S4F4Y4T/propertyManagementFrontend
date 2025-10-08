"use client";

import React, { useState } from "react";
import CustomTable from "../../../../components/CustomTable.jsx";
import { Button } from "@/components/ui/button";
import {useBill} from "./Provider.jsx";
import { Pencil, Trash2, Plus, Mail, MoreHorizontal, Currency } from "lucide-react";

export default function Table() {
    const { setCurrentRow, refreshData, setOpen } = useBill();
    const [search, setSearch] = useState("");

    const columns = [
        { key: "month", label: "Month", sortable: true },
        { key: "total_amount", label: "Amount" },
        { key: "payment_status", label: "Status" },
        { key: "flat.flat_number", label: "Flat" },
        { key: "tenant.name", label: "Tenant" },
        {
            key: "actions",
            label: "Actions",
            render: (value, row) => (
                <div className="flex justify-start gap-2">
                    {row.payment_status != 'paid' && ( <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        title="Pay"
                        onClick={() => {
                            setCurrentRow(row);
                            setOpen("pay");
                        }}
                    >
                        <Currency className="h-4 w-4" />
                    </Button> )}

                    {!row.isAdmin && (
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="icon"
                            title="Delete"
                            onClick={() => {
                                setCurrentRow(row);
                                setOpen("delete");
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <input
                type="text"
                className="border rounded px-3 py-1"
                placeholder="Search Here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            
            <CustomTable
                columns={columns}
                apiEndpoint="/owner/bills"
                refreshToggle={refreshData}
                queryParams={{
                    includes: "category,flat,tenant",
                    ...(search ? { "filters[month]": search } : {}),
                }}
            />
        </div>
    );
}
