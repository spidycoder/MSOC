import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST,
  // port: Number(process.env.SMTP_PORT),
  // secure: false,
  // pool: true,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS,
  // },
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: "spidycoder11@outlook.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<string | null> => {
  const info = await transporter.sendMail({
    from: "spidycoder11@outlook.com",
    to: to,
    subject: subject,
    html: html,
  });
  console.log("Email-Info ", info);

  return info?.messageId;
};
