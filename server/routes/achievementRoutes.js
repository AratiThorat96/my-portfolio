import express from 'express';
import {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  exportAchievementsCsv,
} from '../controllers/achievementController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllAchievements);
router.get('/export/csv', authenticateToken, exportAchievementsCsv);
router.get('/:id', getAchievementById);
router.post('/', authenticateToken, createAchievement);
router.put('/:id', authenticateToken, updateAchievement);
router.delete('/:id', authenticateToken, deleteAchievement);

export default router;
