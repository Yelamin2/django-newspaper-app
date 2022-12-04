import Cookies from 'js-cookie';
import Header from "../Header/Header"
import { useNavigate, Outlet,useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from '../Registeration/RegisterationForm';
import LoginForm from '../Login/LoginForm';
import Articles from '../Articles/Articles';
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();
  const [user, setUser]=useState([]);

  console.log("Just started")

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Fetch request for login")
      const response = await fetch("/dj-rest-auth/user/");
      if (!response.ok) {
        setIsAuth(false);
        navigate("/");
        // console.log("Not Auth");
      } else { 
        const data = await response.json();
        setUser({...data}) ;  
        setIsAuth(true);
      }
    };

    setTimeout(checkAuth, 100);
    
  }, [isAuth]);

  if (isAuth === null) {
    return ( console.log("Waiting"),
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto mt-5"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const headerProps = {
    isAuth,
    setIsAuth,
    navigate, 
    user 
  };
  


  return (
    <>
    <section className="bg-img" >
    <Header  {...headerProps} />
    <Container className='container'  >
        <Outlet context={{ setIsAuth, navigate, user}} />
      </Container>
    <div className="App"><p>Just DO it</p>
      {/* <Header />Any thing */}
      {/* <RegistrationForm />
      <LoginForm /> */}
      {/* <Articles /> */}
      
      
      
    </div>
    </section></>
  );
}

export default App;
