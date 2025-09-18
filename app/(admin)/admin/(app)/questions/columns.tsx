'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Question, Difficulty, QuestionType } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { timeAgo } from "@/lib/utils"

export const columns: ColumnDef<Partial<Question>>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const title = row.original.title || ""
            const words = title.split(" ")
            const truncated =
                words.length > 10 ? words.slice(0, 10).join(" ") + "..." : title
            return <span>{truncated}</span>
        },
    },
    {
        accessorKey: "topic",
        header: "Topic",
    },
    {
        accessorKey: "section",
        header: "Section",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "questionType",
        header: "Type",
        cell: ({ row }) => {
            const type = row.original.questionType
            return (
                <Badge variant={type === "CODE" ? "default" : "outline"}>
                    {type}
                </Badge>
            )
        },
    },
    {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
            const difficulty = row.original.difficulty as Difficulty
            const difficultyMap: Record<Difficulty, { label: string; variant: "success" | "warning" | "destructive" }> = {
                EASY: { label: "Easy", variant: "success" },
                MEDIUM: { label: "Medium", variant: "warning" },
                HARD: { label: "Hard", variant: "destructive" },
            }

            const { label, variant } = difficultyMap[difficulty] || {
                label: "Unknown",
                variant: "secondary",
            }

            return <Badge variant={variant}>{label}</Badge>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
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
            const question = row.original
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/questions/${question.id}/detail`}>
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )
        },
    },
]
