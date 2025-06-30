const mongoose = require('mongoose') ; 
const bcrypt = require('bcrypt') ; 
const jwt = require('jsonwebtoken') ;

const userSchema = mongoose.Schema({
    firstName : {
        type : String ,
        required : true , 
    } , 
    lastName : {
        type : String ,
        required : true , 
    } , 
    email : {
        type : String ,
        required : true , 
        unique : true , 
        lowercase : true , 
        trim : true ,
    } , 
    password : {
        type : String ,
        required : [true , "Password is required"] , 
    } , 
    refreshToken : {
        type : String , 
    } , 
} , {timestamps : true})

userSchema.pre("save" , async function(next){
    const user = this ; 

    if(!user.isModified("password"))return next() ; 

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password , salt) ;
        user.password = hash ; 
        next() ;
    }catch(error){
        return next(error) ; 
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        return await bcrypt.compare(candidatePassword , this.password) ;
    }catch(error){
        throw error ; 
    }
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {_id : this._id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {_id : this._id} , 
        process.env.REFRESH_TOKEN_SECRET , 
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model('User', userSchema);
module.exports = User;
