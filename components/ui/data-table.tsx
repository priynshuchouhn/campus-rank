"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowSelectionState,
    OnChangeFn,
    Cell,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowSelection?: RowSelectionState
    onRowSelectionChange?: OnChangeFn<RowSelectionState>
    getRowId?: (row: TData) => string
    pagination?: PaginationProps
}

export function DataTable<TData, TValue>({
    columns,
    data,
    rowSelection,
    onRowSelectionChange,
    getRowId,
    pagination,
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get pagination state from URL or use defaults
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 25;

    // Create a simple table instance with minimal features
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        getRowId,
    })

    // Get header groups safely
    const headerGroups = table.getHeaderGroups?.() || [];

    // Get rows safely
    const rows = table.getRowModel?.()?.rows || [];

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (newPage: number) => {
        router.push(`?${createQueryString('page', newPage.toString())}`);
    };

    const handleLimitChange = (newLimit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', newLimit.toString());
        params.delete('page');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="space-y-4 w-full">
            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    const isLastColumn = index === headerGroup.headers.length - 1;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={isLastColumn ? { width: header.column.getSize?.() } : undefined}
                                            className={cn(
                                                "whitespace-nowrap",
                                                isLastColumn ? "w-[120px]" : "w-auto"
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => {
                                // Skip rendering if row is undefined
                                if (!row) return null;

                                // Get row ID safely
                                const rowId = row.id || `row-${Math.random().toString(36).substring(2, 9)}`;

                                // Get cells safely
                                let cells: Cell<TData, TValue>[] = [];
                                try {
                                    if (row.getVisibleCells && typeof row.getVisibleCells === 'function') {
                                        const visibleCells = row.getVisibleCells();
                                        if (Array.isArray(visibleCells)) {
                                            cells = visibleCells as Cell<TData, TValue>[];
                                        }
                                    }
                                } catch (error) {
                                    console.error('Error getting visible cells:', error);
                                }

                                // Check if row is selected safely
                                

                                return (
                                    <TableRow
                                        key={rowId}
                                    >
                                        {cells.map((cell, index) => {
                                            if (!cell) return null;

                                            const isLastColumn = index === cells.length - 1;
                                            const cellId = cell.id || `cell-${Math.random().toString(36).substring(2, 9)}`;

                                            return (
                                                <TableCell
                                                    key={cellId}
                                                    style={isLastColumn ? { width: cell.column?.getSize?.() } : undefined}
                                                    className={cn(
                                                        "whitespace-nowrap",
                                                        isLastColumn ? "w-[120px]" : "w-auto"
                                                    )}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">
                            Page {page} of {pagination.totalPages}
                        </p>
                        <Select
                            value={limit.toString()}
                            onValueChange={(value) => handleLimitChange(Number(value))}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={limit} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 25, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= pagination.totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
