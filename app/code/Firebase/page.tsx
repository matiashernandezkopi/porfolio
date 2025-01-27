'use client'
import { CodeShower } from "./codeShower";
import { useLanguage } from "@/app/context/LanguageContext";

export const codeExamples = [
    {
      name: "addDocumentWithUserID",
      description: "Función para agregar un nuevo documento a Firestore con un ID de usuario.",
      code: `export async function addDocument(userId: string, Document: yourType) {
    try {
    const docRef = await addDoc(collection(db, 'collectionName'), {
        ...Document,
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
      code: `export async function getDocumentsByUserID(userId: string): Promise<Documents[]>  {
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
      name: "deleteDocumentById",
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
    },{
        name: "updateDocumentByID",
        description: "Función para actualizar un documento de la colección 'collectionName' por su ID.",
        code: `export async function updateDocumentByID(id: string, data: Partial<Documents>): Promise<void> {
    try {
        const CollectionRef = collection(db, 'collectionName');
        
        // Crea la consulta para encontrar el documento que coincida con el 'id' proporcionado
        const q = query(CollectionRef, where('id', '==', id));
        
        // Obtiene los documentos que coinciden con la consulta
        const querySnapshot = await getDocs(q);
        
        // Verifica si se encontró al menos un documento
        if (querySnapshot.empty) {
        console.error('No se encontró ningún documento con el id:', id);
        return; // Salir si no se encontró el documento
        }
        
        // Si se encontró un documento, actualiza el primero
        const DocumentDoc = querySnapshot.docs[0]; // Obtiene el primer documento que coincide
        await updateDoc(doc(db, 'Documents', DocumentDoc.id), data);
        
        console.log(\`Document \${id} actualizado correctamente con los datos:\`, data);
    } catch (error) {
        console.error('Error al actualizar el Document:', error);
    }
}`
      }
      
];
  


function Page() {
    const { t } = useLanguage();
    
    

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
          <header className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white py-6 px-10 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <h1 className="text-4xl font-extrabold tracking-wide">Chimbi Proyects</h1>
              
            </div>
          </header>
      
          {/* Main */}
          <main className="flex-1 py-10 px-6">
            {/* Ejemplos de código */}
            <div className="mt-12 max-w-7xl mx-auto px-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t("codeExamplesTitle")}</h1>
              <ul className="space-y-6">
                {codeExamples.map((example) => (
                  <li key={example.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
                    <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{example.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{example.description}</p>
                    <CodeShower code={example} />
                  </li>
                ))}
              </ul>
            </div>
          </main>
      
          {/* Footer */}
          <footer className="bg-blue-600 dark:bg-blue-800 text-white py-6">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-sm">
                &copy; {t("footerText")}
              </p>
            </div>
          </footer>
        </div>
      );
      
    }

export default Page


