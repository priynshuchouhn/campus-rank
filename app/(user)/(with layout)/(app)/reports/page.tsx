import { redirect } from "next/navigation";
import { ReportForm } from "@/components/ui/report-form";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function ReportsPage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/get-started");
    }
    let reports: any[] = [];
    try {
        reports = await prisma.report.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Reports</h1>
                <ReportForm />
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No reports submitted yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="border rounded-lg p-4 space-y-2"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{report.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {report.type.replace("_", " ")}
                                    </p>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${report.status === "OPEN"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : report.status === "IN_PROGRESS"
                                            ? "bg-blue-100 text-blue-800"
                                            : report.status === "RESOLVED"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {report.status.replace("_", " ")}
                                </span>
                            </div>
                            <p className="text-sm">{report.description}</p>
                            <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(report.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 