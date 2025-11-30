'use client';

import { getImageUrl } from '@/lib/supabase-storage';
import { HeroCarousel } from '../components/HeroCarousel';

export default function FuneralDetails() {
    const carouselImages = [
        {
            src: getImageUrl('/general/jmj.png'),
            alt: 'Transition to Glory',
            title: 'Transition to Glory',
            description: 'Late Evang. Johnson Omotayo Oluwasemowo',
        },
    ];


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

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    <small>Survived by wife, children, grandchildren, siblings, friends and his church family.</small>
                </p>

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
