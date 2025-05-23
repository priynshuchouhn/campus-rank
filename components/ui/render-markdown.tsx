import clsx from "clsx";
import React from "react";

type MarkdownItem =
    | string
    | { type: 'code', content: string, language?: string }
    | { type: 'table', rows: string[][] };

export const RenderMarkdown = ({ content, previewMode = false }: { content: string; previewMode?: boolean }) => {
    const lines = content.split('\n');
    let processedLines = lines;

    if (previewMode) {
        // Find the first actual paragraph (not starting with markdown syntax)
        const isMarkdownSyntax = (line: string) => {
            const trimmed = line.trim();
            return (
                trimmed.startsWith('#') || // headers
                trimmed.startsWith('- ') || // unordered lists
                trimmed.startsWith('* ') || // unordered lists
                trimmed.startsWith('>') || // blockquotes
                trimmed.startsWith('```') || // code blocks
                trimmed.startsWith('[') || // links
                trimmed.startsWith('![') || // images
                trimmed.startsWith('|') || // tables
                trimmed.startsWith('1. ') || // ordered lists
                trimmed === '' // empty lines
            );
        };

        // Find the first non-markdown line
        const firstParagraphStart = lines.findIndex(line => !isMarkdownSyntax(line.trim()));
        if (firstParagraphStart !== -1) {
            // Find the end of this paragraph (next empty line or markdown syntax)
            const firstParagraphEnd = lines.slice(firstParagraphStart).findIndex((line, i) =>
                i > 0 && (line.trim() === '' || isMarkdownSyntax(line))
            );

            processedLines = firstParagraphEnd === -1
                ? lines.slice(firstParagraphStart)
                : lines.slice(firstParagraphStart, firstParagraphStart + firstParagraphEnd);
        } else {
            processedLines = []; // No regular paragraph found
        }
    }

    // Process code blocks
    const processCodeBlocks = (lines: string[]): MarkdownItem[] => {
        const result: MarkdownItem[] = [];
        let inCodeBlock = false;
        let currentCodeBlock: string[] = [];
        let currentLanguage = '';

        for (const line of lines) {
            if (line.trim().startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    result.push({
                        type: 'code',
                        content: currentCodeBlock.join('\n'),
                        language: currentLanguage
                    });
                    currentCodeBlock = [];
                    inCodeBlock = false;
                } else {
                    // Start of code block
                    inCodeBlock = true;
                    currentLanguage = line.trim().replace('```', '').trim();
                }
            } else if (inCodeBlock) {
                currentCodeBlock.push(line);
            } else {
                result.push(line);
            }
        }

        return result;
    };

    // Process tables
    const processTables = (items: MarkdownItem[]): MarkdownItem[] => {
        const result: MarkdownItem[] = [];
        let inTable = false;
        let currentTable: string[][] = [];

        for (const item of items) {
            if (typeof item === 'string') {
                const line = item;
                if (line.trim().startsWith('|')) {
                    if (!inTable) {
                        inTable = true;
                    }
                    // Skip separator rows that contain only |, -, and spaces
                    if (!/^\|[-|\s]+\|$/.test(line.trim())) {
                        const cells = line.split('|')
                            .map(cell => cell.trim())
                            .filter(Boolean);
                        currentTable.push(cells);
                    }
                } else if (inTable) {
                    if (currentTable.length > 0) {
                        result.push({
                            type: 'table',
                            rows: currentTable
                        });
                    }
                    currentTable = [];
                    inTable = false;
                    result.push(line);
                } else {
                    result.push(line);
                }
            } else {
                result.push(item);
            }
        }

        // Handle case where table is at the end of content
        if (inTable && currentTable.length > 0) {
            result.push({
                type: 'table',
                rows: currentTable
            });
        }

        return result;
    };

    const processedContent = processTables(processCodeBlocks(processedLines));

    return processedContent.map((item, index) => {
        if (typeof item === 'string') {
            const trimmedLine = item.trim();

            // Handle headers
            if (trimmedLine.startsWith('#')) {
                const level = trimmedLine.match(/^#+/)?.[0].length || 1;
                const text = trimmedLine.replace(/^#+\s*/, '');
                return (
                    <h1
                        key={index}
                        className={clsx('font-bold mb-4', {
                            'text-4xl': level === 1,
                            'text-3xl': level === 2,
                            'text-2xl': level === 3,
                            'text-xl': level === 4,
                        })}
                    >
                        {text}
                    </h1>
                );
            }

            // Handle lists
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                const listContent = trimmedLine.replace(/^[-*]\s*/, '');
                const indentLevel = (trimmedLine.match(/^\s*/)?.[0]?.length || 0) / 2; // Calculate indentation level
                const renderBoldText = (text: string) => {
                    const parts = text.split(/(\*\*[^*]+\*\*)/g);
                    return parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });
                };

                return (
                    <li key={index} className={clsx("list-disc mb-2", {
                        "ml-4": indentLevel === 0,
                        "ml-8": indentLevel === 1,
                        "ml-12": indentLevel === 2,
                        "ml-16": indentLevel === 3,
                    })}>
                        {renderBoldText(listContent)}
                    </li>
                );
            }

            // Handle ordered lists
            if (/^\d+\.\s/.test(trimmedLine)) {
                const listContent = trimmedLine.replace(/^\d+\.\s*/, '');
                const indentLevel = (trimmedLine.match(/^\s*/)?.[0]?.length || 0) / 3; // Calculate indentation level
                const renderBoldText = (text: string) => {
                    const parts = text.split(/(\*\*[^*]+\*\*)/g);
                    return parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });
                };

                return (
                    <li key={index} className={clsx("list-decimal mb-2", {
                        "ml-4": indentLevel === 0,
                        "ml-8": indentLevel === 1,
                        "ml-12": indentLevel === 2,
                        "ml-16": indentLevel === 3,
                    })}>
                        {renderBoldText(listContent)}
                    </li>
                );
            }

            // Handle inline code
            if (trimmedLine.includes('`')) {
                const parts = trimmedLine.split('`');
                return (
                    <p key={index} className="mb-4">
                        {parts.map((part, i) => (
                            i % 2 === 0 ? (
                                part
                            ) : (
                                <code key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
                                    {part}
                                </code>
                            )
                        ))}
                    </p>
                );
            }

            // Handle links
            if (trimmedLine.includes('[') && trimmedLine.includes('](')) {
                // Check if it's an image first
                if (trimmedLine.startsWith('![')) {
                    const imageMatch = trimmedLine.match(/!\[(.*?)\]\((.*?)\)/);
                    if (imageMatch) {
                        const [_, alt, src] = imageMatch;
                        return (
                            <div key={index} className="my-4">
                                <img
                                    src={src}
                                    alt={alt}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                        );
                    }
                }

                // Handle regular links with bold text and surrounding text
                const renderLinkContent = (content: string) => {
                    if (content.includes('**')) {
                        const parts = content.split(/(\*\*[^*]+\*\*)/g);
                        return parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={i}>{part.slice(2, -2)}</strong>;
                            }
                            return part;
                        });
                    }
                    return content;
                };

                // Process the entire line, preserving text before and after links
                const processLine = (line: string) => {
                    const parts = line.split(/(\[.*?\]\(.*?\))/g);
                    return parts.map((part, i) => {
                        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                        if (linkMatch) {
                            const [_, text, url] = linkMatch;
                            return (
                                <a key={i} href={url} className="text-blue-500 hover:underline">
                                    {renderLinkContent(text)}
                                </a>
                            );
                        }
                        return part;
                    });
                };

                return (
                    <p key={index} className="mb-4">
                        {processLine(trimmedLine)}
                    </p>
                );
            }

            // Handle blockquotes
            if (trimmedLine.startsWith('>')) {
                const quoteContent = trimmedLine.replace(/^>\s*/, '');
                const renderBlockquoteContent = (content: string) => {
                    const parts = content.split(/(\*\*[^*]+\*\*)/g);
                    return parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={i}>{part}</span>;
                    });
                };

                return (
                    <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
                        <p>{renderBlockquoteContent(quoteContent)}</p>
                    </blockquote>
                );
            }

            // Handle horizontal rule
            if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___' ||
                trimmedLine === '- - -' || trimmedLine === '* * *' || trimmedLine === '_ _ _' ||
                trimmedLine === '----------' || trimmedLine === '**********' || trimmedLine === '__________') {
                return <hr key={index} className="my-8 border-gray-200" />;
            }

            // Handle bold text
            if (trimmedLine.includes('**')) {
                const renderBoldText = (text: string) => {
                    // First handle HTML links within bold text
                    const parts = text.split(/(<a[^>]*>.*?<\/a>)/g);
                    return parts.map((part, i) => {
                        if (part.startsWith('<a') && part.endsWith('</a>')) {
                            // This is an HTML link, wrap it in strong tags
                            return <strong key={i} dangerouslySetInnerHTML={{ __html: part }} />;
                        }
                        // Handle regular bold text
                        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                        return boldParts.map((boldPart, j) => {
                            if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                                return <strong key={`${i}-${j}`}>{boldPart.slice(2, -2)}</strong>;
                            }
                            return boldPart;
                        });
                    });
                };

                return (
                    <p key={index} className="mb-4">
                        {renderBoldText(trimmedLine)}
                    </p>
                );
            }

            // Handle italic text
            const renderItalicText = (text: string): (string | React.ReactElement)[] => {
                // First handle asterisk-based italics
                let parts: (string | React.ReactElement)[] = text.split(/(\*[^*]+\*)/g);
                parts = parts.map(part => {
                    if (typeof part === 'string' && part.startsWith('*') && part.endsWith('*')) {
                        return <em key={Math.random()}>{part.slice(1, -1)}</em>;
                    }
                    return part;
                });

                // Then handle underscore-based italics
                const processedParts: (string | React.ReactElement)[] = [];
                parts.forEach(part => {
                    if (typeof part === 'string') {
                        const subParts = part.split(/(_[^_]+_)/g);
                        subParts.forEach(subPart => {
                            if (typeof subPart === 'string' && subPart.startsWith('_') && subPart.endsWith('_')) {
                                processedParts.push(<em key={Math.random()}>{subPart.slice(1, -1)}</em>);
                            } else {
                                processedParts.push(subPart);
                            }
                        });
                    } else {
                        processedParts.push(part);
                    }
                });

                return processedParts;
            };

            // Handle italic text
            if (trimmedLine.includes('*') || trimmedLine.includes('_')) {
                return (
                    <p key={index} className="mb-4">
                        {renderItalicText(trimmedLine)}
                    </p>
                );
            }

            // Default paragraph
            return (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {item}
                </p>
            );
        } else if (item.type === 'code') {
            return (
                <pre key={index} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <code className={`text-sm font-mono ${item.language ? `language-${item.language}` : ''}`}>
                        {item.content}
                    </code>
                </pre>
            );
        } else if (item.type === 'table') {
            const [header, ...rows] = item.rows;
            return (
                <div key={index} className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                {header.map((cell, i) => (
                                    <th key={i} className="border px-4 py-2 text-left">
                                        {cell}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="border px-4 py-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return null;
    });
};