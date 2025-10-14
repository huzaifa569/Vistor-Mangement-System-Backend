import nodemailer from 'nodemailer';

const sendEmail = async ({to, subject, html, attachments}) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "fatimafahad9080@gmail.com",
            pass: "tfss bqcl xvgv gbey",
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