import Admin from '../models/Admin.js';
import { comparePassword, hashPassword } from './authUtils.js';

const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    console.warn('Default admin credentials are not configured. Skipping admin seed.');
    return;
  }

  const existingAdmin = await Admin.findOne({ email }).select('+password');
  if (existingAdmin) {
    const passwordMatches = await comparePassword(password, existingAdmin.password);

    if (!passwordMatches) {
      existingAdmin.password = await hashPassword(password);
      existingAdmin.fullName = existingAdmin.fullName || 'Admin';
      await existingAdmin.save();
      console.log(`Default admin password synchronized for ${email}`);
    }

    return;
  }

  const hashedPassword = await hashPassword(password);

  await Admin.create({
    email,
    password: hashedPassword,
    fullName: 'Admin',
  });

  console.log(`Default admin account created for ${email}`);
};

export default ensureDefaultAdmin;
