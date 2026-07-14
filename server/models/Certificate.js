import mongoose from 'mongoose';

export const CERTIFICATE_DOMAINS = [
  'Full Stack Developer',
  'Frontend Developer',
  'App Developer',
  'Java Developer',
  'Cyber Security',
  'Data Analyst',
  'Other',
];

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Certificate organization is required'],
      trim: true,
    },
    domain: {
      type: String,
      enum: CERTIFICATE_DOMAINS,
      default: 'Other',
    },
    issueDate: {
      type: Date,
      required: [true, 'Issue date is required'],
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    credentialUrl: {
      type: String,
      default: '',
    },
    certificateImage: {
      type: String,
      required: [true, 'Certificate image is required'],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

certificateSchema.virtual('provider').get(function getProvider() {
  return this.organization;
});

certificateSchema.virtual('image').get(function getImage() {
  return this.certificateImage;
});

certificateSchema.set('toJSON', { virtuals: true });
certificateSchema.set('toObject', { virtuals: true });

certificateSchema.index({ title: 'text', organization: 'text', skills: 'text' });
certificateSchema.index({ domain: 1 });
certificateSchema.index({ createdAt: -1 });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
