import express from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
  exportMessagesCsv,
} from '../controllers/messageController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/', createMessage);

// Protected routes
router.get('/', authenticateToken, getAllMessages);
router.get('/export/csv', authenticateToken, exportMessagesCsv);
router.get('/:id', authenticateToken, getMessageById);
router.put('/:id', authenticateToken, updateMessageStatus);
router.post('/:id/reply', authenticateToken, replyToMessage);
router.delete('/:id', authenticateToken, deleteMessage);

export default router;
