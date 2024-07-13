import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username already exists"],
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10) 
    }
    next();
})
userSchema.methods.matchPassword = async function (password) {
    const ans = await bcrypt.compare(password, this.password); 
    return ans;
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id ,username:this.username }, process.env.JWT_SECRET)
}

userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken);
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15min valid token
    return resetToken;
}


const User=mongoose.model('User',userSchema);
export default User;