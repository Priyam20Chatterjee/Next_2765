import {connect} from "@/dbconnection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendMail} from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function login(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User donot exist"}, {status: 400});
        }

        // if(user.password !== password) or we can also do it by bcrypt.compare(password, user.password)

        const passwordCheck = await bcryptjs.compare(password, user.password);

        if(!passwordCheck){
            return NextResponse.json({error:"Invalid Password entered"}, {status: 401});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    }catch(err:any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}