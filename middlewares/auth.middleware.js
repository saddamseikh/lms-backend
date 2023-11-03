import AppError from "../utils/error.util.js";
import  jwt  from 'jsonwebtoken';
const isLoggedIn = async (req, res, next)=>{
    const { token } = req.cookies;
try{

    if(!token)
    {
        return next (new AppError('Unauthorized, please login to continue',401))
    }
    const userDetails = await jwt.verify(token,process.env.JWT_SECRET);
    if(!userDetails){
        return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = userDetails
    next();
}catch(e){
    res.status(401).json({
        success:false,
        message:e.message
    })

}
}

export {isLoggedIn} ;