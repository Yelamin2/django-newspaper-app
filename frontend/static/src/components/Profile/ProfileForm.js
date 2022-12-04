import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Profile.css";
import Cookies from "js-cookie";
import defaultProfileImage from "../../images/default.jpeg";

function ProfileForm() {
  const [profile, setProfile] = useState({
    avatar:null,
  });

  const [preview, setPreview] =useState(defaultProfileImage);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch("/api_v1/accounts/profiles/user/");
      if (!response.ok){
        if (!response.status ===404){
          throw Error("Somthing went wrong!");
      
        }
        return;
      }
      const data = await response.json();
      setProfile({...data});
      setPreview(data.avatar);
    };
    fetchUserProfile();
  },[]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    saveImage(file);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

    const saveImage = async (file) => {
      const formData = new FormData();
      formData.append("avatar", file)

      const {id } = profile;

      const options = {
        method: `${id ? "PUT" : "POST"}`,
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: formData,
      };

      const response = await fetch(
        `/api-v1/profile/${id ? "user/": ""}`,
        options
      );
      if (!response.ok){
        throw Error("Wrong");
      }
    }
  
  
    return (
      <Card style= {{width: "18rem"}} className = "mx-auto">
        <div className= "profile-image-container">
          <Card.Img variant="top" src={preview}/>
          <input type="file" name="avatar" onchangge={handleImage}/>
        </div>
        <Card.Body>
          <Card.Title>{profile.username?.toUpperCase()}</Card.Title>
        </Card.Body>
        </Card>
        );
  }
  
  export default ProfileForm;
  
  
  



 