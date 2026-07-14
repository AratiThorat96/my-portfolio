import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  exportProjectsCsv,
} from '../controllers/projectController.js';
import authenticateToken from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/export/csv', authenticateToken, exportProjectsCsv);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createProject);
router.put('/:id', authenticateToken, upload.single('image'), updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router;
