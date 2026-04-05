
import jwt from "jsonwebtoken"
import { UserModel } from "../models/UserModel.js"

export const isAuthenticate = async(req, res, next) => {

    try {
        let token = req.headers.authorization

        if(!token){
            return res.json({success: false, message: "Not authenticated"})
        }

        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decode.id).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.json({success: false, message: "sever error"})
    }
}