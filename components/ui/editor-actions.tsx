import { Check, Play } from "lucide-react";
import { Button } from "./button";

export default function EditorActions({ runCode, submitCode, isRunning }: any) {
    return (
        <div className="border-t border-gray-200 dark:border-gray-800 p-3 flex justify-end gap-3">
            <Button variant="outline" onClick={runCode} disabled={isRunning}>
                <Play className="h-4 w-4 mr-2" />
                Run Code
            </Button>
            <Button onClick={submitCode} disabled={isRunning}>
                <Check className="h-4 w-4 mr-2" />
                Submit
            </Button>
        </div>
    );
}