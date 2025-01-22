import { useState, useEffect } from "react";
import Image from "next/image";

interface HoverImageProps {
    images?: string[];
}

const HoverImage: React.FC<HoverImageProps> = ({ images }) => {
    const defaultImages: string[] = [
        "/batman/batman-front.webp",
        "/batman/batman-side.webp",
        "/batman/batman-back.webp",
    ];

    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const imageList = images && images.length > 0 ? images : defaultImages;

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % imageList.length);
            }, 1000); // Cambia la imagen cada 1 segundo
        } else {
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isHovered, imageList.length]);

    return (
        <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImage(0);
            }}
        >
            <div className="w-full h-full">
                <Image
                    src={imageList[currentImage]}
                    alt="Batman"
                    width={256}
                    height={256}
                    className="object-cover w-full"
                />
            </div>
        </div>
    );
};

export default HoverImage;
