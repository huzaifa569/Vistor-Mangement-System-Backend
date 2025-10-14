import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load .env
dotenv.config();

const sendEmail = async ({to, subject, html, attachments}) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transport.sendMail({
        from: `"VMS System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        attachments,
    });
};

export default sendEmail;