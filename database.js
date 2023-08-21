// database.js

import { getDatabase } from "firebase/database";

const db = getDatabase(firebaseApp);

export { db };