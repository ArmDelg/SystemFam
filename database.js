import { getDatabase } from "firebase/database";
import { firebaseApp } from "./firebase";

const db = getDatabase(firebaseApp);

export { db };