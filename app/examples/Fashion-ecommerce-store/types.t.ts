interface ClotheListProps {
    item: {
        gender: string;
        name: string;
        price: number;
        colors: {
            [key: string]: string[];
        };
        long?: {
            [key: string]: string[];
        };
    };
}