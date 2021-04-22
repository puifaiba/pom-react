import React from "react"
import NewMessageForm from "./NewMessageForm"
import styled from "styled-components"

const Title = styled.h3`
  padding: 10px;
  text-align: left;
  margin: 10px;
`

const MessagesContainer = ({chat: {id, name, messages}, user}) => {
  return (
    <div className="messages-container">
      <Title>{name}</Title>
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
    return <div key={message.id}>{message.content}</div>
  })
}
