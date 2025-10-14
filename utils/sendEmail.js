import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    if (!to) throw new Error("Recipient email (to) is required");
    if (!subject) throw new Error("Email subject is required");

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fatimafahad9080@gmail.com", // Gmail
        pass: "wddl ujrg tneo jrat", // App Password (correct format)
      },
    });

    const mailOptions = {
      from: `"VMS System" <fatimafahad9080@gmail.com>`,
      to, // ✅ Now using dynamic email instead of being forced to your own email
      subject,
      html,
      attachments: Array.isArray(attachments) ? attachments : [], // ✅ Safety check for attachments
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    console.error("Email sending error:", error.message || error);
    throw new Error(error.message || "Failed to send email");
  }
};

export default sendEmail;
