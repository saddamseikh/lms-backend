import User from "../models/user.model.js";
import AppError from '../utils/error.util.js';
import bcrypt from 'bcryptjs'

const cookieOptions ={
    maxAge: 7 * 20 * 60 * 60 * 1000, //7days
    httpOnly:true, 
    // secure:true
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
// Create new user with the given necessary data and save to DB
    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
    });

// If user not created send message response
    if(!user){
        return next(new AppError('User registration failed, Please try again',400))
    }

    ///TODO 
    // Save the user object
    await user.save();

  // Generating a JWT token
    const token = await user.generateJWTTokne();

    user.password = undefined;

    res.cookie('token',token,cookieOptions)

    res.status(200).json({
        success:true,
        message:'User register successfully',
        user
    })
};

const login = async (req, res,next)=>{
    try{

        const { email, password} = req.body;
        if(!email || !password){
            return next(new AppError('All filed is require',400))
        };
        const user = await User.findOne({
            email
        }).select('+password');
        
        if(!user || !(await bcrypt.compare(password,user.password))) {
            return next (new AppError('Email or password does not match',400));
        }  
    
        const token = await user.generateJWTTokne();
        user.password = undefined;
    
        res.cookie('token',token,cookieOptions);
        res.status(200).json({
            success:true,
            message:'User login successfully',
            user,
        })
    }
    catch(e){
        return next(new AppError (e.message,500));
    }

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