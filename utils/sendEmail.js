import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load .env
dotenv.config();

const sendEmail = async ({to, subject, html, attachments}) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatimafahad9080@gmail.com",
            pass: "jkfm kklz uwxx qoca",
        },
    });

    await transport.sendMail({
        from: `"VMS System" <fatimafahad9080@gmail.com>`,
        to,
        subject,
        html,
        attachments,
    });
};

export default sendEmail;