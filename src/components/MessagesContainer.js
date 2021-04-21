import React from "react"
import NewMessageForm from "./NewMessageForm"

const MessagesContainer = ({chat: {id, name, messages}, user}) => {
  return (
    <div className="messages-container">
      <h2>{name}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm chat_id={id} user_id={user.id} />
    </div>
  )
}

export default MessagesContainer

const orderedMessages = (messages) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedMessages.map((message) => {
    return <li key={message.id}>{message.content}</li>
  })
}
