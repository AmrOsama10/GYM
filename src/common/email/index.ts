import * as nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
}: nodemailer.SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: ` "Gym" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};
