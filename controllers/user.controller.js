import User from "../models/user.model.js";
import AppError from '../utils/error.util.js';

const cookieOptions ={
    maxAge: 7 * 20 * 60 * 60 * 1000, //7days
    httpOnly:true, 
    secure:true
}

const register = async (req, res, next)=>{
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password){
        return next (new AppError('All fields are required',400));
    }

    const userExists =await User.findOne({ email });
    if(userExists){
        return next (new AppError('Email already exists',400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
    });

    if(!user){
        return next(new AppError('User registration failed, Please try again',400))
    }

    ///TODO 
    await user.save();
    user.password = undefined;

    const token = await user.generateJWTTokne();

    res.cookie('token',token,cookieOptions)

    res.status(200).json({
        success:true,
        message:'User register successfully',
        user
    })
};

const login = (req, res)=>{

};

const logout =(req, res)=>{

};
const getProfile = (req,res)=>{

};

export {
    register,
    login,
    logout,
    getProfile
}