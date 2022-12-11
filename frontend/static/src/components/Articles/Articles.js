
import {useState, useEffect, useCallback} from "react";
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import './Articles.css'
import defaultArticleImage from "../../images/articles_default.jpeg";

var articlesList = {};

function Article(){
    const [articles, setArticles] = useState(null);
    const [preview, setPreview] =useState(defaultArticleImage);
    const [addArticle, setAddArticle] = useState([{title:"", body:"", image:preview}]);
    
    const handleError = (err) => {
        console.warn(err);
    }

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

    console.log("ARTICLES", articles);

    // 
    // Get the articles listed fro view on home page
    // 

    if( articles!=null){
        console.log("NOT NULL",articles);
        articlesList = articles.map((articles, id) => (
            <li key={id}>
                <h2>{articles.title}</h2>
                <div><img
                className="displayed-img "
                src={articles.image}
                alt={articles.title} />
                </div>
                <div>{articles.body}</div>
            </li>
        ) 
        );
        // return articlesList;
    }

    const handleChange = (e) => {
        setAddArticle({...addArticle, [e.target.name]:e.target.value})
    };

    // 
    // For Editor to submit articles to be published
    // 


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



    

        // const articlesList = articles.map((articles, id) => (
        //     <li key={id}>
        //         <h2>{articles.title}</h2>
        //         <p>{articles.body}</p>
        //     </li>
        // ));

        console.log("ARTICLES", articles);

        const handleImage = (event) => {
            const file = event.target.files[0];
            // saveImage(file);
            const reader = new FileReader();
            
            reader.onloadend = async () => {
              setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            
          };
        //   const saveImage = async (file) => {
        //     const formData = new FormData();
        //     formData.append("avatar", file)
      
        //     const {id } = profile;
      
        //     const options = {
        //       method: `${id ? "PUT" : "POST"}`,
        //       headers: {
        //         "X-CSRFToken": Cookies.get("csrftoken"),
        //       },
        //       body: formData,
        //     };
      
        //     const response = await fetch(
        //       `/api-v1/profile/${id ? "user/": ""}`,
        //       options
        //     );
        //     if (!response.ok){
        //       throw Error("Wrong");
        //     }
        //   }
        



    



    return (
        
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


            <div>{articles? articlesList: ""}</div>
        </>
    )

}

export default Article