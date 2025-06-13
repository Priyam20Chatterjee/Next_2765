import {connect} from "@/dbconnection/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendMail} from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function login(request: NextRequest){
    //extract data from token
    await getDataFromToken(request);
}