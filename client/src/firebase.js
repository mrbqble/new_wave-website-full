import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA_eyATtXC8FOXATKDBcevKokZJeLlLWoc",
    authDomain: "new-wave-d4fd1.firebaseapp.com",
    projectId: "new-wave-d4fd1",
    storageBucket: "new-wave-d4fd1.appspot.com",
    messagingSenderId: "199978833613",
    appId: "1:199978833613:web:4e424276cbe846a9f3bb84",
    measurementId: "G-YLENDG4E9K"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);