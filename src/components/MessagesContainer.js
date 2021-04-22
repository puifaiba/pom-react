import React from "react"
import NewMessageForm from "./NewMessageForm"
import styled from "styled-components"

const Container = styled.div`
  padding: 10px 5px;
  border: 2px solid blue;
  width: calc(61% - 1px);
  height: 92%;
  text-align: left;
  margin: 25px;
  font-size: 1.33rem;
  font-weight: bold;
  float: left;
  position: relative;
`

const Title = styled.h3`
  padding: 10px;
  text-align: left;
  margin: 10px;
`

const MessagesContainer = ({chat: {id, name, messages}, user}) => {
  const orderedMessages = (messages) => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    )
    return sortedMessages.map((message) => {
      return (
        <div key={message.id}>
          <div>{user.first_name}</div>
          <div>{message.content}</div>
        </div>
      )
    })
  }

  return (
    <Container className="messages-container">
      <Title>{name}</Title>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm chat_id={id} user_id={user.id} />
    </Container>
  )
}

export default MessagesContainer
