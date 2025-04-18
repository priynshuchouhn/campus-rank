import { Button } from "@/components/ui/button";
import { ArrowLeft} from "lucide-react";
import Link from "next/link";
import TopicForm from "@/components/ui/topic-form";

export default function NewTopicPage() {
    // Handle creating a new topic

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8 gap-4">
                <Link href="/admin/topics">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Add New Topic</h1>
            </div>

            <TopicForm />
        </div>
    );
}