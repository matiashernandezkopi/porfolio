import { DocumentReference } from "firebase/firestore";

export interface ClotheListProps {
    item: {
      gender: string;
      name: string;
      price: number;
      id: string;
      ref?: string; // Referencia a un documento en Firestore
      colors?: {
        [key: string]: string[]; // Llave dinámica con valores tipo array
      };
      long?: {
        [key: string]: string[];
      };
    };
  }