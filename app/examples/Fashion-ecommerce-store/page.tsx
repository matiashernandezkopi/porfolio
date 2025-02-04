'use client'
import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useState } from "react";
import { getAllDocuments } from "./firebase/clothes";
import ClotheList from "./clothe-lists";
import Footer from "./components/footer";
import Header from "./components/header";

function Page() {
  
  const { t } = useLanguage();
  const [clothes, setClothes] = useState<ClotheListProps["item"][]>([]);
  const [collectionColors, setCollectionColors] = useState<string[]>([]);
  const [collection, setCollection] = useState<string[]>([]);


  useEffect(() => {
    const uniqueCollections = Array.from(new Set(clothes.map((item) => item.collection)));
    setCollection(uniqueCollections);
  }, [clothes]);



  useEffect(() => {
    async function fetchClothes() {
      try {
        const fetchedClothes = await getAllDocuments();
        
        setClothes(fetchedClothes);
        setCollectionColors(fetchedClothes.map((item) => item.color));
        console.log(collectionColors);

      } catch (error) {
        console.error("Error fetching clothes: ", error);
      }
    }

    fetchClothes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Barra superior */}
      <Header />

      {/* Main */}
      <main className="flex-1 py-10 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section id="home" className="text-center py-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white leading-tight">
            {t("welcomeTitle")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            {t("welcomeSubtitle")}
          </p>
          <button className="mt-6 bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 transition">
            {t("discoverCollection")}
          </button>
        </section>

        {collection.map((collection, index) => (
            <section key={index} className="py-16">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {collection}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Productos Destacados */}
            {clothes.map((item) => (
              
              <ClotheList key={item.id} item={item}  collectionColors={collectionColors}/>
            ))}
            </div>
        </section>
        ))}
        
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Page;
