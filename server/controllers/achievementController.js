import Achievement from '../models/Achievement.js';
import { csvEscape } from '../utils/fileUtils.js';
import logActivity from '../utils/activityLogger.js';

const buildAchievementPayload = (body, existingAchievement = null) => ({
  title: body.title?.trim(),
  description: body.description?.trim(),
  category: body.category?.trim() || existingAchievement?.category || 'Achievement',
  organization: body.organization?.trim() || '',
  achievementDate: body.achievementDate || existingAchievement?.achievementDate || null,
  proofUrl: body.proofUrl || existingAchievement?.proofUrl || '',
  order: Number(body.order ?? existingAchievement?.order ?? 0),
});

const buildQuery = (query) => {
  const filter = {};

  if (query.keyword || query.search) {
    const keyword = query.keyword || query.search;
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
      { organization: { $regex: keyword, $options: 'i' } },
    ];
  }

  return filter;
};

export const getAllAchievements = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const skip = (page - 1) * limit;
    const filter = buildQuery(req.query);

    const [achievements, total] = await Promise.all([
      Achievement.find(filter).sort({ order: 1, achievementDate: -1, createdAt: -1 }).skip(skip).limit(limit),
      Achievement.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      achievements,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.status(200).json({ success: true, achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(buildAchievementPayload(req.body));
    await logActivity({ action: 'created', entity: 'achievement', entityId: achievement._id, actor: req.admin?.email, details: achievement.title });
    res.status(201).json({ success: true, message: 'Achievement created successfully', achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    Object.assign(achievement, buildAchievementPayload(req.body, achievement));
    await achievement.save();
    await logActivity({ action: 'updated', entity: 'achievement', entityId: achievement._id, actor: req.admin?.email, details: achievement.title });
    res.status(200).json({ success: true, message: 'Achievement updated successfully', achievement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    await Achievement.findByIdAndDelete(req.params.id);
    await logActivity({ action: 'deleted', entity: 'achievement', entityId: achievement._id, actor: req.admin?.email, details: achievement.title });
    res.status(200).json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportAchievementsCsv = async (_req, res) => {
  const achievements = await Achievement.find().sort({ order: 1, achievementDate: -1, createdAt: -1 });
  const rows = [['Title', 'Category', 'Organization', 'Date', 'Proof URL', 'Description']];
  achievements.forEach((achievement) => {
    rows.push([
      achievement.title,
      achievement.category,
      achievement.organization,
      achievement.achievementDate?.toISOString() || '',
      achievement.proofUrl,
      achievement.description,
    ]);
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('achievements.csv');
  res.send(rows.map((row) => row.map(csvEscape).join(',')).join('\n'));
};

export default {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  exportAchievementsCsv,
};
