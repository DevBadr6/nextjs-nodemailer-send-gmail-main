import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default function sendmail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  });

  //管理人が受け取るメール
  const toHostMailData = {
    from: `${req.body.email}`,
    to: "badrtdi101@gmail.com",
    subject: `【inquiry】${req.body.name} From`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `
      <p> 【name】 </p>
      <p>${req.body.name}</p>
      <p>【message】</p>
      <p>${req.body.message}</p>
      <p>【email】</p>
      <p>${req.body.email}</p>
    `,
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  res.send("success");
}
