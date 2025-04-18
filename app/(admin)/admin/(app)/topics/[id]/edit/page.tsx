import { Button } from "@/components/ui/button";
import { ArrowLeft,} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import TopicForm from "@/components/ui/topic-form";

interface EditTopicPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTopicPage({ params }: EditTopicPageProps) {
    const {id} = await params;
    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/topics/${id}`);
    const topicData = response.data


    if (!topicData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8 gap-4">
                    <Link href="/admin/topics">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Topic Not Found</h1>
                </div>
                <p>The requested topic could not be found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8 gap-4">
                <Link href="/admin/topics">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Edit Topic</h1>
            </div>

            <TopicForm initialData={topicData} id={id}/>
        </div>
    );
} 