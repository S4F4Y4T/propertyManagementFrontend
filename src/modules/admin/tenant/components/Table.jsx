"use client";

import React, { useState } from "react";
import CustomTable from "../../../../components/CustomTable.jsx";
import { Button } from "@/components/ui/button";
import {useTenant} from "./Provider.jsx";
import { Pencil, Trash2, Plus, Mail, MoreHorizontal } from "lucide-react";

export default function Table() {
    const { setCurrentRow, refreshData, setOpen } = useTenant();
    const [search, setSearch] = useState("");

    const columns = [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email" },
        {
            key: "actions",
            label: "Actions",
            render: (value, row) => (
                <div className="flex justify-start gap-2">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                        title="Edit"
                        onClick={() => {
                            setCurrentRow(row);
                            setOpen("edit");
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
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
                placeholder="Search Tenant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <CustomTable
                columns={columns}
                apiEndpoint="/admin/tenants"
                refreshToggle={refreshData}
                queryParams={{
                    "filters[search]": search,
                    includes: "flat,building",
                }}
            />
        </div>
    );
}
