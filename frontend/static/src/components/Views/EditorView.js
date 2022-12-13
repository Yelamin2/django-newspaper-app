import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import defaultArticleImage from "../../images/articles_default.jpeg";


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
                <div>{articles.body}/n</div>
                <div>{articles.is_published? '✅':'❌'} Published</div>
            </li>:''
        ) 
        );
      
    }

    return(
        <>
        {articles? articlesList: ""}
        </>

    )

}

export default EditorView