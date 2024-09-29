// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Ensure 'doc' is imported
import { toast } from "react-toastify";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDn-9YTe2lVZ6oJWY_i7byhmuHNtrucFgY",
  authDomain: "chat-app-6a039.firebaseapp.com",
  projectId: "chat-app-6a039",
  storageBucket: "chat-app-6a039.appspot.com",
  messagingSenderId: "164157600102",
  appId: "1:164157600102:web:9c8a4813eab2dcf20418a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-up function
const signup = async (username, email, password) => {
  try {
    // Create user with email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add user to Firestore database
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid, // Corrected to 'uid'
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, there I am using chat app",
      lastSeen: Date.now()
    });

    // Initialize chat data in Firestore for the user
    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

    console.log("User signed up and data stored successfully");
    toast.success("Account created successfully!");

  } catch (error) {
    console.log("Error during sign up:", error);
    // Fixed the incorrect chaining of toast.error
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error("Error during login:", error);
    // Fixed the incorrect chaining of toast.error
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logout = async() => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
        console.log(error.code.split('/')[1].split('-').join(" "));
    }
}



export { signup, login,logout };
