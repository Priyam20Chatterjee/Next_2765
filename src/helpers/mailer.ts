import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { use } from "react";
import bycryptjs from "bcryptjs";

export const sendMail = async({email, emailType, userId}: any) => {
    try{
        //TODO: Configure mail for usage.
        const hashedToken = await bycryptjs.hash(userId.toString(), 10);
        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId, {verified: true, verifyTokenExpiery: Date.now()+3600000});
        } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId, {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now()+3600000});
        }
        
// Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "22f7284a3b26df",
            pass: "eb449cbe81fae0"
          }
        });
    
      const mailOptions = {
        from: 'priyam@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        // text: ,
        html:"<b>Hello</br>"
      }

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
      
    }catch(err : any){
        throw new Error(err.message);
    }
}