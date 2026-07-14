import express from 'express';
import {
  getProfile,
  updateProfile,
  incrementResumeDownload,
  incrementVisitorCount,
} from '../controllers/profileController.js';
import authenticateToken from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Public route
router.get('/', getProfile);
router.post('/resume-download', incrementResumeDownload);
router.post('/visit', incrementVisitorCount);

// Protected route
router.put('/', authenticateToken, upload.any(), updateProfile);

export default router;
