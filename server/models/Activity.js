import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    entity: {
      type: String,
      required: true,
      trim: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    actor: {
      type: String,
      default: 'system',
      trim: true,
    },
    details: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

activitySchema.index({ createdAt: -1 });
activitySchema.index({ entity: 1 });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
