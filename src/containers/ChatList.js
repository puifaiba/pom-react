import React, {Component} from "react"
import axios from "axios"
import {ActionCableConsumer} from "react-actioncable-provider"
import styled from "styled-components"

import {API_ROOT} from "../constants/index"
import NewChatForm from "../components/NewChatForm"
import MessagesContainer from "../components/MessagesContainer"
import Cable from "../components/Cable"

const Container = styled.div`
  margin: 5px auto 5px;
  padding: 10px 5px;
  border: 1px solid #fffacd;
  border-radius: 5px;
  box-shadow: 3px 3px 5px black;
  width: 80rem;
  height: 50rem;
  display: inline-block;
  background-color: midnightblue;
  text-align: left;
`
const Chatlist = styled.div`
  padding: 10px 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #fffacd;
  border-radius: 3px;
  box-shadow: 3px 3px 5px black;
  width: calc(95% - 1px);
  height: 92%;
  text-align: left;
  margin: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  float: left;
  position: relative;
  color: darkslategray;
  background-color: #e2e0e5;
`
const Title = styled.h3`
  padding: 10px;
  text-align: left;
  margin: 10px;
  color: darkslategray;
`

const Chats = styled.div`
  padding: 1px 1px;
  text-align: left;
  margin: 1px;
  font-weight: bold;
  display: flex;
`

class ChatList extends Component {
  state = {
    chats: [],
    activeChat: null,
  }

  componentDidMount = () => {
    axios.get(`${API_ROOT}/chats`).then((res) => {
      const chats = res.data
      this.setState({chats})
    })
  }

  handleClick = (id) => {
    this.setState({activeChat: id})
  }

  handleReceivedChat = (response) => {
    const {chat} = response
    this.setState({
      chats: [...this.state.chats, chat],
    })
  }

  handleReceivedMessage = (response) => {
    const {message} = response
    const chats = [...this.state.chats]
    const chat = chats.find((chat) => chat.id === message.chat_id)
    chat.messages = [...chat.messages, message]
    this.setState({chats})
  }

  render() {
    const {chats, activeChat} = this.state
    return (
      <Container className="chatlist-container">
        <ActionCableConsumer
          channel={{channel: "ChatsChannel"}}
          onReceived={this.handleReceivedChat}
        />
        {this.state.chats.length ? (
          <Cable
            chats={chats}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <Chatlist className="chatlist">
          <Title>MESSAGE BOARD</Title>
          <div className="chats">{mapChats(chats, this.handleClick)}</div>
          <NewChatForm />
          {activeChat ? (
            <MessagesContainer
              chat={findActiveChat(chats, activeChat)}
              user={this.props.user}
            />
          ) : null}
        </Chatlist>
        {/* {activeChat ? (
          <MessagesContainer
            chat={findActiveChat(chats, activeChat)}
            user={this.props.user}
          />
        ) : null} */}
      </Container>
    )
  }
}

export default ChatList

const findActiveChat = (chats, activeChat) => {
  return chats.find((chat) => chat.id === activeChat)
}

const mapChats = (chats, handleClick) => {
  return chats.map((chat) => {
    return (
      <Chats key={chat.id} onClick={() => handleClick(chat.id)}>
        <div>{chat.name}</div>
      </Chats>
    )
  })
}
