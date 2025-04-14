import clsx from "clsx";

export const RenderMarkdown = ({ content }: { content: string }) => {
    return content.split('\n').map((line, index) => {
        const trimmedLine = line.trim();

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
            return (
                <li key={index} className="ml-4 list-disc mb-2">
                    {trimmedLine.replace(/^[-*]\s*/, '')}
                </li>
            );
        }

        // Handle code blocks
        if (trimmedLine.startsWith('```')) {
            return (
                <pre key={index} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                    <code className="text-sm font-mono">
                        {trimmedLine.replace(/^```\w*\n?/, '')}
                    </code>
                </pre>
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
            const linkMatch = trimmedLine.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                const [_, text, url] = linkMatch;
                return (
                    <p key={index} className="mb-4">
                        {trimmedLine.replace(/\[(.*?)\]\((.*?)\)/, `<a href="${url}" class="text-blue-500 hover:underline">${text}</a>`)}
                    </p>
                );
            }
        }

        // Handle blockquotes
        if (trimmedLine.startsWith('>')) {
            return (
                <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
                    {trimmedLine.replace(/^>\s*/, '')}
                </blockquote>
            );
        }

        // Handle horizontal rule
        if (trimmedLine === '---' || trimmedLine === '***') {
            return <hr key={index} className="my-8 border-gray-200" />;
        }

        // Handle bold text
        if (trimmedLine.includes('**')) {
            const parts = trimmedLine.split('**');
            return (
                <p key={index} className="mb-4">
                    {parts.map((part, i) => (
                        i % 2 === 0 ? (
                            part
                        ) : (
                            <strong key={i}>{part}</strong>
                        )
                    ))}
                </p>
            );
        }

        // Handle italic text
        if (trimmedLine.includes('*')) {
            const parts = trimmedLine.split('*');
            return (
                <p key={index} className="mb-4">
                    {parts.map((part, i) => (
                        i % 2 === 0 ? (
                            part
                        ) : (
                            <em key={i}>{part}</em>
                        )
                    ))}
                </p>
            );
        }

        // Default paragraph
        return (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                {line}
            </p>
        );
    });
};