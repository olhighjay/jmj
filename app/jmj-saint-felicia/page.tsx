import { getImageUrl } from "@/lib/supabase-storage";
import Image from "next/image";
import { HeroCarousel } from "../components/HeroCarousel";

export default function JMJSaintFelicia() {
    const carouselImage = [
        {
            src: getImageUrl('/general/Mum and Dad 2.jpg'),
            alt: 'JMJ & Saint Felicia',
            title: 'A Legacy of Love',
            description: 'Honouring the lives, Faith, and Legacy of Evang Omotayo & Evang Onayinka Oluwasemowo',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Image */}
            <HeroCarousel images={carouselImage} autoPlay={false} interval={5000} />

            <main className="container mx-auto px-4 py-16 max-w-6xl">
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-red-800 mb-6">
                        JMJ & Saint Felicia
                    </h1>
                </section>

                {/* Quote Section */}
                <section className="mb-12 text-center">
                    <blockquote className="text-2xl md:text-3xl font-light text-gray-800 italic">
                        &quot;To live in the heart of those we love is not to die&quot;
                    </blockquote>
                </section>

                {/* Red Section - Honour Our Parents */}
                <section className="mb-12 bg-warm-gradient text-white rounded-lg shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                            <Image src={getImageUrl('/general/Mum and Dad.jpg')} alt="JMJ & Saint Felicia"
                                width={300} height={300} className="service-img"
                            />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <p className="text-lg md:text-xl leading-relaxed">
                                We honour our parents, who refused to be small. They walked with God, stood for truth, and courageously impacted everyone who drew near!
                            </p>
                            <p className="text-lg md:text-xl leading-relaxed">
                                They built. They served. They prayed. They fought through seasons and left behind a voice that will forever speak.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Second Text Block */}
                <section className="mb-12">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="text-lg md:text-xl mb-6">
                            This is the strength that held our family together - faith that weathered storms and courage that become a testimony.
                            They call us to rise, to live with conviction and to make our days count.
                        </p>
                    </div>
                </section>

                {/* Image Gallery Section */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Image 1 - Man speaking with microphone */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-gray-200 h-64 flex items-center justify-center">
                                <Image src={getImageUrl('/general/Mum and Dad 3.jpg')} alt="JMJ & Saint Felicia"
                                    width={300} height={300} className="service-img"
                                />
                            </div>
                        </div>

                        {/* Image 2 - Elderly man portrait */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-gray-200 h-64 flex items-center justify-center">
                                <Image src={getImageUrl('/general/Daddy _nd_mummy_at_Dadddy70th.jpg')} alt="JMJ & Saint Felicia"
                                    width={300} height={300} className="service-img"
                                />
                            </div>
                        </div>

                        {/* Image 3 - Woman with headwrap */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="bg-gray-200 h-64 flex items-center justify-center">
                                <Image src={getImageUrl('/general/DADA AND MUM 5.jpg')} alt="JMJ & Saint Felicia"
                                    width={300} height={300} className="service-img"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Images Section - Large group photo */}
                <section className="mb-12">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-200 h-96 flex items-center justify-center">
                            <Image src={getImageUrl('/general/MOM AND DAD 4.jpg')} alt="JMJ & Saint Felicia"
                                width={300} height={300} className="service-img"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
