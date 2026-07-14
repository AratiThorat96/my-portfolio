import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Achievement from '../models/Achievement.js';
import Message from '../models/Message.js';
import Activity from '../models/Activity.js';

export const getDashboardStats = async (_req, res) => {
  try {
    const [
      totalProjects,
      totalCertificates,
      totalAchievements,
      totalMessages,
      unreadMessages,
      featuredProjects,
      latestActivity,
    ] = await Promise.all([
      Project.countDocuments(),
      Certificate.countDocuments(),
      Achievement.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: 'Unread' }),
      Project.countDocuments({ featured: true }),
      Activity.find().sort({ createdAt: -1 }).limit(10),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        totalCertificates,
        totalAchievements,
        totalMessages,
        unreadMessages,
        featuredProjects,
        latestActivity,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { getDashboardStats };
