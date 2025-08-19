import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReportActions } from "./components/report-actions";

export default async function AdminReportsPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/admin/login");
    }

    const reports = await prisma.report.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Manage Reports</h1>

            {reports.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No reports found.</p>
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
                                    <p className="text-sm">
                                        Submitted by: {report.user.name} ({report.user.email})
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
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
                                    <ReportActions report={report} />
                                </div>
                            </div>
                            <p className="text-sm">{report.description}</p>
                            <p className="text-xs text-muted-foreground">
                                Submitted on {new Date(report.createdAt).toLocaleDateString('en-IN', {
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