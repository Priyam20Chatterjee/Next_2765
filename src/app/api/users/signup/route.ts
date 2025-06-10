import {connect} from "@/dbconnection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

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

        
        //validation

    }catch(err:any){
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
