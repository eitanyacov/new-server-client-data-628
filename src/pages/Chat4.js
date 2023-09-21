import React from 'react'
import { ChatEngine } from 'react-chat-engine'

const Chat4 = () => {
  return (
    <>
    <div className='airx:mr-[245px] fixed w-full airx:w-[82%] bottom-1'>
    <ChatEngine 
      projectID={process.env.REACT_APP_CE_PROJECT_ID}
      userName='nartina'
      userSecret='12345'
      height='calc(100vh - 62px)'
    />
    </div>
    </>
  )
}

export default Chat4