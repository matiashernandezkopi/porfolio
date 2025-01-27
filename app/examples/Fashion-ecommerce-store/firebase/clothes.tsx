'use server'
// lib/Productos.ts
import { db } from './config';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc, DocumentReference, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar un ID único




export async function addDocument( Document: ClotheListProps["item"]) {
    try {
    const docRef = await addDoc(collection(db, 'clothes'), {
        ...Document,
        id: uuidv4(),
    });
    return docRef.id;
    } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding this Document');
    }
}

export async function getDocumentbyid( id: string) {
    const q = query(collection(db, 'clothes'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
    throw new Error('No matching documents.');
    }
    return querySnapshot.docs[0].data() as ClotheListProps["item"];
}

export async function deleteDocumentbyid( id: string) {
    await deleteDoc(doc(db, 'clothes', id));
}

export async function updateDocumentbyid( id: string, Document: ClotheListProps["item"]) {
    await updateDoc(doc(db, 'clothes', id), Document);
}








interface ClotheListProps {
    item: {
        gender: string;
        name: string;
        price: number;
        id: string;
        ref?: string; // Cambiado a cadena porque no es un DocumentReference real
        colors?: {
            [key: string]: string[]; // Llave dinámica con valores tipo array
        };
        long?: {
            [key: string]: string[];
        };
    };
}

export async function getAllDocuments(): Promise<ClotheListProps["item"][]> {
    try {
        const clothesRef = collection(db, "clothes"); // Colección de "clothes"
        const q = query(clothesRef);
        const snapshot = await getDocs(q);

        const documents = await Promise.all(
            snapshot.docs.map(async (docSnapshot) => {
                // Obtener los datos principales del documento
                const data = {
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                } as ClotheListProps["item"];

                // Si existe una referencia "ref" como cadena, buscamos sus datos
                let colors: ClotheListProps["item"]["colors"] = undefined;
                if (data.ref) {
                    try {
                        // Convertimos la cadena `ref` en una referencia a un documento
                        const refDoc = doc(db, data.ref);
                        const refSnapshot = await getDoc(refDoc);
                        if (refSnapshot.exists()) {
                            colors = refSnapshot.data() as ClotheListProps["item"]["colors"];
                        }
                    } catch (error) {
                        console.error(`Error fetching data from ref in document ${docSnapshot.id}:`, error);
                    }
                }

                return {
                    ...data,
                    colors, // Agregamos los datos de la referencia al campo "colors"
                };
            })
        );

        return documents;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}