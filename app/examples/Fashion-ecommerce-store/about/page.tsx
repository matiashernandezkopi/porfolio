'use client'

import Footer from "../components/footer";
import { useLanguage } from "@/app/context/LanguageContext";
import Header from "../components/header";

const Page = () => {
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Barra superior */}

            {/* Header */}
            <Header />

            {/* Main */}
            <main className="flex-1 py-10 px-6 max-w-7xl mx-auto">
                {/* About Section */}
                <section id="about" className="text-center py-20">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white leading-tight">
                        About Us
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
                        Learn more about our journey, our team, and our commitment to quality.
                    </p>
                </section>

                {/* Panels */}
                <section className="py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Panel 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                Our Story
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Chimbi Fashion started as a small boutique in 2010. Our founder, Jane Doe, had a vision to create a brand that combined style, comfort, and sustainability. Over the years, we have grown into a well-known fashion brand, loved by customers worldwide.
                            </p>
                        </div>

                        {/* Panel 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                Our Team
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Our team is made up of passionate individuals who are dedicated to bringing you the best in fashion. From our designers to our customer service representatives, everyone at Chimbi Fashion is committed to providing you with an exceptional shopping experience.
                            </p>
                        </div>

                        {/* Panel 3 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                Our Materials
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                We believe in using only the highest quality materials for our clothing. Our fabrics are sourced from sustainable suppliers, ensuring that our products are not only stylish but also environmentally friendly. We are committed to reducing our carbon footprint and promoting sustainable fashion.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Page;