import React, { Component } from 'react';
// import chatIconUrl from './../../assets/chat-icon.svg';

class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showloader: false,
      text: this.props.message.data.text || '',
      author: this.props.message.author,
      time: this.props.message.time
    }
  }

  componentDidMount(){
    console.log('perubahan: ')
    setTimeout( () => { 
      if(this.state.loading){
        this.setState({showloader: true})
      }
    }, 3000)
  }

  render(){
    const {text, author, time, showloader} = this.state
    return(
        !showloader && author =="them" ? <span style={{fontSize: "24px"}}>. . .</span> : 
        <div className="sc-message--text">{text}
        <div className="sc-message--meta">{time}</div>
        </div>
    )
  }
}

export default TextMessage