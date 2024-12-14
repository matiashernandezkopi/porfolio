import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


export const codeExamples = [
    {
      name: "addDocumentWithUserID",
      description: "Función para agregar un nuevo documento a Firestore con un ID de usuario.",
      code: `export async function addDocument(userId: string, Document: yourType) {
            try {
            const docRef = await addDoc(collection(db, 'collectionName'), {
                ...data,
                id: uuidv4(),
                userID: userId,
            });
            return docRef.id;
            } catch (e) {
            console.error('Error adding document: ', e);
            throw new Error('Error adding this Document');
            }
        }`
    },
    {
      name: "getDocumentByUserID",
      description:  "Función para obtener documentos de una colección filtrados por el ID de usuario.",
      code: `export async function getDocumentsByUserID(userId: string): Promise<Ventas[]>  {
            try {
            const collectionRef = collection(db, 'collectionName');
            const q = query(collectionRef, where('userID', '==', userId));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<yourType, 'id'>)
            }));
            } catch (error) {
            console.error('Error fetching Documents:', error);
            throw error;
            }
        }`
    },
    {
      name: "deleteVentaById",
      description: "Función para eliminar un documento de una colección por su ID.",
      code: `export async function deleteDocumentById(id: string): Promise<void> {
            try {
                // Referencia directa al documento usando su ID
                const CollectionRef = collection(db, 'collectionName');
                
                const q = query(CollectionRef, where('id', '==', id));
                // Verifica si la referencia es válida antes de intentar eliminar
                const querySnapshot = await getDocs(q);
                

                // Verifica si se encontró al menos un documento
                if (querySnapshot.empty) {
                console.error('No Document found with name {id}');
                return;
                }

                // Elimina todos los documentos encontrados con el nombre proporcionado
                for (const docSnapshot of querySnapshot.docs) {
                const DocumentRef = doc(db, 'dbName', docSnapshot.id);
                await deleteDoc(DocumentRef);
                console.log('Document with ID {docSnapshot.id} deleted successfully.');
                }
            } catch (error) {
                console.error('Error deleting Document from Firestore:', error);
                throw new Error('Error trying to delete the Document with ID: {id}');
            }
        }`
    },
  ];
  


function page() {
    return (
        <div>
        <h1>Ejemplos de código</h1>
        <ul>
            {codeExamples.map((example) => (
            <li key={example.name}>
                <h2>{example.name}</h2>
                <p>{example.description}</p>
                <SyntaxHighlighter language="jsx" style={oneDark}
                PreTag="div"
                className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
                showLineNumbers={true}
                useInlineStyles={true}>
                    {example.code}
                </SyntaxHighlighter>
            </li>
            ))}
        </ul>
        </div>
    );
    }

export default page
