import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router';
import { useGlobalUserContext } from '../Context/UserContext';
const Login = () => {
    const url = 'http://localhost:8000/api/v1/user/auth/'
    const { dispatch } = useGlobalUserContext()
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [toggle, setToggle] = useState(false)
    const handleChange = (e) => {
        setCredentials((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        try {
            console.log(credentials);
            if (toggle) {
                response = await axios.post(`${url}signup`, credentials)
            } else {
                response = await axios.post(`${url}login`, credentials);
            }
            dispatch({ type: 'LOGIN', payload: response.data })
            navigate('/')
        } catch (error) {
            alert(error.message)
            console.log((error.message));
            // Handle the error, e.g., display an error message to the user
        }
    };

    return (
        <div className="mainContainer">
            <div className="loginContainer">
                <div className="login" style={{ background: toggle ? '#898980' : '#c5dac1 ' }}>
                    {toggle ?
                        <div className='contentSignup'>
                            <h1>hi there!</h1>
                            <p className='about'>already have a account, login to monitor your financial data</p>
                            <button className='signupButton' onClick={() => setToggle
                                (!toggle)}>login</button>
                        </div> :
                        <div className='loginForm'>
                            <h3>Login, to monitor your financial data</h3>
                            <div className="input-container">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" placeholder="Enter your username" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password" onChange={(e) => handleChange(e)} />
                            </div>
                            <button className="loginButton" onClick={(e) => handleSubmit(e)}>Login</button>

                        </div>}
                </div>
                <div className="signup" style={{ background: !toggle ? '#898980' : '#c5dac1 ', borderTopLeftRadius: toggle ? '5rem' : '0', borderBottomLeftRadius: toggle ? '5rem' : '0' }}>
                    {!toggle ?
                        <div className='contentSignup'>
                            <h1>hi there!</h1>
                            <p className='about'>Turn spending into strategy – Our platform transforms everyday expenses into actionable insights, equipping you with the tools to manage, understand, and thrive financially.</p>
                            <button className='signupButton' onClick={() => setToggle
                                (!toggle)}>Sign up</button>
                        </div> :
                        <div className='loginForm'>
                            <h3 style={{ color: toggle ? 'black' : '#c5dac1 ', textTransform: 'capitalize', fontSize: '1.3rem' }}>sign up</h3>
                            <div className="input-container">
                                <label htmlFor="username" style={{ color: toggle ? 'black' : '#c5dac1 ' }}>Username</label>
                                <input type="text" id="username" placeholder="Enter your username" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="input-container">
                                <label htmlFor="password" style={{ color: toggle ? 'black' : '#c5dac1 ' }}>Password</label>
                                <input type="password" id="password" placeholder="Enter your password" onChange={(e) => handleChange(e)} />
                            </div>
                            <button className="signupButton" onClick={(e) => handleSubmit(e)} style={{ background: toggle ? '#898980' : '#c5dac1 ' }}>sign up</button>

                        </div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
