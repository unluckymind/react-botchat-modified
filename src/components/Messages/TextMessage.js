import React, { Component } from 'react';
import './loading.css'


class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showloader: false,
      text: this.props.message.data.text || '',
      author: this.props.message.author,
      time: this.props.message.time,
      onHittingApi: this.props.message.load,
      image: this.props.message.image,
      zoom: '0'
    }
  }

  componentDidMount(){
    setTimeout( () => { 
      if(this.state.loading){
        this.setState({showloader: true})
      }
    }, 5000)
  }

  handleClick = () => {
    const {zoom} = this.state
    zoom == "0" ?
    this.setState({zoom: "140%"})
    :
    this.setState({zoom: "0"})
  }

  render(){
    const {text, author, time, showloader, image, zoom} = this.state
    const stylish = { cursor: "pointer", transition: "0.2s", delay: '0.2s'}
    
    return(
        !showloader && author == "them" ? <span className="loading"></span> : 
        <div className="sc-message--text">
          {text}
          <br/>
          <br/>
          <div style={zoom == "0" && image ? {border: "2px solid #f7f7f7"} : null }>
            <center style={{padding: 5, margin: 1}}>
            {image ? 
             <img src={image} width={zoom == "0" ? "60%" : zoom} height={zoom == "0" ? "60%" : zoom} onClick={this.handleClick} style={stylish}/>
              : ""}
            </center>
          </div>
          <div className={author=="them" ? "sc-message--meta-them" : "sc-message--meta-mine"}>{time}</div>
        </div>
    )
  }
}


export default TextMessage