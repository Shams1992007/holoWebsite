// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZucrdkQMyKBTvDP4jVGTgHFvmSRb3Zkg",
  authDomain: "holo-chalok-28353.firebaseapp.com",
  projectId: "holo-chalok-28353",
  storageBucket: "holo-chalok-28353.firebasestorage.app",
  messagingSenderId: "822622481795",
  appId: "1:822622481795:web:d098978d9c5cfb99eadab6",
  measurementId: "G-VS8CQJ3MJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
