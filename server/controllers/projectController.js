import Project, { PROJECT_DOMAINS } from '../models/Project.js';
import { csvEscape, deleteLocalUpload, toPublicUploadPath } from '../utils/fileUtils.js';
import logActivity from '../utils/activityLogger.js';

const parseList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parseList(parsed);
      }
    } catch {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  return [];
};

const parseBoolean = (value) => value === true || String(value).toLowerCase() === 'true';

const buildProjectPayload = (body, file, existingProject = null) => {
  const image = file ? toPublicUploadPath(file) : body.image;
  const domain = PROJECT_DOMAINS.includes(body.domain) ? body.domain : (body.category || existingProject?.domain || 'Other');

  return {
    title: body.title?.trim(),
    description: body.description?.trim(),
    domain,
    technologies: body.technologies !== undefined ? parseList(body.technologies) : existingProject?.technologies,
    githubUrl: body.githubUrl ?? body.githubLink ?? existingProject?.githubUrl ?? '',
    liveUrl: body.liveUrl ?? body.liveLink ?? existingProject?.liveUrl ?? '',
    image: image || existingProject?.image || 'https://via.placeholder.com/400x300?text=Project',
    startDate: body.startDate || existingProject?.startDate || null,
    endDate: body.endDate || existingProject?.endDate || null,
    featured: body.featured !== undefined ? parseBoolean(body.featured) : existingProject?.featured || false,
  };
};

const buildQuery = (query) => {
  const filter = {};

  if (query.domain && query.domain !== 'All') {
    filter.domain = query.domain;
  }

  if (query.featured !== undefined) {
    filter.featured = parseBoolean(query.featured);
  }

  if (query.keyword || query.search) {
    const keyword = query.keyword || query.search;
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { technologies: { $regex: keyword, $options: 'i' } },
    ];
  }

  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }

  return filter;
};

export const getAllProjects = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const skip = (page - 1) * limit;
    const filter = buildQuery(req.query);

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      projects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
      domains: PROJECT_DOMAINS,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(buildProjectPayload(req.body, req.file));
    await logActivity({ action: 'created', entity: 'project', entityId: project._id, actor: req.admin?.email, details: project.title });
    res.status(201).json({ success: true, message: 'Project created successfully', project });
  } catch (error) {
    if (req.file) deleteLocalUpload(toPublicUploadPath(req.file));
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const oldImage = project.image;
    Object.assign(project, buildProjectPayload(req.body, req.file, project));
    await project.save();

    if (req.file && oldImage !== project.image) {
      deleteLocalUpload(oldImage);
    }

    await logActivity({ action: 'updated', entity: 'project', entityId: project._id, actor: req.admin?.email, details: project.title });
    res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    if (req.file) deleteLocalUpload(toPublicUploadPath(req.file));
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    deleteLocalUpload(project.image);
    await Project.findByIdAndDelete(req.params.id);
    await logActivity({ action: 'deleted', entity: 'project', entityId: project._id, actor: req.admin?.email, details: project.title });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportProjectsCsv = async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  const rows = [['Title', 'Domain', 'Technologies', 'GitHub', 'Live URL', 'Featured', 'Created At']];
  projects.forEach((project) => {
    rows.push([
      project.title,
      project.domain,
      project.technologies.join(', '),
      project.githubUrl,
      project.liveUrl,
      project.featured,
      project.createdAt?.toISOString(),
    ]);
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('projects.csv');
  res.send(rows.map((row) => row.map(csvEscape).join(',')).join('\n'));
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  exportProjectsCsv,
};
