"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import useAxios from "@/hooks/useAxios";

const getNestedValue = (obj, path) => {
    if (!obj || !path) return null;
    const [head, ...rest] = path.split(".");
    if (!head) return null;
    return rest.length === 0 ? obj?.[head] : getNestedValue(obj?.[head], rest.join("."));
};

export default function CustomTable({
    refreshToggle,
    columns = [],
    apiEndpoint = "",
    queryParams = {},
    perPageOptions = [10, 15, 25, 50],
}) {
    const { axiosUser } = useAxios();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(perPageOptions[0]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("desc");

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(key);
            setSortDirection("asc");
        }
        setPage(1);
    };

    useEffect(() => {
        if (!apiEndpoint) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const sortParam = sortBy ? `${sortDirection === "asc" ? "" : "-"}${sortBy}` : undefined;

                const res = await axiosUser.get(apiEndpoint, {
                    params: {
                        ...queryParams,
                        page,
                        per_page: perPage,
                        ...(sortParam ? { sort: sortParam } : {}),
                    },
                });

                setData(res.data.data || []);
                setTotal(res.data.meta.total || 0);
                setTotalPages(res.data.meta.last_page || 1);
                setPage(res.data.meta.current_page || 1);
                setPerPage(res.data.meta.per_page || perPageOptions[0]);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [
        apiEndpoint,
        axiosUser,
        JSON.stringify(queryParams),
        refreshToggle,
        page,
        perPage,
        sortBy,
        sortDirection,
    ]);

    const renderPaginationItems = () => {
        const items = [];

        if (page > 2) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (page > 3) items.push(<PaginationEllipsis key="start-ellipsis" />);
        }

        for (let p = Math.max(1, page - 1); p <= Math.min(totalPages, page + 1); p++) {
            items.push(
                <PaginationItem key={p}>
                    <PaginationLink onClick={() => setPage(p)} isActive={page === p}>
                        {p}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (page < totalPages - 1) {
            if (page < totalPages - 2) items.push(<PaginationEllipsis key="end-ellipsis" />);
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => setPage(totalPages)} isActive={page === totalPages}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

    return (
        <div className="space-y-4">
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    className={`select-none ${col.align === "right" ? "text-right" : ""} ${col.sortable ? "cursor-pointer" : ""}`}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && (
                                            sortBy === col.key ? (
                                                sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                                            ) : <ArrowUpDown className="w-3 h-3 opacity-50" />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            [...Array(perPage)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center h-24">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow key={row.id || rowIndex} className="hover:bg-muted/20">
                                    {columns.map((col) => {
                                        const value = getNestedValue(row, col.key);
                                        return (
                                            <TableCell key={col.key} className={col.align === "right" ? "text-right" : ""}>
                                                {col.render ? col.render(value, row) : value ?? "-"}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination + Per Page */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <Select
                        value={String(perPage)}
                        onValueChange={(value) => {
                            setPerPage(Number(value));
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-20 cursor-pointer">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {perPageOptions.map((opt) => (
                                <SelectItem key={opt} value={String(opt)}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p>Showing page {page} of {totalPages}</p>
                </div>

                <div className="ml-auto">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {renderPaginationItems()}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
