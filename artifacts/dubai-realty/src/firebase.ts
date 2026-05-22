import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAgvKBwLfwhKwQDLMH158mmzFT7cxlvL4",
  authDomain: "youthful-current-f8gvj.firebaseapp.com",
  projectId: "youthful-current-f8gvj",
  storageBucket: "youthful-current-f8gvj.firebasestorage.app",
  messagingSenderId: "690559924735",
  appId: "1:690559924735:web:c3bfa839d5159cb13ecfca"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
