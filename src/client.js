import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.css'

import io from 'socket.io-client'
const skt = io()

class ChatForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {name:'',message:''}
  }

  nameChanged(e){
    this.setState({name:e.target.value})
  }

  messageChanged(e){
    this.setState({message:e.target.value})
  }

  send(){
    skt.emit('chat-msg',{
      name:this.state.name,
      message:this.state.message
    })
    this.setState({mesage:''})
  }

  render(){
    return(
      <div className={styles.form}>
        이름:<input value={this.state.name} onChange={e=>this.nameChanged(e)}/><br/>
        메시지:<input value={this.state.message} onChange={e=>this.messageChanged(e)}/><br/>
        <button onClick={e=>this.send()}>전송</button>
      </div>
    )
  }
}

class ChatApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      logs:[]

    }
  }
  componentDidMount(){
    skt.on('chat-msg',(obj)=>{
      const logs2 = this.state.logs
      obj.key = 'key_' + (this.state.logs.length + 1)
      console.log(obj)
      console.log(logs2)
      logs2.unshift(obj)
      this.setState({logs:logs2})
      this.forceUpdate()
    })
  }
  render(){
    const messages = this.state.logs.map((e, i)=>{
      return(
      <div key={e.key} className={styles.log}>
        <span className={styles.name}>{e.name}</span>:
        <span className={styles.msg}>{e.message}</span>
        <p style={{clear:'both'}}/>
      </div>
      )
    })
    return (
      <div>
        <h1>실시간 채팅</h1>
        <ChatForm />
        <div>메시지</div>
        <div>{messages}</div>
      </div>
    )
  }
}

ReactDOM.render(<ChatApp />, document.getElementById('root'))