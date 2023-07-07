import React, { useState } from 'react'
import UserContext from './UserContext';
const UserState = ({children}) => {

    let host = 'http://localhost:5000/api';
    const [myUser, setMyUser] = useState({});
    const [error, setError] = useState("")

    const register = async (firstname, lastname, username, email, password) => {
        console.log("User Register");
        try {
            const res = await fetch(`${host}/register`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstname, lastname, username, email, password })
            });
            const resData = await res.json();
            setMyUser(resData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    const login = async (email, password) => {
        console.log("User Login");
        try {
            const res = await fetch(`${host}/login`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const resData = await res.json();
            // console.log(res.status)

            if (res.status === 201) {
                setMyUser(resData);
            } 
            else if (res.status === 401) {
                setError(resData.error)
            }
            

            // console.log(myUser.error);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <UserContext.Provider value={{ myUser, register, login, error }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserState
