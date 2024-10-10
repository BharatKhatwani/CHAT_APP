// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut // Import signOut for the logout function
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Ensure 'doc' is imported
import { toast } from "react-toastify";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAKLqe_up9Phxmld2fyMNKItl9e1Sl8MSQ",
  authDomain: "chating-app-1dae9.firebaseapp.com",
  projectId: "chating-app-1dae9",
  storageBucket: "chating-app-1dae9.appspot.com",
  messagingSenderId: "983293861990",
  appId: "1:983293861990:web:38d14629f2fb8bab39cda7"
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
      chatsData: []
    });

    console.log("User signed up and data stored successfully");
    toast.success("Account created successfully!");

  } catch (error) {
    console.log("Error during sign up:", error);
    // Show a user-friendly error message using toast
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
    // Show a user-friendly error message using toast
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth); // Sign out the user
    toast.success("Logged out successfully!"); // Display success message
  } catch (error) {
    console.log("Error during logout:", error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

export { signup, login, logout, auth, db };
