// Import Firebase SDKs via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVb23qy8neT4QLWavXRALcrQUFTwtp7DE",
    authDomain: "rocket-game-core.firebaseapp.com",
    projectId: "rocket-game-core",
    storageBucket: "rocket-game-core.firebasestorage.app",
    messagingSenderId: "972377230296",
    appId: "1:972377230296:web:655e0aeef0f91f7e5f80ad",
    measurementId: "G-65BV8FECSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// রকেট ডাটা ফায়ারবেসে সেভ করার ফাংশন
export async function saveRocketToCloud(rocketData) {
    try {
        const docRef = await addDoc(collection(db, "saved_rockets"), {
            ...rocketData,
            createdAt: new Date().toISOString()
        });
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e.message };
    }
}
