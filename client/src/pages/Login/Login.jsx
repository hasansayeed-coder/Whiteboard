import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../api/api';
import { userLogin } from '../../reducers/authSlice';
import Logo from '../../components/Logo/Logo';



const Login = () => {

    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 

    const [inputs , setInputs] = useState({
        email : "" , 
        password : ""
    })

    const handleChange = (e) => {
        setInputs(prev => (
            {
                ...prev , 
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleSubmit = async(e) => {
        e.preventDefault() ;

        try{

            const resp = await login(inputs) ; 
            dispatch(userLogin(resp?.data?.user)) ; 
            navigate("/") ; 

        }catch(error){
            console.lor(error) ;
        }
    }

    return (
        <div className='form container'>
            <form onSubmit={handleSubmit}>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Login to Collabordraw
                    </div>
                </div>
                <input type="email" name="name" id="" placeholder='Enter your email id' onChange={handleChange}/>
                <input type="password" name="password" id="" placeholder='Enter your password' onChange={handleChange}/>
                <button type='submit'>Login</button>

                <div className="message">Not signed up yet ? Click here to <Link to={'/signup'} className="hyperlink">Signup</Link></div>
            </form>
        </div>
    );
};

export default Login;