
import {useState, useEffect, useCallback} from "react";
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const articlesList = {};

function Article(){
    const [articles, setArticles] = useState(null);
    const [addArticle, setAddArticle] = useState([{title:"", body:""}]);

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

    // console.log("ARTICLES", articles);

    if( articles!=null){
        const articlesList = articles.map((articles, id) => (
            <li key={id}>
                <h2>{articles.title}</h2>
                <p>{articles.body}</p>
            </li>
        ) 
        );
        // articlesList;
    }

    const handleChange = (e) => {
        setAddArticle({...addArticle, [e.target.name]:e.target.value})
    };


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



    



    return (
        
        <>
            <div>this is s div</div>

            <Form onSubmit={handleSubmit}>
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
        </>
    )

}

export default Article