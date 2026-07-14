import Message from '../models/Message.js';
import { csvEscape } from '../utils/fileUtils.js';
import { sendAdminNotificationEmail, sendConfirmationEmail, sendReplyEmail } from '../utils/emailService.js';
import logActivity from '../utils/activityLogger.js';

const allowedStatuses = ['Unread', 'Read', 'Replied'];

const buildQuery = (query) => {
  const filter = {};
  if (query.status && query.status !== 'All') filter.status = query.status;
  if (query.keyword || query.search) {
    const keyword = query.keyword || query.search;
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
      { subject: { $regex: keyword, $options: 'i' } },
      { message: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }
  return filter;
};

export const getAllMessages = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const skip = (page - 1) * limit;
    const filter = buildQuery(req.query);
    const [messages, total] = await Promise.all([
      Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Message.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const subject = req.body.subject?.trim() || 'Portfolio contact';
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    const [confirmationSent, adminNotified] = await Promise.all([
      sendConfirmationEmail({ name, email, subject }),
      sendAdminNotificationEmail({ name, email, subject, message }),
    ]);

    await logActivity({ action: 'received', entity: 'message', entityId: newMessage._id, actor: email, details: subject });
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      emailSent: confirmationSent && adminNotified,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const status = allowedStatuses.includes(req.body.status) ? req.body.status : null;
    if (!status) return res.status(400).json({ success: false, message: 'Invalid message status' });

    const message = await Message.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });

    await logActivity({ action: `marked ${status.toLowerCase()}`, entity: 'message', entityId: message._id, actor: req.admin?.email, details: message.subject });
    res.status(200).json({ success: true, message: 'Message status updated', data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const replyToMessage = async (req, res) => {
  try {
    const reply = req.body.reply?.trim();
    const subject = req.body.subject?.trim();
    if (!reply) return res.status(400).json({ success: false, message: 'Reply message is required' });

    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });

    const sent = await sendReplyEmail({ to: message.email, name: message.name, subject: subject || `Re: ${message.subject}`, reply });
    message.status = 'Replied';
    await message.save();
    await logActivity({ action: 'replied', entity: 'message', entityId: message._id, actor: req.admin?.email, details: message.subject });
    res.status(200).json({ success: true, message: sent ? 'Reply sent successfully' : 'Reply saved, but email is not configured', sent, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
    await logActivity({ action: 'deleted', entity: 'message', entityId: message._id, actor: req.admin?.email, details: message.subject });
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportMessagesCsv = async (_req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  const rows = [['Name', 'Email', 'Subject', 'Status', 'Message', 'Created At']];
  messages.forEach((message) => {
    rows.push([message.name, message.email, message.subject, message.status, message.message, message.createdAt?.toISOString()]);
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('messages.csv');
  res.send(rows.map((row) => row.map(csvEscape).join(',')).join('\n'));
};

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
  exportMessagesCsv,
};
