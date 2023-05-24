import sendgrid from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export const sendRegistrationMail = (employee, password) => {
try{
  const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: 'fintrak.alert@gmail.com',
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      requireTLS: true,
    });

    const mailOptions = {
      from: 'fintrak.alert@gmail.com',
      to: employee.email,
      subject: 'your account has been created!!',
      html: ` <p> hello </p><strong> ${employee.firstName}, </strong> </br>
            <p> you are registered with ems. your password and user name are given below.</p> </br>
            <strong>user name: </strong> <p> ${employee.email} </p> </br>
            <strong> password: </strong> <p> ${password} </p> </br>
            <p> this is auto generated password after first log-in please change passwod. </p>`,
    };
    console.log('mail sent');
    transporter.sendMail(mailOptions);

}catch(err) {
  console.log(err.message)
}

};

export const sendForgotPasswordMail = (employee, password) => {
try{
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: 'fintrak.alert@gmail.com',
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
      requireTLS: true,
    });

    const mailOptions = {
      to: employee.email,
      from: 'fintrak.alert@gmail.com',
      subject: 'your account has been created!!',
      html: ` <p> hello </p><strong> ${employee.firstName}, </strong> </br>
            <p> your new password and user name are given below.</p> </br>
            <strong>user name: </strong> <p> ${employee.email} </p> </br>
            <strong> password: </strong> <p> ${password} </p> </br>
            <p> this is auto generated password after log-in please change passwod. </p>`,
    };
    console.log('mail sent');
    transporter.sendMail(mailOptions);

    }catch(err) {
  console.log(err.message)
}
};
