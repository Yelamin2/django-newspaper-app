import {BrowserRouter, Route, Routes} from "react-router-dom";
// import './index.css';
import App from "../Apps/App";
import reportWebVitals from "../../reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileForm from "../Profile/ProfileForm";
import RegistrationForm from "../Registeration/RegisterationForm";
import LoginForm from "../Login/LoginForm";
import Articles from "../Articles/Articles";
import AdminView from "../Views/AdminView";
import EditorView from "../Views/EditorView";

function Router(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="registration" element={<RegistrationForm />} />
            <Route path="profile" element={<ProfileForm />} />
            <Route path="article" element={<Articles/>}/>
            <Route path="editorview" element={<EditorView/>}/>
            <Route path="adminview" element={<AdminView/>}/>
          </Route>
          <Route
          //   // path="*"
          //   // element={
          //   //   <main>
          //   //     <p>There is nothing here!</p>
          //   //   </main>
          // }
        />
      </Routes>
    </BrowserRouter>);
    
  }

  export default Router;