import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { user } from './about';
import socketio from 'socket.io-client'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message';

const ENDPOINT ='https://chat-application10.herokuapp.com/'

const usestyles=makeStyles({
    root:{
       marginTop:'20px',
        height: '70vh',
        overflowY:'scroll',
        backgroundColor:'black'
    },
tree:{
        marginTop:'10px'
    }
})

let socket;

export default function Home() {
    const [id, setid] = useState('')

    const [messages, setmessages] = useState([])

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            send();
          console.log('enter press here! ')
        }
      }
   
    const send =()=>{
            const message=  document.getElementById('chatinput').value;
                socket.emit('message', {message, id})
                document.getElementById('chatinput').value='';
    }
   

    useEffect(() => {
     
     
                        socket= socketio(ENDPOINT, {transports: ['websocket']})

                    socket.on('connect', ()=>{
                    alert('connected')
                    setid(socket.id)
                    })

                //emit mean we aree sending this user data to backend
                //the msg who send only that person recieves this
                    socket.emit('joined', {user})

                    socket.on('welcome', (data)=>{
                        setmessages([...messages, data])
                    console.log(data.user,data.message)
                    })

                    socket.on('userjoined', (data)=>{
                        setmessages([...messages, data])
                        console.log(data.user,data.message)
                    })

                    socket.on('leave', (data)=>{
                        setmessages([...messages, data])
                        console.log(data.user,data.message)
                    })

      return () => {
                        socket.emit('disconnect');
                        socket.off();
                        }

                  
    }, [])


    useEffect(() => {
                    socket.on('sendmessage', (data)=>{
                        setmessages([...messages, data])
                   console.log(data.user, data.message, data.id)
                    })    

    return () => {
         socket.off();
        }
    }, [messages])



   
    const classes=usestyles();
    return (
        <>
        <Grid container >
               <Grid item xs={2}>
                  
                   </Grid>
              
              <Grid item xs={8} >
                    <ReactScrollToBottom className={classes.root}>

                       {messages.map((item,i)=>  <Message  message={item.message} user={item.id===id ? '' : item.user} 
                       classs={item.id===id ? 'msgright' : 'msgleft'} /> ) }   
                        
                    </ReactScrollToBottom>  
                   
                    
              </Grid>
              <Grid item xs={2}>
                   
               </Grid>
        </Grid>

                <Grid container >
                <Grid item xs={2}>

                </Grid>

                <Grid item xs={8} >
                    <div className={classes.tree}>
                    <TextField id="chatinput" label="Message" variant="outlined"  onKeyPress={handleKeyPress}
                     fullWidth style={{backgroundColor:'lightblue',borderRadius:'10px'}} />

                         <Button variant="contained" onClick={send}>Send</Button>

                    </div>
               
                        
               </Grid>
               <Grid item xs={2}>

               </Grid>
                <Grid item xs={2}>

                </Grid>
                </Grid>

</>
    )
}
