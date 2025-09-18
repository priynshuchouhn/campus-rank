"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { timeAgo } from "@/lib/utils"
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import Link from "next/link"


export const columns: ColumnDef<Partial<User>>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.isActive;
            return (
                <Badge variant={status? 'success': 'danger'} >{status ?  'Active': 'Inactive'}</Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => {
            return timeAgo(row.original.createdAt!)
        },
    },
    {
        header: "Actions",
        size: 120,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/users/${user.id}/detail`}>
                        <Button variant="outline">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            );
        }
    },
]