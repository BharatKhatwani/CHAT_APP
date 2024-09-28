import React from 'react'
import '../Chat/Chat.css'
import Chatbox from '../../Components/Chatbox/Chatbox'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar'
const Chat = () => {
  return (
    <div className='chat'>
    <div className="chat-container">
      <LeftSidebar/>
      <RightSidebar/>
      <Chatbox/>
    </div>
    </div>
  )
}

export default Chat
