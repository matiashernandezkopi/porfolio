import { DocumentReference } from "firebase/firestore";

export interface ClotheListProps {
  item: {
      gender: string;
      name: string;
      price: number;
      id: string;
      colorsRef: string;
      color:string
      long: boolean;
      sizes:Array<string>;
      colors: string[];
      collection: string;
  };
}