import React from "react";
import { useState, useCallback, useEffect } from "react";

let usersList, articlesList;
function AdminView(){
    const [users, setUsers] = useState(null);
    const [articles, setArticles] = useState(null);



    const handleError = (err) => {
        console.warn(err);
    }


    const getUsers = useCallback(async() => {
        const response = await fetch("/api_v1/accounts/users/").catch(handleError);
        if(!response.ok){
            throw new Error("Network response was not OK");

        } else {
            const data = await response.json();
            setUsers(data);
            console.log(data);
        }

        
    }, []
    );
    useEffect(() => {
        getUsers();
        
    },[getUsers]);

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

    if( users!=null){
        console.log("NOT NULL",users);
        usersList = users.map((users, id) => (
            <li key={id}>
                <h2>{users.username}</h2>
                <div><img
                className="displayed-img "
                src={users.first_name}
                alt={users.last_name} />
                </div>
                <div>{users.email}</div>
            </li>
        ) 
        );
      
    }
      // 
    // Get the articles listed for editor to update or delete
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
                <div >
        {/* <p
          type="checkbox"
          name="is_published"
          value="Published"
          checked={articles.is_published}
          
        /> */}

        {articles.is_published? '✅':'❌'} Published
      </div>
                <p>Author : {users.filter(author => {return author.id===articles.author})}</p>
            </li>
        ) 
        );
      
    }


    return(
        <>
        {users? usersList: ""}
        {articles? articlesList: ""}
        </>
    )
}

export default AdminView