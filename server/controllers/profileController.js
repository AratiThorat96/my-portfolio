import Profile from '../models/Profile.js';
import { seedProfile } from '../data/portfolioSeed.js';
import { deleteLocalUpload, toPublicUploadPath } from '../utils/fileUtils.js';
import logActivity from '../utils/activityLogger.js';

const parseStructuredField = (value, fallback) => {
  if (value === undefined) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeSeedProfile = () => ({
  ...seedProfile,
  name: seedProfile.fullName,
});

const getUploadedFiles = (req, fieldName) => {
  if (Array.isArray(req.files)) {
    return req.files.filter((file) => file.fieldname === fieldName);
  }

  return req.files?.[fieldName] || [];
};

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(normalizeSeedProfile());
    } else if (!profile.name) {
      profile.name = profile.fullName || seedProfile.fullName;
      await profile.save();
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile(normalizeSeedProfile());

    const profileImageFile = getUploadedFiles(req, 'profileImage')[0];
    const resumeFile = getUploadedFiles(req, 'resume')[0];
    const resumeFiles = getUploadedFiles(req, 'resumeFiles');
    const oldProfileImage = profile.profileImage;
    const oldResume = profile.resumeUrl;
    const oldResumeLinks = new Set((profile.resumes || []).map((resume) => resume.href).filter(Boolean));
    const socialLinks = parseStructuredField(req.body.socialLinks, profile.socialLinks || {});
    const skills = parseStructuredField(req.body.skills, profile.skills || []);
    const education = parseStructuredField(req.body.education, profile.education || []);
    const resumes = parseStructuredField(req.body.resumes, profile.resumes || []);

    profile.name = req.body.name || req.body.fullName || profile.name;
    profile.title = req.body.title || profile.title;
    profile.bio = req.body.bio || profile.bio;
    profile.email = req.body.email || profile.email;
    profile.phone = req.body.phone || profile.phone;
    profile.location = req.body.location || profile.location;
    profile.about = req.body.about || profile.about;
    profile.resumeUrl = resumeFile ? toPublicUploadPath(resumeFile) : (req.body.resumeUrl || profile.resumeUrl);
    profile.profileImage = profileImageFile ? toPublicUploadPath(profileImageFile) : (req.body.profileImage || profile.profileImage);
    profile.socialLinks = {
      ...profile.socialLinks,
      ...socialLinks,
      github: req.body.github || socialLinks.github || profile.socialLinks?.github || '',
      linkedin: req.body.linkedin || socialLinks.linkedin || profile.socialLinks?.linkedin || '',
    };
    profile.skills = Array.isArray(skills) ? skills : profile.skills;
    profile.education = Array.isArray(education) ? education : profile.education;
    if (Array.isArray(resumes)) {
      profile.resumes = resumes
        .map((resume) => {
          const uploadedFile = Number.isInteger(resume.fileIndex) ? resumeFiles[resume.fileIndex] : null;
          return {
            id: resume.id || resume.domain || resume.label || '',
            domain: resume.domain || '',
            label: resume.label || '',
            href: uploadedFile ? toPublicUploadPath(uploadedFile) : (resume.href || ''),
          };
        })
        .filter((resume) => resume.label && resume.href);
    }

    await profile.save();
    if (profileImageFile && oldProfileImage !== profile.profileImage) deleteLocalUpload(oldProfileImage);
    if (resumeFile && oldResume !== profile.resumeUrl) deleteLocalUpload(oldResume);
    if (Array.isArray(resumes)) {
      const nextResumeLinks = new Set((profile.resumes || []).map((resume) => resume.href).filter(Boolean));
      oldResumeLinks.forEach((href) => {
        if (!nextResumeLinks.has(href)) deleteLocalUpload(href);
      });
    }

    await logActivity({ action: 'updated', entity: 'profile', entityId: profile._id, actor: req.admin?.email, details: profile.name });
    res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const incrementResumeDownload = async (_req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, { $inc: { resumeDownloads: 1 } }, { new: true, upsert: true });
    res.status(200).json({ success: true, resumeDownloads: profile.resumeDownloads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const incrementVisitorCount = async (_req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, { $inc: { visitorCount: 1 } }, { new: true, upsert: true });
    res.status(200).json({ success: true, visitorCount: profile.visitorCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getProfile,
  updateProfile,
  incrementResumeDownload,
  incrementVisitorCount,
};
