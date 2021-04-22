import React from "react"
import NewMessageForm from "./NewMessageForm"
import styled from "styled-components"

const Container = styled.div`
  padding: 10px 10px;
  border: 1px solid #fffacd;
  border-radius: 3px;
  box-shadow: 3px 3px 5px black;
  width: calc(95% - 1px);
  min-height: 50%;
  text-align: left;
  margin: 25px;
  font-size: 1.2rem;
  font-weight: normal;
  float: left;
  position: relative;
  color: gray;
  background-color: lavender;
`

const Title = styled.h3`
  padding: 5px;
  text-align: left;
  margin: 5px;
  color: midnightblue;
`

const MessagesContainer = ({chat: {id, name, messages}, user}) => {
  const orderedMessages = (messages) => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    )
    return sortedMessages.map((message) => {
      return (
        <div key={message.id}>
          <div>{message.content}</div>
          <br />
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
