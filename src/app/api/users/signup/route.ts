import {connect} from "@/dbconnection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendMail} from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email});

        if(user) { 
            return NextResponse.json({error:"User already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save();
        console.log(saveUser)

        //send verification email
        await sendMail({email, emailType: "VERIFY", userId: saveUser._id});

        return NextResponse.json({
            message:"User created successfully",
            success: true,
            saveUser
        })
                
        //validation

    }catch(err:any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
