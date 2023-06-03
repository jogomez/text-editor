import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {  

  console.log('Sending PUT command to the database');  
  const jateDb = await openDB('jate', 1); // connects to DB
  const tx = jateDb.transaction('jate', 'readwrite'); // starts a new transaction
  const objStore = tx.objectStore('jate'); // opens object store
  const req = objStore.add({ value: value }) // adds the content into DB
  
  // Confirming request succesful
  const result = await request; 
  console.log('Data saved to the database', result);
}

// Method to get all the content from the database
export const getDb = async () => {

  console.log('Sending GET command to the database');
  const jateDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  
  // Confirming request succesful
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();
