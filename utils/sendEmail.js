import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    if (!to) throw new Error("Recipient email (to) is required");
    if (!subject) throw new Error("Email subject is required");

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fatimafahad9080@gmail.com",
        pass: "pfxh pdez ldqd qllc", 
      },
    });

    const mailOptions = {
      from: {
        name: 'VMS System',
        address: 'fatimafahad9080@gmail.com'
      },
      to: "fatimafahad9080@gmail.com", 
      subject,
      html,
      attachments,
      replyTo: 'fatimafahad9080@gmail.com'
    };

    const response = await transport.sendMail(mailOptions);
    console.log('Email sent to Fatima:', response.messageId);
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default sendEmail;