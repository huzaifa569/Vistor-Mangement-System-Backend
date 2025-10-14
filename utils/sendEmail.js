import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    // ✅ Validation clear message
    if (!to) throw new Error("Recipient email (to) is required");
    if (!subject) throw new Error("Email subject is required");

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: "fatimafahad9080@gmail.com",
        pass: "gofq bmuw oede lcnt", // ✅ App password only (no gmail login password)
      },
    });

    const mailOptions = {
      from: `"VMS System" <fatimafahad9080@gmail.com>`,
      to, // ✅ Make sure you're sending payload.email as "to" in controller
      subject,
      html,
      attachments,
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error) {
    throw new Error(error.message || "Failed to send email");
  }
};

export default sendEmail;
