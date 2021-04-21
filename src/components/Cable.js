import React, {Fragment} from "react"
import {ActionCableConsumer} from "react-actioncable-provider"

const Cable = ({chats, handleReceivedMessage}) => {
  return (
    <>
      {chats.map((chat) => {
        return (
          <ActionCableConsumer
            key={chat.id}
            channel={{channel: "MessagesChannel", chat_id: chat.id}}
            onReceived={handleReceivedMessage}
          />
        )
      })}
    </>
  )
}

export default Cable
