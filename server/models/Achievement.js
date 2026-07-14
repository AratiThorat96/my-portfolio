import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Achievement description is required'],
    },
    category: {
      type: String,
      default: 'Achievement',
      trim: true,
    },
    organization: {
      type: String,
      default: '',
      trim: true,
    },
    achievementDate: {
      type: Date,
      default: null,
    },
    proofUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

achievementSchema.index({ title: 'text', description: 'text', category: 'text', organization: 'text' });
achievementSchema.index({ achievementDate: -1, createdAt: -1 });

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
