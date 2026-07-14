import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    subject: {
      type: String,
      default: 'Portfolio contact',
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: 10,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Replied'],
      default: 'Unread',
    },
    isSpam: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messageSchema.index({ name: 'text', email: 'text', subject: 'text', message: 'text' });
messageSchema.index({ email: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);
export default Message;
