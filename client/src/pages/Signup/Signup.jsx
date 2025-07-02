import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../../api/api';
import Logo from '../../components/Logo/Logo';


const Signup = () => {

    const navigate = useNavigate() ;

    const [inputs , setInputs] = useState({
        firstName : "" , 
        lastName : "" , 
        email : "" , 
        password : "" , 
        cnfpassword : ""
    })

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev , 
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault() ; 
        try{
            const response = await signin(inputs) ; 
            console.log(response) ;
            navigate('/login') ;
        }catch(err){
            console.log(err) ;
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Signup to collabordraw
                    </div>
                </div>
                <input type='text' placeholder='Enter you first Name' name='firstName' onChange={handleChange}/>
                <input type='text' placeholder='Enter you last Name' name='lastName' onChange={handleChange}/>
                <input type='text' placeholder='Enter you email' name='email' onChange={handleChange}/>
                <input type='password' placeholder='Enter you password' name='password' onChange={handleChange}/>
                <input type='password' placeholder='Confirm your password' name='cnfpassword' onChange={handleChange}/>
                <button type='submit'>Signup</button>
                <div className="message">
                    Already Signed up ? Click here to <Link to={'/login'} className="hyperlink">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;