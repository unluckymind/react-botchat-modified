import React, { Component } from 'react';
import './loading.css'
// import chatIconUrl from './../../assets/chat-icon.svg';

class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showloader: false,
      text: this.props.message.data.text || '',
      author: this.props.message.author,
      time: this.props.message.time,
      onHittingApi: this.props.message.load
    }
  }

  // shouldComponentUpdate(a, b){
  //   if(b.onHittingApi){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  // componentDidUpdate(prevProp){

  // }

  componentDidMount(){
    setTimeout( () => { 
      if(this.state.loading){
        this.setState({showloader: true})
      }
    }, 5000)
  }

  render(){
    const {text, author, time, showloader, onHittingApi, loading} = this.state
    return(
        !showloader && author == "them" ? <span className="loading"></span> : 
        <div className="sc-message--text">{text}
        <div className="sc-message--meta">{time}</div>
        </div>
    )
  }
}


export default TextMessage