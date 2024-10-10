import React, { useContext, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, serverTimestamp, doc, arrayUnion } from "firebase/firestore";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { db } from '../../Config/firebase';
const LeftSidebar = () => {

  const navigate = useNavigate();
  const{userData} = useContext(AppContext);
  const [user,setUser] = useState(null);
  const[showSearch ,setShowSearch ] = useState(false);
//console.log("hello")
const inputHandler = async (e) => {
  try {
    const input = e.target.value;
    if (input) {
      console.log("hello");
      setShowSearch(true);
      
      const userRef = collection(db, 'users');
      const q = query(userRef, where("username", "==", input.toLowerCase()));
      const querySnap = await getDocs(q);

      if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
        const userData = querySnap.docs[0].data();
        console.log(userData);
        setUser(userData);  // Set the user state
      } else {
        setUser(null);
        console.log("No matching user found or user is the current logged in user.");
      }
    } else {
      setShowSearch(false);
    }
  } catch (error) {
    console.error("Error in inputHandler:", error);
  }
};

  const addChat = async() =>{
    const messageRef = collection(db,"message");
    const chatsRef = collection(db, "chats");
    try {
  const newMesssageRef = docs(messageRef);
  await setDoc(newMesssageRef, {
    createAt:serverTimestamp(),
    message: []
    })
    await updateDoc(doc(chatsRef,user.id), {
      chatsData:arrayUnion({
        messageId : newMesssageRef.id,
        lastMessage : "",
         rId : userData.id,
         updateAt: Date.now(),
         messageSeen : true

      })
    })

    await updateDoc(doc(chatsRef,userData.id), {
      chatsData:arrayUnion({
        messageId : newMesssageRef.id,
        lastMessage : "",
         rId : user.id,
         updateAt: Date.now(),
         messageSeen : true

      })
    })
    }
    catch (error){
   toast.error(error.message);
   console.error(error);

    }
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => {
                navigate('/profile')
              }}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" className="icon" />
          <input onChange = {inputHandler}
          type="text" placeholder="Search here.." />
        </div>
      </div>

      <div className="ls-list">
        {
          showSearch && user 
        ? <div  onClick={addChat} className="friends add-user">
          <img src={user.avatar} alt="" />
          <p>{user.name}</p>
        </div>
        :
        Array(12).fill("").map((item, index) => {
          return (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt="" />
              <div>
                <p>Richard Sanford</p>
                <span>Hello, how are you?</span>
              </div>
            </div>
          );
        })
        }
        
      </div>
    </div>
  );
};

export default LeftSidebar;