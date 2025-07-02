import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';


const Protection = ({children , authentication = true}) => {

    const currentUser = useSelector(state => state.auth.currentUser) ; 
    const navigate = useNavigate() ; 
    const [loading , setLoading] = useState(true) ;  

    useEffect(() => {

        if(authentication && !currentUser){
            navigate('/login') ; 
        }else if(!authentication && currentUser){
            navigate('/') ;
        }
        setLoading(false) 
    } , [authentication , currentUser , navigate]) ;

    return loading ? <LoadingScreen /> : <>{children}</>
};

export default Protection;