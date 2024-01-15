const nodemailer= require("nodemailer")


exports.sendemail = async (options)=>{

    const transporter= nodemailer.createTransport({ 
            host: "sandbox.smtp.mailtrap.io",
            port: 25,
            auth: {
              user: "e0569e9cc4d765",
              pass: "0020c66b027d4c"
            }
        

  });

  
    const mailoption=({
        from:"e0569e9cc4d765",
        to:options.email,
        subject:options.subject,
        text:options.message,
    })

    await transporter.sendMail(mailoption)
}