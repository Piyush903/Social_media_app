// const nodeMailer = require("nodemailer");

// exports. = async (options) => {
//   var transporter = nodeMailer.createTransport({
//     // host: "smtp.mailtrap.io",
//     // port: 2525,
//     // auth: {
//     //   user: "5e48b3f2422273",
//     //   pass: "ff8c4a959ecca0"
//     // }
//     // 
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     pool: true, // This is the field you need to add
//     auth: {
//        user: 'nijhawanpiyush4495@gmail.com',
//        pass: 'qwerty@123' 
// }
//     // service:process.env.SMPT_SERVICE
//   });

  // const mailOptions = {
  //   from: process.env.SMPT_MAIL,
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  // };

//   await transporter.sendMail(mailOptions);
// };

exports.mail1 =  async function(options){
  

  //const nodemailer=require('nodemailer') 
  
  //const {google} = require('googleapis');
  
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");
 
  const CLIENT_ID=process.env.CLIENT_ID;
  const CLIENT_SECRET=process.env.CLIENT_SECRET;
  const REDIRECT_URI=process.env.REDIRECT_URI;
  const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
  
  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
  oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})
  // oAuth2Client.credentials = credentials; 
  console.log(oAuth2Client);
  
     try{
      const accessToken= await oAuth2Client.getAccessToken()
      
      const transport=nodemailer.createTransport({
        service:'gmail',
        auth: {
          type :'OAuth2',
          user:process.env.EMAIL,
          clientId:CLIENT_ID,
          clientSecret:CLIENT_SECRET,
          refreshToken:REFRESH_TOKEN,
          accessToken:accessToken,
        }
      }
      )
      // console.log(link)
      const mailOptions={
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  
      const result=  await transport.sendMail(mailOptions)
      return result
  
     }
     catch(error) {
      return error
  }
  // sendMail(link,email)
  // .then((result) => console.log('Email sent successfully.....',result))
  // .catch((error) => console.log(error.message));
  
  
  };