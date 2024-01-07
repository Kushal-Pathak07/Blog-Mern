import User from '../models/User.js';
import Token from '../models/Token.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signupUser = async (req, res) => {
    try
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {username: req.body.username, name:req.body.name, password:hashedPassword}; 
        console.log(user);
        const newUser = await User.create(user);

        return res.status(200).json({
            success:true,
            message:"Signup successful",
        });
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while doing signup",
        });
    }
}

export const loginUser = async (req, res) => {
    try
    {
        let user = await User.findOne({username:req.body.username});
        if(! user)
        {
            return res.status(400).json({
                success:false,
                message:'User doest match',
            })
        }

        //when username matches, then compare the matching of encrypted password in db and request password
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) //generating token for user if he exists in db
        {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'}); //temporary token..ususally expires in 15min
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY); //so we will store refresh refresh token in db

            const newToken = await Token.create({token: refreshToken});

            return res.status(200).json({
                success:true,
                message:'Token successfully generated and stored in db',
                accessToken,
                refreshToken,
                name:user.name,
                username: user.username,
            })
        }
        else
        {   
            return res.status(400).json({
                success:false,
                message:'Invalid password',
            })
        }
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Error while doing login of user',
        })
    }
}