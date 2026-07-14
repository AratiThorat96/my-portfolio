import Certificate, { CERTIFICATE_DOMAINS } from '../models/Certificate.js';
import { csvEscape, deleteLocalUpload, toPublicUploadPath } from '../utils/fileUtils.js';
import logActivity from '../utils/activityLogger.js';

const parseList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parseList(parsed);
    } catch {
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }
  return [];
};

const buildPayload = (body, file, existing = null) => {
  const certificateImage = file ? toPublicUploadPath(file) : (body.certificateImage || body.image);

  return {
    title: body.title?.trim(),
    organization: body.organization?.trim() || body.provider?.trim(),
    domain: CERTIFICATE_DOMAINS.includes(body.domain) ? body.domain : existing?.domain || 'Other',
    certificateImage: certificateImage || existing?.certificateImage || 'https://via.placeholder.com/400x300?text=Certificate',
    credentialUrl: body.credentialUrl ?? existing?.credentialUrl ?? '',
    issueDate: body.issueDate || existing?.issueDate || new Date(),
    expiryDate: body.expiryDate || existing?.expiryDate || null,
    skills: body.skills !== undefined ? parseList(body.skills) : existing?.skills,
  };
};

const buildQuery = (query) => {
  const filter = {};
  if (query.domain && query.domain !== 'All') filter.domain = query.domain;
  if (query.keyword || query.search) {
    const keyword = query.keyword || query.search;
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { organization: { $regex: keyword, $options: 'i' } },
      { skills: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }
  return filter;
};

export const getAllCertificates = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const skip = (page - 1) * limit;
    const filter = buildQuery(req.query);
    const [certificates, total] = await Promise.all([
      Certificate.find(filter).sort({ issueDate: -1, createdAt: -1 }).skip(skip).limit(limit),
      Certificate.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      certificates,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
      domains: CERTIFICATE_DOMAINS,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ success: false, message: 'Certificate not found' });
    res.status(200).json({ success: true, certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(buildPayload(req.body, req.file));
    await logActivity({ action: 'created', entity: 'certificate', entityId: certificate._id, actor: req.admin?.email, details: certificate.title });
    res.status(201).json({ success: true, message: 'Certificate created successfully', certificate });
  } catch (error) {
    if (req.file) deleteLocalUpload(toPublicUploadPath(req.file));
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ success: false, message: 'Certificate not found' });

    const oldImage = certificate.certificateImage;
    Object.assign(certificate, buildPayload(req.body, req.file, certificate));
    await certificate.save();
    if (req.file && oldImage !== certificate.certificateImage) deleteLocalUpload(oldImage);

    await logActivity({ action: 'updated', entity: 'certificate', entityId: certificate._id, actor: req.admin?.email, details: certificate.title });
    res.status(200).json({ success: true, message: 'Certificate updated successfully', certificate });
  } catch (error) {
    if (req.file) deleteLocalUpload(toPublicUploadPath(req.file));
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ success: false, message: 'Certificate not found' });
    deleteLocalUpload(certificate.certificateImage);
    await Certificate.findByIdAndDelete(req.params.id);
    await logActivity({ action: 'deleted', entity: 'certificate', entityId: certificate._id, actor: req.admin?.email, details: certificate.title });
    res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const exportCertificatesCsv = async (_req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  const rows = [['Title', 'Organization', 'Domain', 'Skills', 'Credential URL', 'Issue Date', 'Created At']];
  certificates.forEach((certificate) => {
    rows.push([
      certificate.title,
      certificate.organization,
      certificate.domain,
      certificate.skills.join(', '),
      certificate.credentialUrl,
      certificate.issueDate?.toISOString(),
      certificate.createdAt?.toISOString(),
    ]);
  });
  res.header('Content-Type', 'text/csv');
  res.attachment('certificates.csv');
  res.send(rows.map((row) => row.map(csvEscape).join(',')).join('\n'));
};

export default {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  exportCertificatesCsv,
};
