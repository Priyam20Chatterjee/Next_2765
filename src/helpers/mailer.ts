import nodemailer from "nodemailer";

export const sendMail = async({email, emailType, userId}: any) => {
    try{

        //TODO: Configure mail for usage.
        
        const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false, 
        auth: {
            user: "username",
            pass: "password",
        },
      });

      const mailOptions = {
        from: 'priyam@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        // text: ,
        html:"<b>Hello</br>"
      }

      const mailResponse = await transporter.sendMail(mailOptions);
      return mailResponse;
      
    }catch(err : any){
        throw new Error(err.message);
    }
}