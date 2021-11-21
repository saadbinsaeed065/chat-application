import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";


const usestyles=makeStyles({
    root:{
        marginTop:'100px',
     margin:'auto',
     width:'200px'
    
    }
})

let user;

export default function About() {
    const classes=usestyles();

    const [name, setname] = useState('')

const senduser=()=>{
    user= document.getElementById('login').value;
    document.getElementById('login').value= '';
}

    return (
        <div className={classes.root}>
                <TextField onChange={(e) =>setname(e.target.value)} id="outlined-basic" label="Login" id='login' variant="outlined" fullWidth /> <br />
            <Link  onClick={(event) => !name ?event.preventDefault(): null}  to='/home'>   <Button   onClick={senduser} variant="contained" >Login</Button>   </Link> 
        </div>
    )
}

export {user}
