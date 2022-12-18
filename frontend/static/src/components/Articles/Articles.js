
import {useState, useEffect, useCallback, useReducer} from "react";
import Cookies from "js-cookie";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import './Articles.css'
import defaultArticleImage from "../../images/articles_default.jpeg";
import { useOutletContext } from "react-router-dom";

var articlesList = {};

function Article(){
    const [articles, setArticles] = useState(null);
    const [preview, setPreview] =useState(defaultArticleImage);
    const [addArticle, setAddArticle] = useState([{title:"", body:"", image:preview}]);
    const {user}= useOutletContext();
    
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

    console.log("ARTICLES", articles, user);

    // 
    // Get the articles listed fro view on home page
    // 

    if( articles!=null){
        console.log("NOT NULL",articles, user.pk);
        articlesList = articles.map((articles, id) => (
            articles.is_published? 
            <li key={id}>
                <h2>{articles.title}</h2>
                <div><img
                className="displayed-img "
                src={articles.image}
                alt={articles.title} />
                </div>
                <div>{articles.body}</div>
            </li>:''
        ) 
        );
        // return articlesList;
    }

    return (
        
        <>


            <div>{articles? articlesList: ""}</div>
        </>
    )

}

export default Article