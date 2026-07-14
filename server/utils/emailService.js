import nodemailer from 'nodemailer';

const isEmailConfigured = () => (
  Boolean(process.env.EMAIL_USER) && Boolean(process.env.EMAIL_PASS)
);

const getTransporter = () => {
  if (!isEmailConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (to, subject, html) => {
  const transporter = getTransporter();

  if (!transporter) {
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email sending error:', error.message);
    return false;
  }
};

export const sendContactFormEmail = async (name, email, message) => {
  return sendAdminNotificationEmail({ name, email, subject: 'Portfolio contact', message });
};

export const sendAdminNotificationEmail = async ({ name, email, subject, message }) => {
  if (!process.env.EMAIL_USER) {
    return false;
  }

  return sendEmail(
    process.env.EMAIL_USER,
    `New Contact: ${subject || name}`,
    `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  );
};

export const sendConfirmationEmail = async ({ name, email, subject }) => {
  return sendEmail(
    email,
    'Thanks for contacting me',
    `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out about "${subject}". I received your message and will get back to you soon.</p>
      <p>Regards,<br/>Portfolio Admin</p>
    `
  );
};

export const sendReplyEmail = async ({ to, name, subject, reply }) => {
  return sendEmail(
    to,
    subject,
    `
      <p>Hi ${name},</p>
      <p>${reply.replace(/\n/g, '<br/>')}</p>
      <p>Regards,<br/>Portfolio Admin</p>
    `
  );
};

export default sendEmail;
