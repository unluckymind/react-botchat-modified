import messageHistory from './messageHistory';
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from '../../src'
import TestArea from './TestArea';
import './../assets/styles'

import axios from 'axios'

class Demo extends Component {
  constructor() {
    super()
    this.state = {
      messageList: messageHistory,
      isOpen: false,
      datas: '',
      times: '',
      isLoading: 0
    }
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  _onMessageWasSent(message, time) {  
    this.setState({
      messageList: [...this.state.messageList,{ id: this.lastId + 1, ...message, time }]
    },
    () => { 
        axios.get('http://localhost:8000/botman', {
          params: {
            driver: "web",
            userId: "1234",
            message: message.data.text
          }
        })
        .then(res => 
          {
            const data = {
              id: this.lastId + 1,
              author: 'them',
              type: res.data.messages[0].type,
              data: res.data.messages[res.data.messages.length-1],
              time: time,
              image: res.data.messages[0].attachment ? res.data.messages[0].attachment.url : ""
            }
            this.setState({
              datas: res.data,
              messageList: [...this.state.messageList, data]
            })
          console.log('res: ', res)
          })
        }
      )
  }

  onKeyPress = (userInput) => {
   return null;
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
        // onMessage={this._sendMessage.bind(this)}
      />
      <Launcher
        agentProfile={{
          teamName: 'Hana ChatBot',
          imageUrl: 'http://icons.iconarchive.com/icons/fasticon/creature-cutes/48/Creature-Blue-Pants-icon.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onMessageReceived={this.props.onMessageReceived}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        onDelete={this.onDelete}
        showEmoji
        showFile
        onKeyPress={this.onKeyPress}
      />
      <div style={{height: 200}} />
      {/* <Footer /> */}
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))