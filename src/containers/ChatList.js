import React, {Component} from "react"
import axios from "axios"
import {ActionCableConsumer} from "react-actioncable-provider"

import {API_ROOT, API_WS_ROOT} from "../constants/index"
import NewChatForm from "../components/NewChatForm"
import MessagesContainer from "../components/MessagesContainer"
import Cable from "../components/Cable"
import {ActionCableProvider} from "react-actioncable-provider"

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
      <ActionCableProvider url={API_WS_ROOT}>
        <div className="chatlist-container">
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
          <h2>Chats</h2>
          <ul>{mapChats(chats, this.handleClick)}</ul>
          <NewChatForm />
          {activeChat ? (
            <MessagesContainer
              chat={findActiveChat(chats, activeChat)}
              user={this.props.user}
            />
          ) : null}
        </div>
      </ActionCableProvider>
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
      <li key={chat.id} onClick={() => handleClick(chat.id)}>
        Chat with {chat.name}
      </li>
    )
  })
}
