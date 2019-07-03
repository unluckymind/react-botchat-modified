import messageHistory from './messageHistory';
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from '../../src'
import TestArea from './TestArea';
import './../assets/styles'

import axios from 'axios'

class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
      datas: '',
      times: ''
    };
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  _onMessageWasSent(message, time) {    
    this.setState({
      messageList: [...this.state.messageList, {id: this.lastId + 1, ...message, time}]
    }, () => {
      axios.get('http://localhost:8000/botman', {
        params: {
          driver: "web",
          userId: "1234",
          message: message.data.text
        }
        }).then(res => {
          console.log('hasil', this.state)
          const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
          this.setState({
            newMessagesCount: newMessagesCount,
            datas: res.data,
            messageList: [...this.state.messageList, {
              id: this.lastId + 1,
              author: 'them',
              type: res.data.messages[0].type,
              data: res.data.messages[res.data.messages.length-1],
              time: time
            }]
          })
        })
        this.lastId += 1
    })
  }

  _sendMessage(text = this.state.messageList[this.state.messageList.length-1].data.text) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          id: this.lastId + 1,
          author: 'them',
          type: 'text',
          data: {text}
        }]
      })
      this.lastId += 1
  }

  onKeyPress = (userInput) => {
    console.log(userInput)
  }


  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  render() {
    return <div>
      {/* <Header /> */}
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      />
      <Launcher
        agentProfile={{
          teamName: 'Hana ChatBot',
          imageUrl: 'http://icons.iconarchive.com/icons/fasticon/creature-cutes/48/Creature-Blue-Pants-icon.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        onKeyPress={this.onKeyPress}
        onDelete={this.onDelete}
        showEmoji
        showFile
      />
      <div style={{height: 200}} />
      {/* <Footer /> */}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))