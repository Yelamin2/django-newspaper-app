import React from "react";
import { useState, useCallback, useEffect } from "react";

let usersList;
function AdminView(){
    const [users, setUsers] = useState(null);



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


    return(
        <>
        {users? usersList: ""}
        </>
    )
}

export default AdminView