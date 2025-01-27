import nodemailer from "nodemailer";

export default async function sendConfirmationEmail(
  email: string,
  orderId: number,
  amount: number
) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions1 = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Confirmation",
    text: `Your payment for order #${orderId} of R${amount} has been successfully processed.`,
  };

  const mailOptions2 = {
    from: process.env.EMAIL_USER,
    to: "ntulilindelani4@gmail.com",
    subject: "Order Submitted",
    text: `Order submitted for #${orderId} of R${amount}`,
  };

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
