'use client';

import { useState, useRef, useEffect } from 'react';

interface TributeCardProps {
    tribute: {
        id: number;
        name: string;
        relationship: string;
        message: string;
        date: string;
    };
    isLast?: boolean;
}

export function TributeCard({ tribute, isLast = false }: TributeCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const isTextLong = (text: HTMLParagraphElement) => {
        const lineHeight = parseInt(window.getComputedStyle(text).lineHeight);
        const maxHeight = lineHeight * 2;
        const actualHeight = text.scrollHeight;

        if (actualHeight > maxHeight) {
            setShowSeeMore(true);
        }
    }

    useEffect(() => {
        if (textRef.current) {
            // Check if text is more than 2 lines
            isTextLong(textRef.current)
        }
    }, [tribute.message]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={!isLast ? 'border-b border-gray-200 pb-8' : ''}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {tribute.name}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                        {tribute.relationship}
                    </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                    {new Date(tribute.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
            <div>
                <p
                    ref={textRef}
                    className={`text-gray-700 leading-relaxed ${!isExpanded && showSeeMore ? 'line-clamp-2' : ''
                        }`}
                >
                    {tribute.message}
                </p>
                {showSeeMore && (
                    <button
                        onClick={toggleExpand}
                        className="mt-2 text-red-700 hover:text-red-900 font-medium text-sm transition-colors"
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </button>
                )}
            </div>
        </div>
    );
}

