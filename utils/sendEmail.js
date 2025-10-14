import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fatimafahad9080@gmail.com", // Gmail
        pass: "wddl ujrg tneo jrat", // App Password (correct format)
      },
    });

    const mailOptions = {
      from: `"VMS System" <fatimafahad9080@gmail.com>`,
      to, 
      subject,
      html,
      attachments: Array.isArray(attachments) ? attachments : [],
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.error("Email sending error:", error.message || error);
    throw new Error(error.message || "Failed to send email");
  }
};

export default sendEmail;
