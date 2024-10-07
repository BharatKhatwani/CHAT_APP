import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../Config/firebase";

export const AppContext = createContext(); // Correct export of AppContext

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    if (!uid) return; // Ensure uid is valid
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.error("User does not exist");
            return; // Handle this case appropriately
        }

        const userData = userSnap.data();
        setUserData(userData);

        // Prevent multiple navigations
        if (userData.avatar && userData.name && !navigated) {
           
            navigate('/chat');
        } else if (!navigated) {
            
            navigate('/profile');
        }

        // await updateDoc(userRef, {
        //     lastSeen: Date.now(),
        // });

        setInterval(async () => {
            if (auth.chatUser) {
                await updateDoc(userRef, {
                    lastSeen: Date.now(),
                });
            }
        }, 60000);
    } catch (error) {
        console.error("Error loading user data:", error);
    }
};

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
