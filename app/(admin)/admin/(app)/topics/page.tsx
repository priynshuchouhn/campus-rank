"use client";

import { useState, useEffect } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import axios from "axios";

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
    questions: any[]
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
    const [isLoading, setIsLoading] = useState(true);

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

    // Fetch topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setIsLoading(true);
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics`;
                if (selectedSection && selectedSection !== "0") {
                    url += `?sectionId=${selectedSection}`;
                }

                const response = await axios.get(url);
                console.log(response.data.data);
                setTopics(response.data.data);
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

    // Handle deleting a topic
    const handleDeleteTopic = async (topicId: string) => {
        if (!confirm("Are you sure you want to delete this topic?")) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics/${topicId}`);
            setTopics(topics.filter(topic => topic.id !== topicId));
            toast.success("Topic deleted successfully");
        } catch (error) {
            console.error("Error deleting topic:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete topic");
        }
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
                                    <TableHead>Questions</TableHead>
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
                                            </div>
                                        </TableCell>
                                        <TableCell>{topic.sectionName}</TableCell>
                                        <TableCell>{topic.questions}</TableCell>
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
                                                <Link href={`/admin/topics/${topic.id}/edit`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
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