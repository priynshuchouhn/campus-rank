"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Subject } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';
// Define schema for subject validation
const subjectSchema = z.object({
    subjectName: z.string().min(2, "Name must be at least 2 characters"),
    isCoreSubject: z.boolean(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;



export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNewSubjectDialog, setShowNewSubjectDialog] = useState(false);
    const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create form for adding a new subject
    const newSubjectForm = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            subjectName: "",
            isCoreSubject: false,
        },
    });

    // Create form for editing a subject
    const editSubjectForm = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            subjectName: "",
            isCoreSubject: false,
        },
    });

    // Fetch predefined subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/subjects`);
                setSubjects(response.data.data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
                toast.error("Failed to load subjects");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const filteredSubjects = useMemo(() => subjects.filter((subject) =>
        subject?.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
    ), [subjects, searchQuery]);

    const handleAddSubject = async (data: SubjectFormValues) => {
        try {
          setIsSubmitting(true);
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/subjects`, {
            ...data,
          });
          setSubjects([...subjects, response.data.data]);
          toast.success("Subject created successfully");
          setShowNewSubjectDialog(false);
          newSubjectForm.reset();
        } catch (error) {
          console.error("Error creating subject:", error);
          toast.error(error instanceof Error ? error.message : "Failed to create subject");
        } finally {
          setIsSubmitting(false);
        }
    };

    const handleUpdateSubject = async (data: SubjectFormValues) => {
        if (!editingSubjectId) return;

        try {
            setIsSubmitting(true);
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/subjects/${editingSubjectId}`, {
                ...data,
                isPredefined: true
            });
            setSubjects(
                subjects.map((subject) =>
                    subject.id === editingSubjectId ? response.data.data : subject
                )
            );

            toast.success("Subject updated successfully");
            setEditingSubjectId(null);
            editSubjectForm.reset();
        } catch (error) {
            console.error("Error updating subject:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update subject");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSubject = async (subjectId: string) => {
        if (!confirm("Are you sure you want to delete this subject?")) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/subjects/${subjectId}`);

            setSubjects(subjects.filter((subject) => subject.id !== subjectId));
            toast.success("Subject deleted successfully");
        } catch (error) {
            console.error("Error deleting subject:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete subject");
        }
    };

    const startEditing = (subject: Subject) => {
        editSubjectForm.reset({
            subjectName: subject.subjectName,
            isCoreSubject: subject.isCoreSubject,
        });
        setEditingSubjectId(subject.id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Subjects Management</h1>
                <Dialog open={showNewSubjectDialog} onOpenChange={setShowNewSubjectDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Subject
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Subject</DialogTitle>
                            <DialogDescription>
                                Create a new  subject that will be available to all users
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={newSubjectForm.handleSubmit(handleAddSubject)} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Subject Name
                                </label>
                                <Input
                                    id="name"
                                    {...newSubjectForm.register("subjectName")}
                                    placeholder="Enter subject name"
                                />
                                {newSubjectForm.formState.errors.subjectName && (
                                    <p className="text-sm text-red-500">
                                        {newSubjectForm.formState.errors.subjectName.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="isCoreSubject" className="text-sm font-medium mr-3">
                                    Is Core Subject
                                </label>
                                <Checkbox
                                    id="isCoreSubject"
                                    checked={newSubjectForm.watch("isCoreSubject")}
                                    onCheckedChange={(checked) =>
                                        newSubjectForm.setValue("isCoreSubject", !!checked)
                                    }
                                />
                                {newSubjectForm.formState.errors.isCoreSubject && (
                                    <p className="text-sm text-red-500">
                                        {newSubjectForm.formState.errors.isCoreSubject.message}
                                    </p>
                                )}
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        "Add Subject"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <CardTitle>Subjects List</CardTitle>
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search subjects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-[250px]"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredSubjects.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No  subjects found. Add your first subject to get started.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Is Core Subject</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSubjects.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell className="font-medium">{subject.subjectName}</TableCell>
                                        <TableCell>{subject.isCoreSubject == true ? <Badge variant={'success'}>Yes</Badge> : <Badge variant={'secondary'}> No</Badge>}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Dialog open={editingSubjectId === subject.id} onOpenChange={(open) => !open && setEditingSubjectId(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => startEditing(subject)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Subject</DialogTitle>
                                                        </DialogHeader>
                                                        <form onSubmit={editSubjectForm.handleSubmit(handleUpdateSubject)} className="space-y-4">
                                                            <div className="space-y-2">
                                                                <label htmlFor="edit-name" className="text-sm font-medium">
                                                                    Subject Name
                                                                </label>
                                                                <Input
                                                                    id="edit-name"
                                                                    {...editSubjectForm.register("subjectName")}
                                                                />
                                                                {editSubjectForm.formState.errors.subjectName && (
                                                                    <p className="text-sm text-red-500">
                                                                        {editSubjectForm.formState.errors.subjectName.message}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label htmlFor="edit-description" className="text-sm font-medium mr-4">
                                                                    Is Core Subject?
                                                                </label>
                                                                <Checkbox
                                                                    id="edit-description"
                                                                    checked={editSubjectForm.watch("isCoreSubject")}
                                                                    onCheckedChange={(checked) =>
                                                                        editSubjectForm.setValue("isCoreSubject", !!checked)
                                                                    }                                                                />
                                                                {editSubjectForm.formState.errors.isCoreSubject && (
                                                                    <p className="text-sm text-red-500">
                                                                        {editSubjectForm.formState.errors.isCoreSubject.message}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" disabled={isSubmitting}>
                                                                    {isSubmitting ? (
                                                                        <>
                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                            Saving...
                                                                        </>
                                                                    ) : (
                                                                        "Save Changes"
                                                                    )}
                                                                </Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteSubject(subject.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}