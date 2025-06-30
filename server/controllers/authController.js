const User = require('../models/userModel') ; 
const jwt = require('jsonwebtoken') ; 

// controller for generating refresh and access tokens
const generateAccessAndRefreshToken = async(userId) => {
    try{

        const user = await User.findById(userId) ; 

        const accessToken = user.generateAccessToken() ; 
        const refreshToken = user.generateRefreshToken() ;


        user.refreshToken = refreshToken ; 


        await user.save({validateBeforeSave : false})

        return {accessToken , refreshToken} ;

    }catch(error){
        res.status(500).json({
            error : "Something went wrong while generating refresh and access token"
        })
    }
}

// controller for signup
const  signup = async(req , res) => {

    const {firstName , lastName , email , password , cnfpassword} = req.body ; 

    try{
        const user = await User.findOne(
            {email}
        ) ; 

        if(!user){
            if(password === cnfpassword){
                const newUser = new User({
                    firstName , lastName , email ,password
                }) ; 
                await newUser.save() ; 
                return res.status(201).json({
                    message : "User registered successfully"
                })
            }else{
                return res.status(400).json({
                    error : "Password not matched"
                })
            }
        }
    }catch(error){
        return res.status(401).json({
            error : "Email already exists"
        })
    }
}

// controller for login
const login = async(req , res) => {
    const {email , password} = req.body ; 

    try{

        const user = await User.findOne({email}) ; 

        if(!user){
            return res.status(401).json({
                message : "USer not found!!"
            })
        }

        const passwordMatch =  await user.comparePassword(password)  ;

        if(passwordMatch){
            const {accessToken , refreshToken} =  await generateAccessAndRefreshToken(user._id) ; 

            const loggedUser = await User.findById(user._id).select("-password") ;

            const options = {
                httpOnly : true , 
                secure : true , 
                sameSite : 'None'
            }

            return res.status(200).cookie('accessToken' , accessToken , options).cookie('refreshToken' , refreshToken , options).json({
                message : 'Login Successful',
                user : loggedUser , accessToken , refreshToken
            })
        }else{
            return res.status(401).json({
                message : "Password doesn't match"
            })
        }

    }catch(err){
        return res.status(500).json({
            error : "Internal Server Error!!!"
        })
    }
}

const getLoggedInUserDetails = async(req , res) => {
    return res.status(200).json({
        currentUser : req.user
    }) ;
}

module.exports = {
    signup , login , getLoggedInUserDetails
}