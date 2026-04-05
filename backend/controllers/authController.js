import { UserModel } from "../models/UserModel.js";
import bcrypt, { hashSync } from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.json({success: false, message: "Missing detils"});
        }

        const exist = await UserModel.findOne({email})
        if(exist){
            return res.json({success: false, message: "User alredy exist"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2d"})
        res.json({success: true, message:"Registered Successfull", token})
    } catch (error) {
        console.log(error);
        return res.json({success: true, message: error})
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.json({success: false, message: "Missing detils"});
        }
        const user = await UserModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }
        const check = await bcrypt.compare(password, user.password);
        if(!check) {
            return res.json({success: false, message: "Incorrect password"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "2d"})

        return res.json({success: true, message: "user logged in", token})
    } catch (error) {
        console.log(error)
        return res.json({success: true, message: error})
    }
}

