import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load .env
dotenv.config();

const sendEmail = async ({ to, subject, html, attachments }) => {
    // ✅ Ensure recipient is always defined
    const recipient = to || "fatimafahad9080@gmail.com";
    
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatimafahad9080@gmail.com",
            pass: "jkfm kklz uwxx qoca",
        },
    });

    await transport.sendMail({
        from: `"VMS System" <fatimafahad9080@gmail.com>`,
        to: recipient, // ✅ Use the validated recipient
        subject,
        html,
        attachments,
    });
};

export default sendEmail;