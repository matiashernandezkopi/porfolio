import { useState, useEffect } from "react";
import Image from "next/image";

const HoverImage = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Lista de imágenes
    const images: string[] = [
        "/batman/batman-front.webp",
        "/batman/batman-side.webp",
        "/batman/batman-back.webp",
    ]
    
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }, 1000); // Cambia la imagen cada 1 segundo
        } else {
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className="relative  overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImage(0);
            }}
        >
            <div className="w-full h-full ">
                <Image
                    src={images[currentImage]}
                    alt="Batman"
                    width={256}
                    height={256}
                    className={`object-cover w-full`}
                />
            </div>
        </div>
    );
};

export default HoverImage;
