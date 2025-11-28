'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import { ImageGallery } from '../components/ImageGallery';

type PhotoCategory = 'all' | 'children' | 'grandchildren' | 'brigade' | 'personal';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    caption?: string;
    category: PhotoCategory;
}

// Mock data - replace with actual API call
const mockPhotos: GalleryImage[] = [
    { id: 1, src: '/placeholder.jpg', alt: 'Photo 1', caption: 'Memory 1', category: 'children' },
    { id: 2, src: '/placeholder.jpg', alt: 'Photo 2', caption: 'Memory 2', category: 'children' },
    { id: 3, src: '/placeholder.jpg', alt: 'Photo 3', caption: 'Memory 3', category: 'grandchildren' },
    { id: 4, src: '/placeholder.jpg', alt: 'Photo 4', caption: 'Memory 4', category: 'grandchildren' },
    { id: 5, src: '/placeholder.jpg', alt: 'Photo 5', caption: 'Memory 5', category: 'brigade' },
    { id: 6, src: '/placeholder.jpg', alt: 'Photo 6', caption: 'Memory 6', category: 'brigade' },
    { id: 7, src: '/placeholder.jpg', alt: 'Photo 7', caption: 'Memory 7', category: 'personal' },
    { id: 8, src: '/placeholder.jpg', alt: 'Photo 8', caption: 'Memory 8', category: 'personal' },
    { id: 9, src: '/placeholder.jpg', alt: 'Photo 9', caption: 'Memory 9', category: 'children' },
    { id: 10, src: '/placeholder.jpg', alt: 'Photo 10', caption: 'Memory 10', category: 'grandchildren' },
    { id: 11, src: '/placeholder.jpg', alt: 'Photo 11', caption: 'Memory 11', category: 'brigade' },
    { id: 12, src: '/placeholder.jpg', alt: 'Photo 12', caption: 'Memory 12', category: 'personal' },
    { id: 13, src: '/placeholder.jpg', alt: 'Photo 13', caption: 'Memory 13', category: 'children' },
    { id: 14, src: '/placeholder.jpg', alt: 'Photo 14', caption: 'Memory 14', category: 'grandchildren' },
    { id: 15, src: '/placeholder.jpg', alt: 'Photo 15', caption: 'Memory 15', category: 'brigade' },
];

const tabs: { id: PhotoCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'children', label: 'With Children' },
    { id: 'grandchildren', label: 'With Grandchildren' },
    { id: 'brigade', label: 'Brigade' },
    { id: 'personal', label: 'Personal' },
];

async function fetchPhotos() {
    // Replace with actual API call
    return Promise.resolve(mockPhotos);
}

export default function PhotoGallery() {
    const { data: photos, isLoading } = useQuery({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
    });

    const [selectedTab, setSelectedTab] = useState<PhotoCategory>('all');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const photoArray = (photos as GalleryImage[]) || [];

    // Filter photos based on selected tab
    const filteredPhotos = selectedTab === 'all'
        ? photoArray
        : photoArray.filter(photo => photo.category === selectedTab);

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
            <section className="mb-8">
                <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
                    <div className="relative w-full h-full bg-gray-200">
                        {/* Replace with actual image: <Image src="/photo-gallery-hero.jpg" alt="Photo Gallery" fill className="object-cover" /> */}
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-500">Hero Image Placeholder</p>
                        </div>
                        {/* Text Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                    Photo Gallery
                                </h2>
                                <p className="text-lg md:text-xl">A collection of cherished memories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16 max-w-7xl">
                <section className="text-center mb-12">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-red-800 mb-6"
                    >
                        Photo Gallery
                    </h1>
                    <p className="text-lg text-gray-600">
                        A collection of cherished memories
                    </p>
                </section>

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
                                            src={photo.src}
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
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
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
                    images={filteredPhotos}
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
