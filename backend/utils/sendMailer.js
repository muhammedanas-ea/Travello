import nodemailer from "nodemailer";

// SEND MAILER FUCTION SECTION

export const sendMailer = async (name, email, url, text) => {
  let content;
  if (text === "Travello verify email") {
    content = `<div>
                    <h1>Travello<h1>
                    <p>Hi ${name}</p>
                    <p>
                        Thank you for choosing Travello. 
                        This email is a verification message.
                        Please click the link below to verify your email.
                        The link will remain valid for 2 minutes.
                    </p>
                    <a href=${url}>Verify Email</a>
                </div>`;
  } else if (text === "Travello reset password mail") {
    content = `<div>
                    <h1>Travello<h1>
                    <p>Hi ${name}</p>
                    <p>
                        Thank you for choosing Travello. 
                        This email is a forgot password verification message.
                        Please click the link below to verify your email.
                        The link will remain valid for 2 minutes.
                    </p>
                    <a href=${url}>Verify Email</a>
                </div>`;
  } else if (text === "Travello property owner otp verification") {
    content = `<p>Hi ${name}, this is travello signup verification  OTP: ${url}</p>`;
  } else if (text === "Travello admin approve property") {
    content = `<p>Hi ${url}, travello admin approve your ${name} property </p>`;
  } else if (text === "Travello admin reject property") {
    content = `<p>Hi ${url}, travello admin reject your ${name} property </p>`;
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    secure: false,
    requireTLS: true,
    port: 2525,
    auth: {
      user: process.env.Owner_email,
      pass: process.env.Owner_password,
    },
  });

  const message = {
    from: `Travello ${process.env.Owner_email}`,
    to: email,
    subject: text,
    html: content,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err, "is not working");
    } else {
      console.log("email send");
    }
  });
};
