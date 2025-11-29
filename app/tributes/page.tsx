'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { TributeCard } from '../components/TributeCard';
import { getImageUrl } from '@/lib/supabase-storage';

interface Tribute {
    id: number;
    name: string;
    relationship: string;
    message: string;
    date: string;
    isChild?: boolean;
}


async function fetchTributes(): Promise<Tribute[]> {
    const response = await fetch('/api/tributes');
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || 'Failed to fetch tributes';
        console.error('API Error:', errorMessage, errorData);
        throw new Error(errorMessage);
    }
    return response.json();
}

export default function Tributes() {
    const queryClient = useQueryClient();
    const { data: tributes, isLoading, error: queryError } = useQuery<Tribute[]>({
        queryKey: ['tributes'],
        queryFn: fetchTributes,
        retry: 1,
    });

    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [visibleTributesCount, setVisibleTributesCount] = useState(20);

    const tributeArray = (tributes as Tribute[]) || [];
    const childrenTributes = tributeArray.filter(t => t.isChild);
    const allGeneralTributes = tributeArray.filter(t => !t.isChild);
    const visibleGeneralTributes = allGeneralTributes.slice(0, visibleTributesCount);
    const hasMoreTributes = allGeneralTributes.length > visibleTributesCount;

    const loadMoreTributes = () => {
        setVisibleTributesCount(prev => prev + 20);
    };


    const heroImages = [
        {
            src: getImageUrl('header/Daddy-hero-1.jpg'),
            alt: 'Tributes',
            title: 'Tributes',
            description: 'Messages of love, respect, and remembrance',
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/tributes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit tribute');
            }

            // Invalidate and refetch tributes
            await queryClient.invalidateQueries({ queryKey: ['tributes'] });

            setSubmitSuccess(true);
            setFormData({ name: '', relationship: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting tribute:', error);
            setSubmitError(
                error instanceof Error ? error.message : 'Failed to submit tribute. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Carousel */}
            <section className="mb-8">
                <HeroCarousel images={heroImages} autoPlay={true} interval={5000} />
            </section>

            <main className="container mx-auto px-4 py-16 max-w-6xl">
                {/* <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">
                        Tributes
                    </h1>
                    <p className="text-lg text-gray-600">
                        Messages of love, respect, and remembrance
                    </p>
                </section> */}

                {/* Short Description About the Deceased */}
                <section className="mb-12 bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-center">
                        <p className="text-lg md:text-xl mb-4">
                            This page is dedicated to celebrating the life and legacy of <strong>Pa Evangelist Omotayo Johnson Oluwasemowo</strong>.
                            We invite you to share your memories, thoughts, and tributes to honor a life well-lived.
                        </p>
                        <p className="text-base md:text-lg text-gray-600">
                            Your words of comfort and remembrance mean the world to our family during this time.
                        </p>
                    </div>
                </section>

                {/* Children's Tributes Section */}
                {childrenTributes.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">
                            Tributes from Children
                        </h2>
                        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-l-4 border-red-600">
                            <div className="space-y-8">
                                {childrenTributes.map((tribute, index) => (
                                    <TributeCard
                                        key={tribute.id}
                                        tribute={tribute}
                                        isLast={index === childrenTributes.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* General Tributes Section */}
                <section className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-8 text-center">
                        General Tributes
                    </h2>
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading tributes...</p>
                        </div>
                    ) : queryError ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
                            <p className="text-red-600 font-medium mb-2">Error loading tributes</p>
                            <p className="text-sm text-gray-600 mb-4">{queryError.message}</p>
                            <p className="text-xs text-gray-500">
                                Try again later.
                            </p>
                        </div>
                    ) : allGeneralTributes.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
                            <p className="text-gray-600">No tributes yet. Be the first to share your thoughts.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                                <div className="space-y-8">
                                    {visibleGeneralTributes.map((tribute, index) => (
                                        <TributeCard
                                            key={tribute.id}
                                            tribute={tribute}
                                            isLast={index === visibleGeneralTributes.length - 1}
                                        />
                                    ))}
                                </div>
                            </div>
                            {hasMoreTributes && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={loadMoreTributes}
                                        className="px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
                                    >
                                        Load More Tributes ({allGeneralTributes.length - visibleTributesCount} remaining)
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>

                {/* Submit Tribute Form */}
                <section className="mb-12 bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-6 text-center">
                        Share Your Tribute
                    </h2>

                    {submitSuccess && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                            <p className="font-medium">Thank you! Your tribute has been submitted successfully.</p>
                        </div>
                    )}

                    {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                            <p className="font-medium">{submitError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Relationship <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="relationship"
                                required
                                value={formData.relationship}
                                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                                placeholder="e.g., Friend, Colleague, Church Member"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Tribute Message <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none"
                                placeholder="Share your memories, thoughts, or words of comfort..."
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Tribute'}
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 text-center">
                            Your tribute will be reviewed before being published on this page.
                        </p>
                    </form>
                </section>

                {/* Contact Information */}
                <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <p className="text-gray-700 mb-2">
                        <strong>Questions or need assistance?</strong>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        Contact us at:{' '}
                        <a
                            href="mailto:oluwasemowolegacy@gmail.com"
                            className="text-red-700 hover:text-red-900 font-medium"
                        >
                            oluwasemowolegacy@gmail.com
                        </a>
                    </p>
                </section>
            </main>
        </div>
    );
}
