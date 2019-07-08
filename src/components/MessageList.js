import React, { Component } from 'react';
import Message from './Messages'
class MessageList extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render () {
    console.log('List Of Messages: ', this.props.messages)
    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {this.props.messages.length > 0 ? this.props.messages.map((message, i) => {
          return <Message message={message} key={i}/> 
        }) : ""}
      </div>)
  }
}

export default MessageList