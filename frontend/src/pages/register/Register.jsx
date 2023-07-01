import React, { useContext, useState } from 'react'
// import noteContext from '../context/noteContext';
import './register.css'
import userContext from '../../context/userContext/UserContext';
const Login = () => {

    const context = useContext(userContext);
    const { register } = context;
    const [myValue, setMyValue] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", repeatPassword: "" });
    const [pass, setPass] = useState(true);
    const onChange = (event) => {
        // console.log(event.target.value);
        setMyValue({ ...myValue, [event.target.name]: event.target.value });
    }
    const submitClick = (e) => {
        e.preventDefault();
        console.log(myValue);
        if (myValue.password === myValue.repeatPassword) {
            setPass(true);
            register(myValue.firstname, myValue.lastname, myValue.username, myValue.email, myValue.password);
            setMyValue({ firstname: "", lastname: "", username: "", email: "", password: "", repeatPassword: "" });

        } else {
            console.log('Password are not matching');
            setPass(false);
        }
        // props.passNote(myValue);
    }
    // const getData = ()=>{
    //     const myUserData = localStorage.getItem("userData");
    //     let user = JSON.parse(myUserData)
    //     console.log(myUserData);
    // }

    return (
        <div>
            <div className="registerForm">
                <form id="contacts" className="form">
                    <h2>Regiser Here</h2>
                    <p type="FirstName"><input type='text' id="firstname" name="firstname" placeholder="Write Your FirstName.." value={myValue.firstname} onChange={onChange} ></input></p>
                    <p type="LastName"><input type='text' id="lastname" name="lastname" placeholder="Write Your LastName.." value={myValue.lastname} onChange={onChange} ></input></p>
                    <p type="UserName"><input type='text' id="username" name="username" placeholder="Write Your UserName.." value={myValue.username} onChange={onChange} ></input></p>
                    <p type="Email"><input type='text' id="email" name="email" placeholder="Write Your Email.." value={myValue.email} onChange={onChange} ></input></p>
                    <p type="Password"><input type='text' className={pass ? "" : 'redAlert'} id="password" name="password" placeholder="Write Your Password.." value={myValue.password} onChange={onChange}></input></p>
                    <p type="Repeat Password"><input type='text' className={pass ? "" : 'redAlert'} id="repeatPassword" name="repeatPassword" placeholder="Repeat Your Password.." value={myValue.repeatPassword} onChange={onChange}></input></p>
                    <button onClick={submitClick} type="submit" id="submit" className="submitBtn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
