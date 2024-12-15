import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  title: string;
  description: string;
  link: string;
}

interface SectionProps {
  title: string;
  proyects: Project[];
  subtitle?: string;
}

const Section: React.FC<SectionProps> = ({ title,proyects, subtitle }) => {
    const { theme } = useTheme();
    const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-200 mb-8 text-left bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 w-fit rounded-md p-2">
       {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {proyects.map((project, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <div className="bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 h-48 flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-white group-hover:scale-105 transition">
                {project.title}
              </h3>
              {subtitle&&(<p>{subtitle}</p>)}
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <Link href={project.link}>
                <div
                    className={`block w-full text-center py-2 text-white rounded-lg transition ${
                        theme === "dark"
                        ? "bg-gradient-to-b from-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-600"
                        : "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800"
                    }`}
                >
                  {t("goNow")}
                </div>
              </Link>
            </div>
          </div>
        ))}

        {/* Próximamente */}
        <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden">
          <div className="bg-gradient-to-b from-gray-500 to-gray-600 dark:from-gray-700 dark:to-gray-800 h-48 flex items-center justify-center">
            <h3 className="text-xl font-bold text-white group-hover:scale-105 transition">
              {t("comingSoon")}
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t("workingOnMore")}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-0.5 dark:bg-gray-300 bg-gray-800 opacity-10 rounded-xl my-4" />
    </section>
  );
};

export default Section;
