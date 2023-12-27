// import User from "@/lib/models/users.model";
// import { connectDB } from "@/lib/mongoose";
// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import { sendEmail } from "@/config/mail";
// import { render } from "@react-email/render";
// import ForgetPasswordEmail from "@/emails/ForgetPasswordEmail";
// import { Resend } from "resend";

// export const POST = async (request: any) => {
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   const { email } = await request.json();
//   await connectDB();

//   const existingUser = await User.findOne({ email });
//   if (!existingUser) {
//     return new NextResponse("User is not registered", { status: 400 });
//   }
//   //this token will be sent in email to the user for reseting password
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   //this token will be stored in the database
//   const passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   const passwordResetExpires = Date.now() + 3600000;
//   existingUser.resetToken = passwordResetToken;
//   existingUser.resetTokenExpiry = passwordResetExpires;
//   await existingUser.save();
//   //this url will be sent to user
//   const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;
//   console.log("Reset Url ", resetUrl);

//   try {
//     // const html = render(
//     //   ForgetPasswordEmail({
//     //     params: {
//     //       name1: existingUser.firstName,
//     //       name2: existingUser.lastName,
//     //       url: resetUrl,
//     //     },
//     //   })
//     // );
//     // await sendEmail(email, "Reset Password", html);
//     const { data } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: ["kumaraditya767718@gmail.com", email],
//       subject: "Reset Password",
//       react: ForgetPasswordEmail({
//         params: {
//           name1: existingUser.firstName,
//           name2: existingUser.lastName,
//           url: resetUrl,
//         },
//       }),
//     });
//     return new NextResponse("Email Sent successfully.", { status: 200 });
//   } catch (error: any) {
//     console.error(error);
//     return new NextResponse("Error while Sending Email", { status: 500 });
//   }
// };
