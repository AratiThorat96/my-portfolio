import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
    },
    title: {
      type: String,
      default: 'Full Stack Developer',
    },
    bio: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: 'https://via.placeholder.com/400x400?text=Profile',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    resumes: [
      {
        id: { type: String, default: '' },
        domain: { type: String, default: '' },
        label: { type: String, default: '' },
        href: { type: String, default: '' },
      },
    ],
    resumeDownloads: {
      type: Number,
      default: 0,
    },
    visitorCount: {
      type: Number,
      default: 0,
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      portfolio: { type: String, default: '' },
    },
    skills: [
      {
        category: String,
        items: [String],
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    about: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

profileSchema.virtual('fullName').get(function getFullName() {
  return this.name;
});

profileSchema.virtual('github').get(function getGithub() {
  return this.socialLinks?.github || '';
});

profileSchema.virtual('linkedin').get(function getLinkedin() {
  return this.socialLinks?.linkedin || '';
});

profileSchema.set('toJSON', { virtuals: true });
profileSchema.set('toObject', { virtuals: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
