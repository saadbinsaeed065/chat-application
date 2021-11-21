import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Home from './components/Home'
import Navbar from './components/Navbar/index';
import About from './components/about';




export default function App() {
  return (
  <Router>

<Grid container direction='column'>
        <div  >
        <Navbar/>
        </div>

        <div >
        <Routes>
        <Route path='/home' exact element={<Home/>} />
        <Route path='/about' exact element={<About/>} />
      </Routes>
        </div>
        </Grid>
 
  
 
    </Router>
  )
}
