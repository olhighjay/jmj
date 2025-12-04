'use client';

import { getImageUrl } from '@/lib/supabase-storage';
import { HeroCarousel } from '../components/HeroCarousel';
import { useQuery } from '@tanstack/react-query';

interface PdfFile {
    name: string;
    url: string;
    size: number;
    updatedAt: string;
}

async function fetchPrograms(): Promise<PdfFile[]> {
    const response = await fetch('/api/programs');
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || 'Failed to fetch program PDFs';
        console.error('API Error:', errorMessage, errorData);
        throw new Error(errorMessage);
    }
    return response.json();
}

export default function FuneralDetails() {
    const { data: pdfFiles, isLoading: isLoadingPdfs, error: pdfError } = useQuery<PdfFile[]>({
        queryKey: ['programs'],
        queryFn: fetchPrograms,
        retry: 1,
    });

    const carouselImages = [
        {
            src: getImageUrl('/general/jmj.png'),
            alt: 'Transition to Glory',
            title: 'Transition to Glory',
            description: 'Late Evang. Johnson Omotayo Oluwasemowo',
        },
    ];

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch {
            return dateString;
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <section className="mb-8">
                <HeroCarousel images={carouselImages} autoPlay={true} interval={5000} />
            </section>

            <main className="container mx-auto px-4 py-16 max-w-6xl">
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-4">
                        Transition to Glory
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                        The entire family of <strong>Late Evang. Johnson Omotayo Oluwasemowo</strong> cordially invites you to the burial service of their Father, Husband, Brother, Uncle & Grandfather.
                    </p>
                </section>

                <section className="mb-12 bg-warm-gradient text-white rounded-lg shadow-xl overflow-hidden p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-full border-4 border-white border-dashed flex flex-col items-center justify-center">
                                <div className="text-sm font-semibold mb-1">AGED</div>
                                <div className="text-5xl font-bold">81</div>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                <span className="text-white">LATE EVANG.</span>
                                <br />
                                <span className="text-orange-200">JOHNSON OMOTAYO</span>
                                <br />
                                <span className="text-white">OLUWASEMOWO</span>
                            </h2>
                            <p className="text-lg md:text-xl text-orange-100 mt-2">
                                (SEPTEMBER 8, 1944 - NOVEMBER 20, 2025)
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12 bg-red-900 text-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-red-800 p-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center">
                            BURIAL ARRANGEMENT
                        </h2>
                    </div>

                    <div className="p-8 md:p-12 space-y-8">
                        {/* Wake-Keep */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-200">
                                THURSDAY, 4TH DECEMBER 2025
                            </h3>
                            <p className="text-lg leading-relaxed">
                                <strong>2:00 PM:</strong> Service of Songs <small><i>(powered by the CCN, Ijebu-North)</i></small>
                                <br />
                                <span className="ml-6 flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Family Residence at 36, Iga Street, Behind Iga Mosque, Oke Agbo, Ijebu Igbo</span>
                                </span>
                            </p>
                            <p className="text-lg leading-relaxed">
                                <strong>5:00 PM:</strong> Wake-Keep
                                <br />
                                <span className="ml-6 flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Family Residence at 36, Iga Street, Behind Iga Mosque, Oke Agbo, Ijebu Igbo</span>
                                </span>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-red-700"></div>

                        {/* Burial Service */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-200">
                                FRIDAY, 5TH DECEMBER 2025
                            </h3>
                            <p className="text-lg leading-relaxed">
                                <strong>10:00 AM:</strong> Burial Service
                                <br />
                                <span className="ml-6 flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>St John&apos;s African Church Cathedral, Oke Agbo, Ijebu Igbo</span>
                                </span>
                                <br />
                                <span className="ml-6 text-orange-100 italic">(Interment follows immediately after the service)</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
                    <small>Survived by wife, children, grandchildren, siblings, friends and his church family.</small>
                </p> */}

                {/* Order of Program PDF Section */}
                <section className="mb-12 bg-white rounded-lg shadow-xl overflow-hidden p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
                            Order of Program
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Download the program PDFs for the burial service
                        </p>
                    </div>

                    {pdfError && (
                        <div className="text-center py-8 text-red-600">
                            <p className="text-lg mb-2">Error: {pdfError.message}</p>
                            <p className="text-sm text-gray-600">
                                Something went wrong while fetching the program PDFs.
                            </p>
                        </div>
                    )}

                    {isLoadingPdfs ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-700"></div>
                            <p className="mt-4 text-gray-600">Loading program PDFs...</p>
                        </div>
                    ) : pdfFiles && pdfFiles.length > 0 ? (
                        <div className="space-y-4">
                            {pdfFiles.map((pdf) => (
                                <div
                                    key={pdf.name}
                                    className="bg-gray-50 rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow border border-gray-200"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <svg
                                                    className="w-8 h-8 text-red-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                                                    {pdf.name.replace('.pdf', '').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 ml-11">
                                                {pdf.size > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                                        </svg>
                                                        {formatFileSize(pdf.size)}
                                                    </span>
                                                )}
                                                {pdf.updatedAt && (
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatDate(pdf.updatedAt)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <a
                                            href={pdf.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                />
                                            </svg>
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg shadow-md p-8 md:p-12 text-center border border-gray-200">
                            <svg
                                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="text-lg text-gray-600 mb-2">No program PDFs available yet</p>
                            <p className="text-sm text-gray-500">
                                PDF files will appear here once uploaded to Supabase Storage
                            </p>
                        </div>
                    )}

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <p className="text-sm text-gray-700">
                            <strong>Note:</strong> If you scanned a QR code to reach this page, you can download the program PDFs above.
                        </p>
                    </div>
                </section>

                <section className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <p className="text-gray-700 mb-2">
                        For more information, please contact:
                    </p>
                    <p>
                        <a
                            href="mailto:oluwasemowolegacy@gmail.com"
                            className="text-red-700 hover:text-red-900 font-medium text-lg"
                        >
                            oluwasemowolegacy@gmail.com
                        </a>
                    </p>
                </section>
            </main>
        </div>
    );
}
