import Activity from '../models/Activity.js';

export const logActivity = async ({ action, entity, entityId = null, actor = 'system', details = '' }) => {
  try {
    await Activity.create({ action, entity, entityId, actor, details });
  } catch (error) {
    console.error('Activity log error:', error.message);
  }
};

export default logActivity;
