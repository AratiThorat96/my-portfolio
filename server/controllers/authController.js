import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword, generateRefreshToken, generateToken } from '../utils/authUtils.js';

const isDefaultAdminCredentials = (email, password) => {
  const defaultEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const defaultPassword = process.env.ADMIN_PASSWORD?.trim();

  return Boolean(
    email &&
    password &&
    defaultEmail &&
    defaultPassword &&
    email === defaultEmail &&
    password === defaultPassword
  );
};

export const registerAdmin = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();
    const fullName = req.body.fullName?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists with this email',
      });
    }

    const hashedPassword = await hashPassword(password);
    admin = new Admin({
      email,
      password: hashedPassword,
      fullName,
    });

    await admin.save();
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();
    const isDefaultAdmin = isDefaultAdminCredentials(email, password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    let admin = await Admin.findOne({ email }).select('+password');
    if (!admin && isDefaultAdmin) {
      admin = await Admin.create({
        email,
        password: await hashPassword(password),
        fullName: 'Admin',
      });
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    let isPasswordCorrect = await comparePassword(password, admin.password);
    if (!isPasswordCorrect && isDefaultAdmin) {
      admin.password = await hashPassword(password);
      await admin.save();
      isPasswordCorrect = true;
    }

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(admin);
    const refreshToken = generateRefreshToken(admin);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      admin: {
        id: admin._id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshAuth = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(admin),
      refreshToken: generateRefreshToken(admin),
    });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  registerAdmin,
  loginAdmin,
  refreshAuth,
  checkAuth,
};
