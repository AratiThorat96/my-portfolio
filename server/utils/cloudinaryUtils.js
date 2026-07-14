import path from 'path';
import cloudinary from '../config/cloudinary.js';

const isCloudinaryConfigured = () => (
  Boolean(process.env.CLOUDINARY_NAME) &&
  Boolean(process.env.CLOUDINARY_API_KEY) &&
  Boolean(process.env.CLOUDINARY_API_SECRET)
);

const getLocalUploadUrl = (filePath) => {
  const fileName = path.basename(filePath);
  return `/uploads/${fileName}`;
};

export const uploadImage = async (filePath) => {
  if (!filePath) {
    throw new Error('Image file path is required');
  }

  if (!isCloudinaryConfigured()) {
    return {
      url: getLocalUploadUrl(filePath),
      publicId: null,
    };
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'myportfolio',
      resource_type: 'auto',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error.message);
    return {
      url: getLocalUploadUrl(filePath),
      publicId: null,
    };
  }
};

export const deleteImage = async (publicId) => {
  if (!publicId || !isCloudinaryConfigured()) {
    return true;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
    return false;
  }
};

export default {
  uploadImage,
  deleteImage,
};
