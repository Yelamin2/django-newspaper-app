import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import defaultArticleImage from "../../images/articles_default.jpeg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import '../Articles/Articles.css';
import Cookies from "js-cookie";

let articlesList;
function EditorView(){

    const [articles, setArticles] = useState(null);
    const [preview, setPreview] =useState(defaultArticleImage);
    const [addArticle, setAddArticle] = useState([{title:"", body:"", image:preview}]);
    
    const handleError = (err) => {
        console.warn(err);
    }
    const {user}= useOutletContext();

    // Retrive articles from database

    const getArticles = useCallback(async() => {
        const response = await fetch("/api_v1/articles/articles/").catch(handleError);
        if(!response.ok){
            throw new Error("Network response was not OK");

        } else {
            const data = await response.json();
            setArticles(data);
            console.log(data);
        }

        
    }, []
    );

    useEffect(() => {
        getArticles();
        
    },[getArticles]);


    // 
    // Get the articles listed for editor to update or delete
    // 

    if( articles!=null){
        console.log("NOT NULL",articles);
        articlesList = articles.map((articles, id) => (
            articles.author==user.pk? 
            <li key={id}>
                <h2>{articles.title}</h2>
                <div><img
                className="displayed-img "
                src={articles.image}
                alt={articles.title} />
                </div>
                <div>{articles.body}</div>
                <div>{articles.is_published? '✅':'❌'} Published</div>
                <div>{articles.is_published? '': <div><Button>Edit</Button> <Button >Delete</Button></div>}</div>
            
            
            </li>:''
        ) 
        );
      
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: JSON.stringify(addArticle),  
        };

        const response= await fetch("/api_v1/articles/articles/", options).catch(
            handleError
        );
        if(!response.ok){
            throw new Error("Network not OK");
        } else {
            const data = await response.json();
        }
        
    } 


        console.log("ARTICLES", articles);

        const handleChange = (e) => {
            setAddArticle({...addArticle, [e.target.name]:e.target.value})
        };

        const handleImage = (event) => {
            const file = event.target.files[0];
            // saveImage(file);
            const reader = new FileReader();
            
            reader.onloadend = async () => {
              setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            
          };

    return(
        <>
        <Form onSubmit={handleSubmit}>

<Card style= {{width: "18rem"}} className = "mx-auto">
    <div className= "profile-image-container">
    <Card.Img variant="top" src={preview}/>
    <input type="file" name="imager" onChange={handleImage}/>
    </div>
    <Card.Body>
</Card.Body>
</Card>
<Form.Group className="mb-4" controlId="title">
    <Form.Label> </Form.Label>
    <Form.Control 
    type="text"
    value={addArticle.title}
    name="title"
    onChange={handleChange} />
    </Form.Group>
<Form.Group className="mb-4" controlId="body">
    <Form.Label> </Form.Label>
    <Form.Control 
    type="textarea"
    value={addArticle.body}
    name="body"
    onChange={handleChange} />
    </Form.Group>

<Button variant="primary" type="submit">
    Submit
</Button>
</Form>
        {articles? articlesList: ""}
        </>

    )

}

export default EditorView