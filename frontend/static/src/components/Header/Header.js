import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link ,useOutletContext} from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Header({ isAuth, setIsAuth, navigate,is_customer,user}) {
  
  const[loggedUser, setLoggedUser]= useState({username:""});

  return (
    <Navbar bg="dark" variant="dark" className="mb-2 px-3">
      <Nav className="ml-auto flex-grow-1">
      <Link className="navbar-expand navbar-nav nav-link tabhome"  to="/login/">
         Home
        </Link><Link className="navbar-expand navbar-nav nav-link tabhome"  to="/article">
          Articles</Link>
          <Link className="navbar-expand navbar-nav nav-link tabhome"  to="login" >Login
        </Link></Nav>
   </Navbar>
  );
}

export default Header