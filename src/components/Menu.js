import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignInContainer from 'containers/SignInContainer';
// import {render} from 'react-dom';
// import logo from '../logo.png' //실제 로고파일 경로



const Menu = () => {

    const [loginShow, setloginShow] = useState(false);

    // var a = new Date();
    // var b = a.getTime(); // 1515992172285
    // var c = new Date(1579330476298);
    // b == c.getTime(); // true


    // console.log(new Date(1579330476298))
  
    
    useEffect(() => {
        setloginShow(true);
      }, []);
    const handleOpen = () => setloginShow(true);
        


    // const array = ['dog', 'cat', 'sheep'];
// const [first, second] = array;
//console.log(setShow); // dog cat

    return (
        <section>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavLink className="navbar-brand" to="/"><img alt="" width="30"  className="d-inline-block align-top"/>{' HOME'}</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavLink className="nav-link" to="/signup" >SignUp</NavLink>
                <NavLink className="nav-link" to="/board" >Board</NavLink>
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Nav>
                <NavLink className="nav-link" to="/signin">Login</NavLink>
            {/* <Nav.Link onClick={handleOpen}>Login</Nav.Link> */}
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            {/* <div>
                <ul>
                    <li><NavLink exact to="/" activeStyle={activeStyle}>Dashboard</NavLink></li>
                    <li><NavLink exact to="/about" activeStyle={activeStyle}>Workloads</NavLink></li>
                    <li><NavLink to="/about/foo" activeStyle={activeStyle}>Targets</NavLink></li>
                    <li><NavLink to="/posts" activeStyle={activeStyle}>Tasks</NavLink></li>
                </ul>
                <hr/>
            </div> */}
        </section>
    );
};



export default Menu;