'use client';

import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const mdParser = new MarkdownIt();

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    return (
        <div className="min-h-[400px]">
            <MdEditor
                value={value}
                style={{ height: '400px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ text }) => onChange(text)}
                config={{
                    view: {
                        menu: true,
                        md: true,
                        html: true
                    },
                    canView: {
                        menu: true,
                        md: true,
                        html: true,
                        fullScreen: true,
                        hideMenu: true
                    }
                }}
            />
        </div>
    );
} 