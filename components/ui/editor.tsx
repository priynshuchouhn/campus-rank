'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { Editor as CKEditorType } from '@ckeditor/ckeditor5-core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface EditorProps {
    data: string;
    onChange: (data: string) => void;
}

export default function Editor({ data, onChange }: EditorProps) {
    return (
        <div className="min-h-[400px]">
            <style jsx global>{`
                .ck-editor__editable {
                    min-height: 400px;
                }
            `}</style>
            <CKEditor
                editor={ClassicEditor as any}
                data={data}
                onChange={(event: any, editor: CKEditorType) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'blockQuote',
                        'insertTable',
                        'codeBlock',
                        '|',
                        'undo',
                        'redo'
                    ],
                    codeBlock: {
                        languages: [
                            { language: 'plaintext', label: 'Plain text' },
                            { language: 'c', label: 'C' },
                            { language: 'cs', label: 'C#' },
                            { language: 'cpp', label: 'C++' },
                            { language: 'css', label: 'CSS' },
                            { language: 'diff', label: 'Diff' },
                            { language: 'html', label: 'HTML' },
                            { language: 'java', label: 'Java' },
                            { language: 'javascript', label: 'JavaScript' },
                            { language: 'php', label: 'PHP' },
                            { language: 'python', label: 'Python' },
                            { language: 'ruby', label: 'Ruby' },
                            { language: 'typescript', label: 'TypeScript' },
                            { language: 'xml', label: 'XML' }
                        ]
                    }
                }}
            />
        </div>
    );
} 