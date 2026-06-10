import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "casino-68200",
  storageBucket: "casino-68200.firebasestorage.app",
  apiKey: "AIzaSyATk7y9sD2G7mIfz9v3nU5lkPJzJ0mQiyA",
  appId: "1:351186851329:web:e1bce2ad5d6748d5465200" // Generic web fallback if needed, but storage only needs bucket and API key usually
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
