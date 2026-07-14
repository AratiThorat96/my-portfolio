import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '../uploads');

export const toPublicUploadPath = (file) => {
  if (!file) {
    return '';
  }

  const relative = path.relative(uploadsRoot, file.path).split(path.sep).join('/');
  return `/uploads/${relative}`;
};

export const deleteLocalUpload = (fileUrl) => {
  if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
    return;
  }

  const safeRelative = fileUrl.replace('/uploads/', '').replace(/\.\./g, '');
  const absolutePath = path.join(uploadsRoot, safeRelative);

  if (absolutePath.startsWith(uploadsRoot) && fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

export const csvEscape = (value) => {
  const text = value === undefined || value === null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};
