'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import { ImageGallery } from '../components/ImageGallery';
import { getImageUrl } from '@/lib/supabase-storage';
import { HeroCarousel } from '../components/HeroCarousel';

type PhotoCategory = 'all' | 'children' | 'grandchildren' | 'brigade' | 'personal' | 'family';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    caption?: string;
    category: PhotoCategory;
}

const carouselImage = [
    {
        src: getImageUrl('/general/Dad and Dr Kay 3.png'),
        alt: 'Dad and Dr Kay',
        title: 'Photo Gallery',
        description: 'A collection of cherished memories',
    },
];


const tabs: { id: PhotoCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'children', label: 'With Children' },
    { id: 'grandchildren', label: 'With Grandchildren' },
    { id: 'brigade', label: 'Brigade' },
    { id: 'personal', label: 'Personal' },
];

async function fetchPhotos(): Promise<GalleryImage[]> {
    const response = await fetch('/api/gallery');
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || 'Failed to fetch gallery photos';
        console.error('API Error:', errorMessage, errorData);
        throw new Error(errorMessage);
    }
    return response.json();
}

export default function PhotoGallery() {
    const { data: photos, isLoading, error: queryError } = useQuery<GalleryImage[]>({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
        retry: 1,
    });

    const [selectedTab, setSelectedTab] = useState<PhotoCategory>('all');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const photoArray = (photos as GalleryImage[]) || [];

    // Filter photos based on selected tab
    const filteredPhotos = selectedTab === 'all'
        ? photoArray
        : photoArray.filter(photo => photo.category === selectedTab);

    // Transform photos for ImageGallery with processed image URLs
    // Remove leading slash for Supabase Storage paths
    const transformedPhotos = filteredPhotos.map(photo => {
        const cleanPath = photo.src.startsWith('/') ? photo.src.slice(1) : photo.src;
        const imageUrl = getImageUrl(cleanPath);
        if (process.env.NODE_ENV === 'development') {
            console.log('Transforming image:', { original: photo.src, cleanPath, imageUrl });
        }
        return {
            ...photo,
            src: imageUrl,
        };
    });

    const openGallery = (index: number) => {
        setSelectedIndex(index);
        setIsGalleryOpen(true);
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
    };

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
    };

    const previousImage = () => {
        setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };

    const handleTabChange = (tabId: PhotoCategory) => {
        setSelectedTab(tabId);
        setSelectedIndex(0); // Reset to first image when changing tabs
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Image with Text Overlay */}
            <HeroCarousel images={carouselImage} autoPlay={false} interval={5000} />

            <main className="container mx-auto px-4 py-16 max-w-7xl">
                {/* <section className="text-center mb-12">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-red-800 mb-6"
                    >
                        Photo Gallery
                    </h1>
                    <p className="text-lg text-gray-600">
                        A collection of cherished memories
                    </p>
                </section> */}

                {/* Tab Navigation */}
                <section className="mb-8">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-200 pb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium transition-all rounded-t-lg ${selectedTab === tab.id
                                    ? 'text-red-700 border-b-2 border-red-700 bg-red-50'
                                    : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                                {selectedTab === tab.id && (
                                    <span className="ml-2 text-xs text-red-600">
                                        ({filteredPhotos.length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {isLoading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading photos...</p>
                    </div>
                ) : queryError ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 font-medium mb-2">Error loading photos</p>
                        <p className="text-sm text-gray-600 mb-4">{queryError.message}</p>
                        <p className="text-xs text-gray-500">
                            Please try again later
                        </p>
                    </div>
                ) : filteredPhotos.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No photos found in this category.</p>
                    </div>
                ) : (
                    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                        {filteredPhotos.map((photo, index) => (
                            <div
                                key={photo.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                                onClick={() => openGallery(index)}
                            >
                                <div className="relative w-full aspect-square bg-gray-200">
                                    {photo.src ? (
                                        <Image
                                            src={getImageUrl(photo.src)}
                                            alt={photo.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p className="text-gray-400 text-xs text-center px-2">
                                                Photo {index + 1}
                                            </p>
                                        </div>
                                    )}
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {photo.caption && (
                                    <div className="p-2">
                                        <p className="text-xs text-gray-600 truncate">{photo.caption}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Image Gallery Modal */}
                <ImageGallery
                    images={transformedPhotos}
                    isOpen={isGalleryOpen}
                    currentIndex={selectedIndex}
                    onClose={closeGallery}
                    onNext={nextImage}
                    onPrevious={previousImage}
                />

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600">
                        <strong>Note:</strong> If you have any of his photos that you would want us to add here, please send with the appropriate caption to <a
                            href="mailto:oluwasemowolegacy@gmail.com"
                            className="text-red-700 hover:text-red-900 font-medium"
                        >
                            oluwasemowolegacy@gmail.com
                        </a>. Thank you.
                    </p>
                </div>
            </main>
        </div>
    );
}
