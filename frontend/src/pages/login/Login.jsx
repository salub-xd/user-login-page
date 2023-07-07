import React, { useContext, useState } from 'react'
import userContext from '../../context/userContext/UserContext';
import './login.css'
const Login = () => {
    // const {login} = context;
    const context = useContext(userContext);
    const {myUser,login,error} = context;
    const [myValue, setMyValue] = useState({ email: "", password: "" });
    const onChange = (event) => {
        // console.log(event.target.value);
        setMyValue({ ...myValue, [event.target.name]: event.target.value });
    }
    const submitClick = (e) => {
        e.preventDefault();
        login(myValue.email,myValue.password);
        setMyValue({ email: "", password: "" });
    }
    // const getData = ()=>{
    //     const myUserData = localStorage.getItem("userData");
    //     let user = JSON.parse(myUserData)
    //     console.log(myUserData);
    // }

    return (
        <div>
            <div className="loginForm">
                <form id="contacts" className="form">
                    <h2>Login Here</h2>
                    <p type="Email"><input type='text' id="email" name="email" placeholder="Write Your Email.." value={myValue.email} onChange={onChange} ></input></p>
                    <p type="Password"><input type='password' id="password" name="password" placeholder="Write Your Password.." value={myValue.password} onChange={onChange}></input></p>
                    {error && <><p>{error}</p></>}
                    <button onClick={submitClick} type="submit" id="submit" className="submitBtn">Submit</button>
                </form>
            </div>
            {/* <h1>User's Data {myUserData}</h1> */}
        </div>
    )
}

export default Login
