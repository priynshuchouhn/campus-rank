"use client";

import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    return (
        <div className="min-h-[400px]">
            <MDEditor
                value={value}
                height={400}
                onChange={(val) => onChange(String(val ?? ''))}
            />
        </div>
    );
}