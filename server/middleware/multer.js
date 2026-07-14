import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, '../uploads');
const uploadFolders = ['projects', 'certificates', 'profile', 'resume'];

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

uploadFolders.forEach((folder) => {
  const directory = path.join(uploadDirectory, folder);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
});

const getDestinationFolder = (req, file) => {
  if (file.fieldname === 'resume' || file.mimetype === 'application/pdf') {
    return 'resume';
  }

  if (file.fieldname === 'certificateImage' || req.baseUrl.includes('certificates')) {
    return 'certificates';
  }

  if (file.fieldname === 'profileImage' || req.baseUrl.includes('profile')) {
    return 'profile';
  }

  return 'projects';
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(uploadDirectory, getDestinationFolder(req, file)));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    const isResume = file.fieldname === 'resume' || file.mimetype === 'application/pdf';

    if (isResume && ext === '.pdf') {
      cb(null, true);
      return;
    }

    if (allowedExtensions.includes(ext)) {
      cb(null, true);
      return;
    }

    cb(new Error('Only jpg, jpeg, png, webp images are allowed. Resume uploads must be PDF.'), false);
  },
});

export default upload;
