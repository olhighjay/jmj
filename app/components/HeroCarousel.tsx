'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselImage {
    src: string;
    alt: string;
    title?: string;
    description?: string;
}

interface HeroCarouselProps {
    images: CarouselImage[];
    autoPlay?: boolean;
    interval?: number;
}

export function HeroCarousel({ images, autoPlay = true, interval = 5000 }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, images.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    if (images.length === 0) {
        return (
            <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
            {/* Carousel Images */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="relative w-full h-full bg-gray-200">
                            {image.src ? (
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    unoptimized={image.src.endsWith('.jpg') && image.src.includes('Daddy-hero')}
                                    onError={(e) => {
                                        console.error('Image failed to load:', image.src);
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500">Image Placeholder {index + 1}</p>
                                </div>
                            )}
                            {/* Overlay for text */}
                            {(image.title || image.description) && (
                                <>
                                    <div className="absolute inset-0 bg-black opacity-30">
                                    </div>
                                    <div className="text-center flex relative flex-col justify-center h-full text-white px-4">
                                        {image.title && (
                                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{image.title}</h2>
                                        )}
                                        {image.description && (
                                            <p className="text-lg md:text-xl">{image.description}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all z-10"
                        aria-label="Previous slide"
                    >
                        <svg
                            className="w-6 h-6 text-gray-800"
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
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all z-10"
                        aria-label="Next slide"
                    >
                        <svg
                            className="w-6 h-6 text-gray-800"
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
                </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

