
//import {openDB} from 'idb'
import setGlobalVars from 'indexeddbshim'
import Dexie from 'dexie';

const db = new Dexie('Certifications');
db.version(1).stores({ pdfOS: '++id' });

export default db;
