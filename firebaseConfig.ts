import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyAvLNXnp3OhhI5wiNIjp0iqgNVD-F_i8ho",
	authDomain: "tsks-f6dc5.firebaseapp.com",
	projectId: "tsks-f6dc5",
	storageBucket: "tsks-f6dc5.appspot.com",
	messagingSenderId: "895576978845",
	appId: "1:895576978845:web:c98e2f1763664b7c526b74",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
