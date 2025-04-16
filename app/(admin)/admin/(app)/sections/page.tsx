"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Search, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Section } from "@/lib/interfaces";
import axios from "axios";

export const dynamic = 'force-dynamic';
// Define schema for section validation
const sectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type SectionFormValues = z.infer<typeof sectionSchema>;



export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSectionDialog, setShowNewSectionDialog] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create form for adding a new section
  const newSectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Create form for editing a section
  const editSectionForm = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch predefined sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections`);
        setSections(response.data.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
        toast.error("Failed to load sections");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  const filteredSections = useMemo(() => sections.filter((section) =>
    section?.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), [sections, searchQuery]);

  const handleAddSection = async (data: SectionFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections`, {
        ...data,
        isPredefined: true
      });
      setSections([...sections, response.data.data]);
      toast.success("Section created successfully");
      setShowNewSectionDialog(false);
      newSectionForm.reset();
    } catch (error) {
      console.error("Error creating section:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create section");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSection = async (data: SectionFormValues) => {
    if (!editingSectionId) return;

    try {
      setIsSubmitting(true);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections/${editingSectionId}`, {
        ...data,
        isPredefined: true
      });
      setSections(
        sections.map((section) =>
          section.id === editingSectionId ? response.data.data : section
        )
      );

      toast.success("Section updated successfully");
      setEditingSectionId(null);
      editSectionForm.reset();
    } catch (error) {
      console.error("Error updating section:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update section");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sections/${sectionId}`);

      setSections(sections.filter((section) => section.id !== sectionId));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete section");
    }
  };

  const startEditing = (section: Section) => {
    editSectionForm.reset({
      name: section.name,
      description: section.description,
    });
    setEditingSectionId(section.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sections Management</h1>
        <Dialog open={showNewSectionDialog} onOpenChange={setShowNewSectionDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Section</DialogTitle>
              <DialogDescription>
                Create a new  section that will be available to all users
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={newSectionForm.handleSubmit(handleAddSection)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Section Name
                </label>
                <Input
                  id="name"
                  {...newSectionForm.register("name")}
                  placeholder="Enter section name"
                />
                {newSectionForm.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {newSectionForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  {...newSectionForm.register("description")}
                  placeholder="Enter section description"
                />
                {newSectionForm.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {newSectionForm.formState.errors.description.message}
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
                    "Add Section"
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
            <CardTitle>Sections List</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sections..."
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
          ) : filteredSections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No  sections found. Add your first section to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Topics</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSections.map((section) => (
                  <TableRow key={section.id}>
                    <TableCell className="font-medium">{section.name}</TableCell>
                    <TableCell>{section.description}</TableCell>
                    <TableCell className="text-right">{section.topicsCount}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Dialog open={editingSectionId === section.id} onOpenChange={(open) => !open && setEditingSectionId(null)}>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEditing(section)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Predefined Section</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={editSectionForm.handleSubmit(handleUpdateSection)} className="space-y-4">
                              <div className="space-y-2">
                                <label htmlFor="edit-name" className="text-sm font-medium">
                                  Section Name
                                </label>
                                <Input
                                  id="edit-name"
                                  {...editSectionForm.register("name")}
                                />
                                {editSectionForm.formState.errors.name && (
                                  <p className="text-sm text-red-500">
                                    {editSectionForm.formState.errors.name.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="edit-description" className="text-sm font-medium">
                                  Description
                                </label>
                                <Textarea
                                  id="edit-description"
                                  {...editSectionForm.register("description")}
                                />
                                {editSectionForm.formState.errors.description && (
                                  <p className="text-sm text-red-500">
                                    {editSectionForm.formState.errors.description.message}
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
                          onClick={() => handleDeleteSection(section.id)}
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