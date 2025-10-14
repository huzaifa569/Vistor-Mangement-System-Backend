import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  // Validate inputs
  if (!to) throw new Error("Recipient email (to) is required");
  if (!subject) throw new Error("Email subject is required");

  // Use environment variables for security
  const emailUser = "fatimafahad9080@gmail.com"
  const emailPass = "jkfm kklz uwxx qoca"

  if (!emailUser || !emailPass) {
    throw new Error("Email credentials are not configured properly. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.");
  }

  // Create transporter
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Additional options for better reliability
    pool: true,
    maxConnections: 1,
    rateDelta: 1000,
    rateLimit: 5
  });

  try {
    // Verify SMTP connection
    await transport.verify();
    console.log('✓ SMTP connected successfully');
  } catch (error) {
    console.error('✗ SMTP Connection failed:', error.message);
    throw new Error("SMTP connection failed. Check Gmail credentials or App Password.");
  }

  try {
    // Send email
    const mailOptions = {
      from: `"VMS System" <${emailUser}>`,
      to: Array.isArray(to) ? to : [to], // Handle both single and multiple recipients
      subject: subject.trim(),
      html: html,
      attachments: attachments,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("✓ Email sent successfully to:", to);
    console.log("✓ Message ID:", result.messageId);
    
    return result;
  } catch (error) {
    console.error("✗ Email sending failed:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  } finally {
    // Close the transporter
    transport.close();
  }
};

export default sendEmail;