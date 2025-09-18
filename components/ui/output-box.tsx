export default function OutputBox({ output }: { output: string }) {
    return (
        <div className="p-3 border-t">
            <h3 className="text-sm font-medium mb-2">Output:</h3>
            <pre className="bg-black text-green-400 p-3 rounded-md text-sm overflow-x-auto max-h-32 overflow-scroll">
                {output || "No output yet"}
            </pre>
        </div>
    );
}