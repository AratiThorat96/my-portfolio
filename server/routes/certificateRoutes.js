import express from 'express';
import {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  exportCertificatesCsv,
} from '../controllers/certificateController.js';
import authenticateToken from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Public routes
router.get('/', getAllCertificates);
router.get('/export/csv', authenticateToken, exportCertificatesCsv);
router.get('/:id', getCertificateById);

// Protected routes
router.post('/', authenticateToken, upload.single('certificateImage'), createCertificate);
router.put('/:id', authenticateToken, upload.single('certificateImage'), updateCertificate);
router.delete('/:id', authenticateToken, deleteCertificate);

export default router;
