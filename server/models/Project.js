import mongoose from 'mongoose';

export const PROJECT_DOMAINS = [
  'Full Stack Developer',
  'Frontend Developer',
  'App Developer',
  'Java Developer',
  'Cyber Security',
  'Data Analyst',
  'Other',
];

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Project',
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    domain: {
      type: String,
      enum: PROJECT_DOMAINS,
      default: 'Other',
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.virtual('githubLink').get(function getGithubLink() {
  return this.githubUrl;
});

projectSchema.virtual('liveLink').get(function getLiveLink() {
  return this.liveUrl;
});

projectSchema.virtual('category').get(function getCategory() {
  return this.domain;
});

projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });
projectSchema.index({ domain: 1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ featured: -1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
