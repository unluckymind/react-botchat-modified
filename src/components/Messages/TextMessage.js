import React, { Component } from 'react';
// import chatIconUrl from './../../assets/chat-icon.svg';

const TextMessage = (props) => {
  const text = props.message.data.text || ''
  const time = props.message.time

  return (
    <div className="sc-message--text">
      {text}
      <br/>
      <p className='sc-message--meta'>{time}</p>
    </div>
    )
}

export default TextMessage