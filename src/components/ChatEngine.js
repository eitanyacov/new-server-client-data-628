import React, { useState, useEffect } from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'

const ChatEngine = ({ chatId, email }) => {
  const [show, setShow] = useState(false)

  useEffect(()=> {
    setTimeout(()=> {
      setShow(true)
    }, 500)
  })
  return (
    <div className="h-full z-50 w-full bg-white">
         {show && (
          <ChatEngineWrapper>
          <Socket 
              projectID={process.env.REACT_APP_CE_PROJECT_ID}
              userName={email}
              userSecret={email}
          />
          <ChatFeed activeChat={chatId} />
      </ChatEngineWrapper>
         )}
    </div>
  )
}

export default ChatEngine