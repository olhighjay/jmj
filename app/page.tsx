import { HeroCarousel } from "./components/HeroCarousel";


export default function Home() {
  // Carousel images - update with actual image paths
  const carouselImages = [
    {
        src: '/images/header/Daddy-hero-3.jpg', // Add image path here
        alt: 'Pa Evangelist Omotayo Johnson Oluwasemowo',
        title: 'The Life & Time of',
        description: 'Pa Evangelist Omotayo Johnson Oluwasemowo',
    },
    {
        src: '/images/header/Daddy-hero-1.jpg', // Add image path here
        alt: 'Ministry Life',
        title: 'A Life of Ministry',
        description: 'Faith was his heritage',
    },
    {
        src: '/images/header/Daddy-hero-2.jpg', // Add image path here
        alt: 'Professional Life',
        title: 'Professional Resilience',
        description: 'A dedicated professional in civil engineering',
    },
];

return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Carousel */}
        <section className="mb-8">
            <HeroCarousel images={carouselImages} autoPlay={true} interval={5000} />
        </section>

        <main className="container mx-auto px-4 py-16 max-w-6xl">
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">
                    The JMJ
                </h1>
            </section>

            {/* Autobiography Section */}
            <section className="mb-12">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-lg md:text-xl mb-6">
                        Born on <strong>September 8th, 1944</strong>, to <strong>Pa Amos Ogunsemowo Pitan</strong> and{' '}
                        <strong>Chief (Mrs) Reginah O. Ogunsemowo</strong>, &apos;Tayo began his education at{' '}
                        <strong>St John&apos;s African Church Primary School</strong>. His thirst for learning took him from{' '}
                        <strong>Oke-Agbo</strong> to <strong>Ibadan</strong> and <strong>Kaduna</strong>, laying the groundwork for a life of industry.
                    </p>
                </div>
            </section>

            {/* Professional Resilience Section */}
            <section className="mb-12 bg-warm-gradient text-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Professional Resilience
                        </h2>
                        <p className="text-lg leading-relaxed">
                            A dedicated professional, he carved a niche in civil engineering. From his early days at{' '}
                            <strong>CFAO</strong> and <strong>NIGERLEC</strong> to his rise as a Site Agent with{' '}
                            <strong>Lee Fakino</strong> and <strong>O.V. General Company</strong>, he was known for his diligence.
                            He served as a Supervisor at <strong>Drake and Gorham, Zaria</strong>, and later retired from the{' '}
                            <strong>Inu-Mimo Group</strong> to run a successful private practice.
                        </p>
                    </div>
                    {/* <div className="bg-professional-life bg-gray-200 h-64 md:h-auto flex items-center justify-center"> */}
                    <div className="bg-professional-life h-64 md:h-96 min-h-[256px]">
                        {/* <p className="text-gray-500">Photo Placeholder</p> */}
                    </div>
                </div>
            </section>

            {/* A Life of Ministry Section */}
            <section className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="bg-ministry-life h-64 md:h-96 min-h-[256px]">
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            A Life of Ministry
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Faith was his heritage. Son of the late Iyalode of St John&apos;s African Church, he was consecrated as a{' '}
                            <strong>Lay Reader in 1974</strong>. For decades, he served God faithfully, culminating in his ordination as an{' '}
                            <strong>Evangelist of the African Church in 2003</strong> by <strong>Bishop Famoofo</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Service to Community Section */}
            <section className="mb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Service to Community
                    </h2>
                    <p className="text-xl text-gray-700">
                        He was a leader who served to the very end.
                    </p>
                    <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Area Commander */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-200 h-48 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Photo Placeholder</p>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Area Commander:</strong> African Lads and Lasses Brigade (Ijebu Division).
                            </p>
                        </div>
                    </div>

                    {/* Secretary */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-200 h-48 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Photo Placeholder</p>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Secretary (10+ Years):</strong> Christian Council of Nigeria (CCN), Ijebu–North.
                            </p>
                        </div>
                    </div>

                    {/* Active Member */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-200 h-48 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Photo Placeholder</p>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Active Member:</strong> CAN and Bible Society of Nigeria (BSN), Ijebu–North Chapters.
                            </p>
                        </div>
                    </div>

                    {/* Foundation Member */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-gray-200 h-48 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Photo Placeholder</p>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Foundation Member:</strong> Hope Rising Movement & Sunshine Social Club.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                <strong>Chartered Member:</strong> The Lion&apos;s Club, Ijebu-Igbo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Concluding Message */}
            <section className="bg-gray-50 rounded-lg shadow-lg p-8 md:p-12 text-center">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                    Above all, he was a family man. He fought the good fight, he finished the race, and he kept the faith.
                    Though he is gone from our sight, his legacy remains etched in our hearts forever.
                </p>
            </section>
        </main>
    </div>
);
}
