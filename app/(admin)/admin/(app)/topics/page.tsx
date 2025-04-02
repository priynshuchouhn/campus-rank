"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Loader2, Link as LinkIcon } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Define schemas for validation
const resourceSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    url: z.string().url("Must be a valid URL"),
    type: z.enum(["VIDEO", "ARTICLE"])
});

const topicSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    sectionId: z.string().min(1, "Section is required"),
    resources: z.array(resourceSchema).optional().default([])
});

type TopicFormValues = z.infer<typeof topicSchema>;
type ResourceFormValues = z.infer<typeof resourceSchema>;

// Interface for our data
interface Section {
    id: string;
    name: string;
    description: string;
    topicsCount: number;
}

interface Topic {
    id: string;
    title: string;
    description: string;
    resources: Resource[];
    sectionId: string;
    sectionName: string;
}

interface Resource {
    id?: string;
    title: string;
    url: string;
    type: "VIDEO" | "ARTICLE";
}

export default function TopicsPage() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [sections, setSections] = useState<Section[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create form for editing a topic
    const {
        register: registerEdit,
        control: controlEdit,
        handleSubmit: handleSubmitEdit,
        formState: { errors: errorsEdit },
        reset: resetEditForm
    } = useForm<TopicFormValues>({
        resolver: zodResolver(topicSchema),
        defaultValues: {
            title: "",
            description: "",
            sectionId: "",
            resources: []
        },
    });

    // Use field array for resources in edit form
    const {
        fields: resourceFieldsEdit,
        append: appendResourceEdit,
        remove: removeResourceEdit
    } = useFieldArray({
        control: controlEdit,
        name: "resources"
    });

    // Fetch sections
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await fetch("/api/sections");
                if (!response.ok) {
                    throw new Error("Failed to fetch sections");
                }
                const data = await response.json();
                setSections(data.sections);
            } catch (error) {
                console.error("Error fetching sections:", error);
                toast.error("Failed to load sections");
            }
        };

        fetchSections();
    }, []);

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setIsLoading(true);
                let url = "/api/topics";
                if (selectedSection) {
                    url += `?sectionId=${selectedSection}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch topics");
                }

                const data = await response.json();
                setTopics(data.topics);
            } catch (error) {
                console.error("Error fetching topics:", error);
                toast.error("Failed to load topics");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, [selectedSection]);

    // Filter topics based on search query
    const filteredTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle updating a topic
    const handleUpdateTopic = async (data: TopicFormValues) => {
        if (!editingTopicId) return;

        try {
            setIsSubmitting(true);

            const response = await fetch(`/api/topics/${editingTopicId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update topic");
            }

            const result = await response.json();

            // Add the section name to the topic
            const sectionName = sections.find(s => s.id === data.sectionId)?.name || "";
            const updatedTopic: Topic = {
                ...result.topic,
                sectionName
            };

            setTopics(topics.map(topic =>
                topic.id === editingTopicId ? updatedTopic : topic
            ));

            toast.success("Topic updated successfully");
            setEditingTopicId(null);
            resetEditForm();
        } catch (error) {
            console.error("Error updating topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update topic");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle deleting a topic
    const handleDeleteTopic = async (topicId: string) => {
        if (!confirm("Are you sure you want to delete this topic?")) return;

        try {
            const response = await fetch(`/api/topics/${topicId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete topic");
            }

            setTopics(topics.filter(topic => topic.id !== topicId));
            toast.success("Topic deleted successfully");
        } catch (error) {
            console.error("Error deleting topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete topic");
        }
    };

    // Start editing a topic
    const startEditing = (topic: Topic) => {
        resetEditForm({
            title: topic.title,
            description: topic.description,
            sectionId: topic.sectionId,
            resources: topic.resources.map(resource => ({
                title: resource.title,
                url: resource.url,
                type: resource.type
            }))
        });

        setEditingTopicId(topic.id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Topics Management</h1>
                <Link href="/admin/topics/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Topic
                    </Button>
                </Link>
            </div>

            <Toaster position="top-right" />

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <CardTitle>Topics</CardTitle>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="sectionFilter" className="text-sm whitespace-nowrap">
                                    Filter by section:
                                </label>
                                <Select value={selectedSection} onValueChange={setSelectedSection}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="All sections" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">All sections</SelectItem>
                                        {sections.map((section) => (
                                            <SelectItem key={section.id} value={section.id}>
                                                {section.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full sm:w-[250px]"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredTopics.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No topics found. Add your first topic to get started.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Section</TableHead>
                                    <TableHead>Resources</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTopics.map((topic) => (
                                    <TableRow key={topic.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{topic.title}</div>
                                                <div className="text-sm text-muted-foreground line-clamp-1">{topic.description}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{topic.sectionName}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {topic.resources.map((resource, i) => (
                                                    <Badge key={i} variant={resource.type === "VIDEO" ? "secondary" : "outline"}>
                                                        {resource.type === "VIDEO" ? "Video" : "Article"}
                                                    </Badge>
                                                ))}
                                                {topic.resources.length === 0 && (
                                                    <span className="text-sm text-muted-foreground">No resources</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Dialog open={editingTopicId === topic.id} onOpenChange={(open) => !open && setEditingTopicId(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => startEditing(topic)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Topic</DialogTitle>
                                                        </DialogHeader>
                                                        <form onSubmit={handleSubmitEdit(handleUpdateTopic)} className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-title">Topic Title</Label>
                                                                <Input
                                                                    id="edit-title"
                                                                    {...registerEdit("title")}
                                                                />
                                                                {errorsEdit.title && (
                                                                    <p className="text-sm text-red-500">{String(errorsEdit.title?.message || '')}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-description">Description</Label>
                                                                <Textarea
                                                                    id="edit-description"
                                                                    {...registerEdit("description")}
                                                                />
                                                                {errorsEdit.description && (
                                                                    <p className="text-sm text-red-500">{String(errorsEdit.description?.message || '')}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="edit-section">Section</Label>
                                                                <Controller
                                                                    name="sectionId"
                                                                    control={controlEdit}
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            onValueChange={field.onChange}
                                                                            value={field.value}
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {sections.map((section) => (
                                                                                    <SelectItem key={section.id} value={section.id}>
                                                                                        {section.name}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    )}
                                                                />
                                                                {errorsEdit.sectionId && (
                                                                    <p className="text-sm text-red-500">{String(errorsEdit.sectionId?.message || '')}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <Label>Resources</Label>
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => appendResourceEdit({ title: "", url: "", type: "ARTICLE" })}
                                                                    >
                                                                        <Plus className="h-4 w-4 mr-1" />
                                                                        Add Resource
                                                                    </Button>
                                                                </div>

                                                                {resourceFieldsEdit.map((field, index) => (
                                                                    <div key={field.id} className="space-y-3 p-3 border rounded-md">
                                                                        <div className="flex justify-between items-center">
                                                                            <h4 className="text-sm font-medium">Resource {index + 1}</h4>
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() => removeResourceEdit(index)}
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`edit-resources.${index}.title`}>Title</Label>
                                                                            <Input
                                                                                id={`edit-resources.${index}.title`}
                                                                                {...registerEdit(`resources.${index}.title`)}
                                                                            />
                                                                            {errorsEdit.resources?.[index]?.title && (
                                                                                <p className="text-sm text-red-500">{String(errorsEdit.resources[index]?.title?.message || '')}</p>
                                                                            )}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`edit-resources.${index}.url`}>URL</Label>
                                                                            <Input
                                                                                id={`edit-resources.${index}.url`}
                                                                                {...registerEdit(`resources.${index}.url`)}
                                                                            />
                                                                            {errorsEdit.resources?.[index]?.url && (
                                                                                <p className="text-sm text-red-500">{errorsEdit.resources[index]?.url?.message}</p>
                                                                            )}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`edit-resources.${index}.type`}>Type</Label>
                                                                            <Controller
                                                                                name={`resources.${index}.type`}
                                                                                control={controlEdit}
                                                                                render={({ field }) => (
                                                                                    <Select
                                                                                        onValueChange={field.onChange}
                                                                                        value={field.value}
                                                                                    >
                                                                                        <SelectTrigger>
                                                                                            <SelectValue />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            <SelectItem value="ARTICLE">Article</SelectItem>
                                                                                            <SelectItem value="VIDEO">Video</SelectItem>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                )}
                                                                            />
                                                                            {errorsEdit.resources?.[index]?.type && (
                                                                                <p className="text-sm text-red-500">Invalid resource type</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                {resourceFieldsEdit.length === 0 && (
                                                                    <p className="text-sm text-muted-foreground">No resources added yet.</p>
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
                                                    onClick={() => handleDeleteTopic(topic.id)}
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

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
    return (
        <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {children}
        </label>
    );
}