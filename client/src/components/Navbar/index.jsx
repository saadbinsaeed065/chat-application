import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './Navbar';


export default function Navbar() {
    return (
        <>
            <Nav>
                <NavLink to="/">
            
                </NavLink>
                <Bars/>
                <NavMenu>
                <NavLink to="/home" >
              Home
                </NavLink>
                <NavLink to="/about" >
              About
                </NavLink>
                <NavLink to="/contact" >
              Contact
                </NavLink>
                <NavLink to="/login" >
              Login
                </NavLink>
                <NavLink to="/signup" >
              Signup
                </NavLink>
                <NavBtn>

                </NavBtn>
                    <NavBtnLink to='/logout'>
                      Logout
                    </NavBtnLink>
                </NavMenu>
            </Nav>
        </>
    )
}
