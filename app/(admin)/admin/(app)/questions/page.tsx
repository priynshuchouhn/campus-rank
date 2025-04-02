"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Question } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const response = await fetch("/api/questions");

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Questions</h1>
        <Link href="/admin/questions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Question
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search questions by title, topic, or section..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">No questions found</p>
              <Link href="/admin/questions/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Question
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Section / Topic</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Test Cases</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{question.section}</span>
                        <span className="text-gray-500 text-sm">{question.topic}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{question.testCases.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
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