import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";
const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true, 'Name is required'],
        minLength:[5, 'Name must be at least 5 character'],
        maxLength:[50, 'name should be less than 50 character'],
        lowercase:true,
        trim:true, // Removes extra spaces

    },
    email:{
        type:String,
        required:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',]// Match email regex
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[8,'Password must be at least 8 character'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String
        }
    },
    role:{
        type:String,
        enum:['USER', 'ADMIN'],
        default:'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
},{
    timestamps:true
});
// Hashes password before saving to the database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
});

userSchema.methods = {
    generateJWTTokne:async function(){
        return await jwt.sign({
            id: this._id, email:this.email,role:this.role
        },process.env.JWT_SECRET,
        {
            expiresIn:'24h'
        })
    }
    
}
const User = model('User',userSchema);
export default User;