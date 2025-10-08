"use client";

import React, { useState } from "react";
import CustomTable from "../../../../components/CustomTable.jsx";

export default function Table() {
    const [search, setSearch] = useState("");

    const columns = [
            { key: "name", label: "Name", sortable: true },
            { key: "email", label: "Email" },
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
                apiEndpoint="/owner/tenants"
                queryParams={{
                    includes: "building, flat",
                    ...(search ? { "filters[search]": search } : {}),
                }}
            />
        </div>
    );
}
