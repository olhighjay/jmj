'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    caption?: string;
    type?: 'image' | 'video';
}

interface ImageGalleryProps {
    images: GalleryImage[];
    isOpen: boolean;
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export function ImageGallery({
    images,
    isOpen,
    currentIndex,
    onClose,
    onNext,
    onPrevious,
}: ImageGalleryProps) {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const imageLoaded = loadedImages.has(currentIndex);
    const imageError = imageErrors.has(currentIndex);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset loading state when image changes
    useEffect(() => {
        // Don't reset if image is already loaded
        if (!loadedImages.has(currentIndex) && !imageErrors.has(currentIndex)) {
            // Image will start loading fresh
        }
    }, [currentIndex, loadedImages, imageErrors]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                onPrevious();
            } else if (e.key === 'ArrowRight') {
                onNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrevious]);

    if (!isOpen || !images[currentIndex]) return null;

    const currentImage = images[currentIndex];

    // Helper function to determine if current item is a video
    const isVideo = (src: string, type?: 'image' | 'video'): boolean => {
        if (type === 'video') return true;
        if (type === 'image') return false;
        // Auto-detect by file extension
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
        return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
    };

    const currentIsVideo = isVideo(currentImage?.src || '', currentImage?.type);

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close gallery"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
                    aria-label="Previous image"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
                    aria-label="Next image"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}

            {/* Image Container */}
            <div
                className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {currentImage.src ? (
                        <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                            {currentIsVideo ? (
                                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                                    <video
                                        key={`${currentIndex}-${currentImage.src}`}
                                        src={currentImage.src}
                                        controls
                                        className="max-w-full max-h-[80vh] w-auto h-auto"
                                        onLoadedData={() => {
                                            console.log('Video loaded successfully:', currentImage.src);
                                            setLoadedImages((prev) => new Set(prev).add(currentIndex));
                                            setImageErrors((prev) => {
                                                const newSet = new Set(prev);
                                                newSet.delete(currentIndex);
                                                return newSet;
                                            });
                                        }}
                                        onError={(e) => {
                                            console.error('Failed to load video:', currentImage.src, e);
                                            setImageErrors((prev) => new Set(prev).add(currentIndex));
                                            setLoadedImages((prev) => {
                                                const newSet = new Set(prev);
                                                newSet.delete(currentIndex);
                                                return newSet;
                                            });
                                        }}
                                        autoPlay={false}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    {!imageLoaded && !imageError && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {!imageError ? (
                                        <>
                                            <Image
                                                key={`${currentIndex}-${currentImage.src}`}
                                                src={currentImage.src}
                                                alt={currentImage.alt}
                                                fill
                                                className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                onLoad={() => {
                                                    console.log('Image loaded successfully:', currentImage.src);
                                                    setLoadedImages((prev) => new Set(prev).add(currentIndex));
                                                    setImageErrors((prev) => {
                                                        const newSet = new Set(prev);
                                                        newSet.delete(currentIndex);
                                                        return newSet;
                                                    });
                                                }}
                                                onError={(e) => {
                                                    console.error('Failed to load image:', currentImage.src, e);
                                                    setImageErrors((prev) => new Set(prev).add(currentIndex));
                                                    setLoadedImages((prev) => {
                                                        const newSet = new Set(prev);
                                                        newSet.delete(currentIndex);
                                                        return newSet;
                                                    });
                                                }}
                                                unoptimized={true}
                                                priority
                                            />
                                            {!imageLoaded && !imageError && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white">
                                                <p className="text-lg mb-2">Failed to load image</p>
                                                <p className="text-sm text-gray-400">{currentImage.alt}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                            <p className="text-white">Image Placeholder {currentIndex + 1}</p>
                        </div>
                    )}

                    {/* Caption */}
                    {(currentImage.caption || images.length > 1) && (
                        <div className="mt-4 text-center text-white">
                            {currentImage.caption && (
                                <p className="text-lg mb-2">{currentImage.caption}</p>
                            )}
                            {images.length > 1 && (
                                <p className="text-sm text-gray-400">
                                    {currentIndex + 1} of {images.length}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

