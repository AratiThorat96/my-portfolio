import express from 'express';
import { registerAdmin, loginAdmin, refreshAuth, checkAuth } from '../controllers/authController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/refresh', refreshAuth);
router.get('/me', authenticateToken, checkAuth);

export default router;
