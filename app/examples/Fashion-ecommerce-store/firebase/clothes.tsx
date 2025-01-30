'use server'
// lib/Productos.ts
import { db } from './config';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc, DocumentReference, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar un ID único
import { ClotheListProps } from '../types.t';




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



/*
example of a document in the collection "clothes":
    color: "images/Batman-man/black"
    gender:"male"
    id:"test"
    long:false
    name:"Batman Classic"
    type:"sport hero t-shirt"
    price:25
    sizes:["M","L","XL"]

images/Batman:
    black: [
        "/batman/batman-black-front.webp",
        "/batman/batman-black-back.webp",
    ],
*/

export async function getAllDocuments(): Promise<ClotheListProps["item"][]> {
    try {
        const clothesRef = collection(db, "clothes"); // Colección de "clothes"
        const q = query(clothesRef);
        const snapshot = await getDocs(q);

        const documents = await Promise.all(
            snapshot.docs.map(async (docSnapshot) => {
                const data = {
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                } as ClotheListProps["item"];
        
                let colors: string[] = [];
                const colorsplited = data.color.split('/'); // "images/Batman-man/black" => ["images", "Batman-man", "black"]
                
                if (colorsplited.length === 3) {
                    const collectionName = colorsplited[0]; // "images"
                    const documentName = colorsplited[1]; // "Batman-man"
        
                    try {
                        // Referencia al documento "images/Batman-man"
                        const refDoc = doc(db, collectionName, documentName); // const refDoc = doc(db, collectionName+"/"+ documentName)
                        const refSnapshot = await getDoc(refDoc);
        
                        /*if (refSnapshot.exists()) {
                            const colorField = colorsplited[2];
        
                            // Extrae la lista de colores de la propiedad correspondiente
                            const colorData = refSnapshot.data() as Record<string, string[]>;
                            colors = colorData[colorField] || []; // Obtiene el array asociado a "black"
                        }*/

                        if (refSnapshot.exists()) {
                            const colorField = colorsplited[2];
                            const fieldValue = refSnapshot.get(colorField);
                            if (Array.isArray(fieldValue)) {
                                colors = fieldValue as string[]; // Guardar el resultado si es una lista de colores
                            } else {
                                console.warn(`El campo "${colorField}" no contiene una lista de colores.`);
                            }
                        }
                    } catch (error) {
                        console.error(`Error fetching data from colors in document ${docSnapshot.id}:`, error);
                    }
                }
                return {
                    ...data,
                    colors,
                };
            })
        );
        
        return documents;

    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
    }
}
