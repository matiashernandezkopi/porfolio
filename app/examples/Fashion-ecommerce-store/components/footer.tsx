import React from 'react';
import { useLanguage } from "@/app/context/LanguageContext";

const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-semibold mb-4">Chimbi Fashion</h4>
                    <p className="text-sm text-gray-400">
                        {t("footerAbout")}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">{t("customerService")}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">{t("faq")}</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">{t("returns")}</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">{t("shippingInfo")}</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">{t("aboutUs")}</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">{t("ourStory")}</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">{t("sustainability")}</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">{t("followUs")}</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;