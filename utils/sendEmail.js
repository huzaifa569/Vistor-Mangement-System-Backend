import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load .env
dotenv.config();

const sendEmail = async ({ to = "fatimafahad9080@gmail.com", subject, html, attachments }) => {
    // ✅ Default recipient set to Fatima's email
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatimafahad9080@gmail.com",
            pass: "jkfm kklz uwxx qoca",
        },
    });

    await transport.sendMail({
        from: `"VMS System" <fatimafahad9080@gmail.com>`,
        to: to, // ✅ Use the 'to' parameter instead of hardcoded value
        subject,
        html,
        attachments,
    });
};

export default sendEmail;