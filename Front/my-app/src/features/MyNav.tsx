import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Login } from './Login/Login';
import Register from './Login/Register';


const  MyNav = () => {
  
  return (
    <div>
 <Navbar bg="primary" variant="dark" style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
             <Nav className="me-auto">
              <Nav.Link href="/ProductAdmin">ProductAdmin</Nav.Link>|{" "}
            <Nav.Link href="/Shop">Shop</Nav.Link>|{" "}
            <Nav.Link href="/Cart">Cart</Nav.Link>|{" "}
            <Nav.Link href="/Sign In">Sign in</Nav.Link>|{" "} 
            <Login></Login>
           
           </Nav> 
        </Navbar>






    </div>
  )
}

export default MyNav