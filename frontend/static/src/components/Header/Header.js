import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link ,useOutletContext} from "react-router-dom";
import Button from "react-bootstrap/Button";
import LoginForm from "../Login/LoginForm";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Header({ isAuth, setIsAuth, navigate,is_customer,user}) {
  
  const[loggedUser, setLoggedUser]= useState({username:""});
  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      (err) => {
        console.warn(err);
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not OK.");
    } else {
      setIsAuth(false);
      // setLoggedUser={username:""};
      Cookies.remove("Authorization");
      navigate('/');

    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-2 px-3">
      <Nav className="ml-auto flex-grow-1">
      <Link className="navbar-expand navbar-nav nav-link tabhome"  to="/article/">
         Home
        </Link>
          {isAuth ? (
          <Button
            variant="link"
            className="navbar-expand navbar-nav nav-link ms-auto border-0 tab"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Link className="navbar-expand navbar-nav nav-link ms-auto tab" to="/login/">
            Login
          </Link>
        )}
         </Nav>
   </Navbar>
  );
}

export default Header