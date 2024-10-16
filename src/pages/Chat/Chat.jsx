import React, { useContext, useEffect, useState } from 'react';
import '../Chat/Chat.css';
import Chatbox from '../../Components/Chatbox/ChatBox';
import RightSidebar from '../../Components/RightSidebar/RightSidebar';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import { AppContext } from '../../context/AppContext';

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("Chat Data:", chatData);
    // console.log("User Data:", userData);
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className='chat'>
      { 
      loading 
        ? <p className='loading'>Loading...</p>
        : <div className="chat-container">
            <LeftSidebar />
            <Chatbox />
            <RightSidebar />
          </div>
      }
    </div>
  );
};

export default Chat;
