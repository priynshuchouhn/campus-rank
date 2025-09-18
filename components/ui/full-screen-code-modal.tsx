import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Button } from './button';
import { Minimize } from 'lucide-react';

export default function FullScreenCodeModal({ isOpen, onClose, children, title, language, onLanguageChange, languages }: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
    title: string,
    language: string,
    onLanguageChange: (value: string) => void,
    languages: Array<{ id: string, name: string, default: string }>
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="text-base font-medium">{title}</h2>
                <div className="flex items-center gap-3">
                    <Select value={language} onValueChange={onLanguageChange}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map(lang => (
                                <SelectItem key={lang.id} value={lang.id}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={onClose}>
                        <Minimize className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                {children}
            </div>
        </div>
    );
} 