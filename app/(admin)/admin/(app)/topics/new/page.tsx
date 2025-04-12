"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

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

export default function NewTopicPage() {
    const router = useRouter();
    const [sections, setSections] = useState<Section[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Create form for adding a new topic
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset: resetTopicForm,
        setValue
    } = useForm<TopicFormValues>({
        resolver: zodResolver(topicSchema),
        defaultValues: {
            title: "",
            description: "",
            sectionId: "",
            resources: []
        },
    });


    // Use field array for resources
    const {
        fields: resourceFields,
        append: appendResource,
        remove: removeResource
    } = useFieldArray({
        control,
        name: "resources"
    });

    // Fetch sections
    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections`);
                setSections(response.data.data);
            } catch (error) {
                console.error("Error fetching sections:", error);
                toast.error("Failed to load sections");
            }
        };

        fetchSections();
    }, []);

    // Handle creating a new topic
    const handleAddTopic = async (data: TopicFormValues) => {
        try {
            setIsSubmitting(true);

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics`, data);

            toast.success("Topic created successfully");
            router.push("/admin/topics");
        } catch (error) {
            console.error("Error creating topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to create topic");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Toaster position="top-right" />

            <div className="flex items-center mb-8 gap-4">
                <Link href="/admin/topics">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Add New Topic</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Topic Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleAddTopic)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Topic Title</Label>
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="Enter topic title"
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register("description")}
                                placeholder="Enter topic description"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="section">Section</Label>
                            <Controller
                                name="sectionId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a section" />
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
                            {errors.sectionId && (
                                <p className="text-sm text-red-500">{errors.sectionId.message}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Resources</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendResource({ title: "", url: "", type: "ARTICLE" })}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Resource
                                </Button>
                            </div>

                            {resourceFields.map((field, index) => (
                                <div key={field.id} className="space-y-3 p-3 border rounded-md">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-sm font-medium">Resource {index + 1}</h4>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeResource(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`resources.${index}.title`}>Title</Label>
                                        <Input
                                            id={`resources.${index}.title`}
                                            {...register(`resources.${index}.title`)}
                                            placeholder="Resource title"
                                        />
                                        {errors.resources?.[index]?.title && (
                                            <p className="text-sm text-red-500">{String(errors.resources[index]?.title?.message || '')}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`resources.${index}.url`}>URL</Label>
                                        <Input
                                            id={`resources.${index}.url`}
                                            {...register(`resources.${index}.url`)}
                                            placeholder="https://example.com"
                                        />
                                        {errors.resources?.[index]?.url && (
                                            <p className="text-sm text-red-500">{errors.resources[index]?.url?.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`resources.${index}.type`}>Type</Label>
                                        <Controller
                                            name={`resources.${index}.type`}
                                            control={control}
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
                                        {errors.resources?.[index]?.type && (
                                            <p className="text-sm text-red-500">Invalid resource type</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {resourceFields.length === 0 && (
                                <p className="text-sm text-muted-foreground">No resources added yet.</p>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Add Topic"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}