import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../store/authStore';
import { useDarkMode } from '../hooks/useDarkMode';
import api from '../api/axios';
import { domainProfiles } from '../data/domainProfiles';

const domains = ['All', 'Full Stack Developer', 'Frontend Developer', 'App Developer', 'Java Developer', 'Cyber Security', 'Data Analyst', 'Other'];
const statuses = ['All', 'Unread', 'Read', 'Replied'];

const emptyProject = {
  title: '',
  description: '',
  domain: 'Full Stack Developer',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
  image: '',
  startDate: '',
  endDate: '',
  featured: false,
};

const emptyCertificate = {
  title: '',
  organization: '',
  domain: 'Full Stack Developer',
  certificateImage: '',
  credentialUrl: '',
  issueDate: '',
  expiryDate: '',
  skills: '',
};

const emptyAchievement = {
  title: '',
  description: '',
  category: 'Achievement',
  organization: '',
  achievementDate: '',
  proofUrl: '',
  order: 0,
};

const defaultResumeRows = domainProfiles.map((role) => ({
  id: role.id,
  domain: role.domain,
  label: role.resumeLabel,
  href: role.resumeHref,
  file: null,
  fileName: '',
}));

const asDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '');
const joinList = (value) => (Array.isArray(value) ? value.join(', ') : value || '');
const publicImage = (item, field = 'image') => item?.[field] || item?.image || item?.certificateImage || '';

const AdminDashboard = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const admin = useAuthStore((state) => state.admin);
  const logout = useAuthStore((state) => state.logout);
  const [activeTab, setActiveTab] = useState('projects');
  const [stats, setStats] = useState(null);

  const refreshStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      setStats(response.data.stats);
    } catch {
      setStats(null);
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-secondary' : 'bg-gray-50'}`}>
      <header className={`${isDark ? 'bg-black/30' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage portfolio content, messages, files, and profile data.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {admin?.fullName || admin?.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard label="Projects" value={stats?.totalProjects ?? 0} />
          <StatCard label="Certificates" value={stats?.totalCertificates ?? 0} />
          <StatCard label="Achievements" value={stats?.totalAchievements ?? 0} />
          <StatCard label="Messages" value={stats?.totalMessages ?? 0} />
          <StatCard label="Unread" value={stats?.unreadMessages ?? 0} />
          <StatCard label="Featured" value={stats?.featuredProjects ?? 0} />
        </div>
      </section>

      <div className={`${isDark ? 'bg-black/20' : 'bg-white'} border-b border-gray-700 mt-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <ProjectsManager onChange={refreshStats} />}
        {activeTab === 'certificates' && <CertificatesManager onChange={refreshStats} />}
        {activeTab === 'achievements' && <AchievementsManager onChange={refreshStats} />}
        {activeTab === 'messages' && <MessagesManager onChange={refreshStats} />}
        {activeTab === 'profile' && <ProfileManager onChange={refreshStats} />}
        {stats?.latestActivity?.length > 0 && <ActivityPanel activities={stats.latestActivity} />}
      </main>
    </div>
  );
};

const Panel = ({ title, action, children }) => {
  const { isDark } = useDarkMode();
  return (
    <div className={`p-5 md:p-6 rounded-lg ${isDark ? 'bg-black/30' : 'bg-white'} shadow-lg`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-3xl font-bold text-primary">{value}</p>
  </div>
);

const Toolbar = ({ search, setSearch, filter, setFilter, filterOptions, exportPath }) => (
  <div className="grid md:grid-cols-[1fr_220px_auto] gap-3 mb-5">
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search"
      className="px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:border-primary"
    />
    <select
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
      className="px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:border-primary"
    >
      {filterOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <button onClick={() => downloadCsv(exportPath)} className="px-4 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-bold">
      Export CSV
    </button>
  </div>
);

const Pagination = ({ pagination, setPage }) => {
  if (!pagination || pagination.pages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-3 mt-5">
      <button disabled={pagination.page <= 1} onClick={() => setPage((page) => page - 1)} className="px-4 py-2 rounded-lg border border-gray-700 text-gray-200 disabled:opacity-40">
        Previous
      </button>
      <span className="text-gray-400">Page {pagination.page} of {pagination.pages}</span>
      <button disabled={pagination.page >= pagination.pages} onClick={() => setPage((page) => page + 1)} className="px-4 py-2 rounded-lg border border-gray-700 text-gray-200 disabled:opacity-40">
        Next
      </button>
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-[80] bg-black/70 p-4 flex items-center justify-center" onMouseDown={onClose}>
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-secondary shadow-2xl p-6" onMouseDown={(event) => event.stopPropagation()}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-white text-2xl">x</button>
      </div>
      {children}
    </div>
  </div>
);

const ImageUploader = ({ label, name, preview, onChange, accept = 'image/*' }) => (
  <div>
    <label className="block text-sm font-bold text-primary mb-2">{label}</label>
    {preview && (
      <div className="mb-3 rounded-lg overflow-hidden border border-gray-700 bg-black/30">
        {accept.includes('pdf') ? <p className="p-4 text-gray-300 break-all">{preview}</p> : <img src={preview} alt="" className="w-full h-52 object-cover" />}
      </div>
    )}
    <input name={name} type="file" accept={accept} onChange={onChange} className="w-full text-gray-300" />
  </div>
);

const useList = (path, filterKey) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.keyword = search;
      if (filter !== 'All') params[filterKey] = filter;
      const response = await api.get(path, { params });
      setItems(response.data.projects || response.data.certificates || response.data.achievements || response.data.messages || []);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchItems, 250);
    return () => clearTimeout(timer);
  }, [path, page, search, filter]);

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  return { items, pagination, search, setSearch, filter, setFilter, page, setPage, loading, fetchItems };
};

const ProjectsManager = ({ onChange }) => {
  const list = useList('/projects', 'domain');
  const [editing, setEditing] = useState(null);

  const remove = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    await api.delete(`/projects/${project._id}`);
    toast.success('Project deleted');
    list.fetchItems();
    onChange();
  };

  return (
    <Panel title="Projects" action={<button onClick={() => setEditing(emptyProject)} className="px-4 py-2 bg-primary text-white rounded-lg font-bold">Add Project</button>}>
      <Toolbar search={list.search} setSearch={list.setSearch} filter={list.filter} setFilter={list.setFilter} filterOptions={domains} exportPath="/projects/export/csv" />
      {list.loading && <p className="text-gray-400 mb-4">Loading projects...</p>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.items.map((project) => (
          <div key={project._id} className="rounded-lg bg-primary/10 border border-primary/20 overflow-hidden">
            {publicImage(project) && <img src={publicImage(project)} alt={project.title} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-white">{project.title}</h3>
                {project.featured && <span className="text-xs text-primary">Featured</span>}
              </div>
              <p className="text-sm text-gray-400 mt-1">{project.domain}</p>
              <p className="text-sm text-gray-300 my-3 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setEditing({ ...project, technologies: joinList(project.technologies), startDate: asDateInput(project.startDate), endDate: asDateInput(project.endDate) })} className="text-primary font-bold">Edit</button>
                <button onClick={() => remove(project)} className="text-red-400 font-bold">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination pagination={list.pagination} setPage={list.setPage} />
      {editing && <ProjectForm project={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); list.fetchItems(); onChange(); }} />}
    </Panel>
  );
};

const ProjectForm = ({ project, onClose, onSaved }) => {
  const [form, setForm] = useState(project);
  const [preview, setPreview] = useState(project.image || '');
  const [file, setFile] = useState(null);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const chooseFile = (event) => {
    const nextFile = event.target.files?.[0];
    setFile(nextFile);
    if (nextFile) setPreview(URL.createObjectURL(nextFile));
  };

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value ?? ''));
    if (file) data.append('image', file);
    if (form._id) await api.put(`/projects/${form._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    else await api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    toast.success('Project saved');
    onSaved();
  };

  return (
    <Modal title={form._id ? 'Edit Project' : 'Add Project'} onClose={onClose}>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Select label="Domain" name="domain" value={form.domain} onChange={update} options={domains.filter((domain) => domain !== 'All')} />
        <Textarea label="Description" name="description" value={form.description} onChange={update} className="md:col-span-2" required />
        <Input label="Technologies" name="technologies" value={form.technologies} onChange={update} placeholder="React, Node, MongoDB" />
        <Input label="GitHub URL" name="githubUrl" value={form.githubUrl || form.githubLink || ''} onChange={update} />
        <Input label="Live URL" name="liveUrl" value={form.liveUrl || form.liveLink || ''} onChange={update} />
        <Input label="Start Date" type="date" name="startDate" value={form.startDate} onChange={update} />
        <Input label="End Date" type="date" name="endDate" value={form.endDate} onChange={update} />
        <label className="flex items-center gap-3 text-gray-200"><input type="checkbox" name="featured" checked={!!form.featured} onChange={update} /> Featured</label>
        <div className="md:col-span-2"><ImageUploader label="Thumbnail Image" name="image" preview={preview} onChange={chooseFile} /></div>
        <FormActions onClose={onClose} />
      </form>
    </Modal>
  );
};

const CertificatesManager = ({ onChange }) => {
  const list = useList('/certificates', 'domain');
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const remove = async (certificate) => {
    if (!window.confirm(`Delete "${certificate.title}"?`)) return;
    await api.delete(`/certificates/${certificate._id}`);
    toast.success('Certificate deleted');
    list.fetchItems();
    onChange();
  };

  return (
    <Panel title="Certificates" action={<button onClick={() => setEditing(emptyCertificate)} className="px-4 py-2 bg-primary text-white rounded-lg font-bold">Add Certificate</button>}>
      <Toolbar search={list.search} setSearch={list.setSearch} filter={list.filter} setFilter={list.setFilter} filterOptions={domains} exportPath="/certificates/export/csv" />
      {list.loading && <p className="text-gray-400 mb-4">Loading certificates...</p>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.items.map((certificate) => (
          <div key={certificate._id} className="rounded-lg bg-primary/10 border border-primary/20 overflow-hidden">
            <img src={publicImage(certificate, 'certificateImage')} alt={certificate.title} className="h-40 w-full object-cover cursor-pointer" onClick={() => setPreview(publicImage(certificate, 'certificateImage'))} />
            <div className="p-4">
              <h3 className="font-bold text-white">{certificate.title}</h3>
              <p className="text-sm text-gray-400">{certificate.organization || certificate.provider}</p>
              <p className="text-sm text-gray-500">{certificate.domain}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-bold">Verify</a>}
                <button onClick={() => setEditing({ ...certificate, organization: certificate.organization || certificate.provider, certificateImage: publicImage(certificate, 'certificateImage'), skills: joinList(certificate.skills), issueDate: asDateInput(certificate.issueDate), expiryDate: asDateInput(certificate.expiryDate) })} className="text-primary font-bold">Edit</button>
                <button onClick={() => remove(certificate)} className="text-red-400 font-bold">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination pagination={list.pagination} setPage={list.setPage} />
      {editing && <CertificateForm certificate={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); list.fetchItems(); onChange(); }} />}
      {preview && <Modal title="Certificate Preview" onClose={() => setPreview(null)}><img src={preview} alt="" className="w-full rounded-lg" /></Modal>}
    </Panel>
  );
};

const CertificateForm = ({ certificate, onClose, onSaved }) => {
  const [form, setForm] = useState(certificate);
  const [preview, setPreview] = useState(certificate.certificateImage || certificate.image || '');
  const [file, setFile] = useState(null);
  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const chooseFile = (event) => {
    const nextFile = event.target.files?.[0];
    setFile(nextFile);
    if (nextFile) setPreview(URL.createObjectURL(nextFile));
  };
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value ?? ''));
    if (file) data.append('certificateImage', file);
    if (form._id) await api.put(`/certificates/${form._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    else await api.post('/certificates', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    toast.success('Certificate saved');
    onSaved();
  };
  return (
    <Modal title={form._id ? 'Edit Certificate' : 'Add Certificate'} onClose={onClose}>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Input label="Organization" name="organization" value={form.organization} onChange={update} required />
        <Select label="Domain" name="domain" value={form.domain} onChange={update} options={domains.filter((domain) => domain !== 'All')} />
        <Input label="Credential URL" name="credentialUrl" value={form.credentialUrl} onChange={update} />
        <Input label="Issue Date" type="date" name="issueDate" value={form.issueDate} onChange={update} required />
        <Input label="Expiry Date" type="date" name="expiryDate" value={form.expiryDate} onChange={update} />
        <Input label="Skills" name="skills" value={form.skills} onChange={update} placeholder="React, API, Security" />
        <div className="md:col-span-2"><ImageUploader label="Certificate Image" name="certificateImage" preview={preview} onChange={chooseFile} /></div>
        <FormActions onClose={onClose} />
      </form>
    </Modal>
  );
};

const AchievementsManager = ({ onChange }) => {
  const list = useList('/achievements', 'category');
  const [editing, setEditing] = useState(null);

  const remove = async (achievement) => {
    if (!window.confirm(`Delete "${achievement.title}"?`)) return;
    await api.delete(`/achievements/${achievement._id}`);
    toast.success('Achievement deleted');
    list.fetchItems();
    onChange();
  };

  return (
    <Panel title="Achievements" action={<button onClick={() => setEditing(emptyAchievement)} className="px-4 py-2 bg-primary text-white rounded-lg font-bold">Add Achievement</button>}>
      <Toolbar search={list.search} setSearch={list.setSearch} filter={list.filter} setFilter={list.setFilter} filterOptions={['All']} exportPath="/achievements/export/csv" />
      {list.loading && <p className="text-gray-400 mb-4">Loading achievements...</p>}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.items.map((achievement) => (
          <div key={achievement._id} className="rounded-lg bg-primary/10 border border-primary/20 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">{achievement.category || 'Achievement'}</p>
            <h3 className="font-bold text-white">{achievement.title}</h3>
            {(achievement.organization || achievement.achievementDate) && (
              <p className="text-sm text-gray-400 mt-1">
                {[achievement.organization, achievement.achievementDate ? new Date(achievement.achievementDate).toLocaleDateString() : ''].filter(Boolean).join(' / ')}
              </p>
            )}
            <p className="text-sm text-gray-300 my-3 line-clamp-4">{achievement.description}</p>
            <div className="flex flex-wrap gap-3">
              {achievement.proofUrl && <a href={achievement.proofUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-bold">Proof</a>}
              <button
                onClick={() => setEditing({ ...achievement, achievementDate: asDateInput(achievement.achievementDate) })}
                className="text-primary font-bold"
              >
                Edit
              </button>
              <button onClick={() => remove(achievement)} className="text-red-400 font-bold">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Pagination pagination={list.pagination} setPage={list.setPage} />
      {editing && <AchievementForm achievement={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); list.fetchItems(); onChange(); }} />}
    </Panel>
  );
};

const AchievementForm = ({ achievement, onClose, onSaved }) => {
  const [form, setForm] = useState(achievement);
  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (form._id) await api.put(`/achievements/${form._id}`, form);
    else await api.post('/achievements', form);
    toast.success('Achievement saved');
    onSaved();
  };

  return (
    <Modal title={form._id ? 'Edit Achievement' : 'Add Achievement'} onClose={onClose}>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Input label="Category" name="category" value={form.category || ''} onChange={update} placeholder="Competition, Award, Hackathon" />
        <Input label="Organization" name="organization" value={form.organization || ''} onChange={update} />
        <Input label="Date" type="date" name="achievementDate" value={form.achievementDate || ''} onChange={update} />
        <Input label="Proof URL" name="proofUrl" value={form.proofUrl || ''} onChange={update} />
        <Input label="Order" type="number" name="order" value={form.order ?? 0} onChange={update} />
        <Textarea label="Description" name="description" value={form.description} onChange={update} className="md:col-span-2" required />
        <FormActions onClose={onClose} />
      </form>
    </Modal>
  );
};

const MessagesManager = ({ onChange }) => {
  const list = useList('/messages', 'status');
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');

  const setStatus = async (message, status) => {
    await api.put(`/messages/${message._id}`, { status });
    toast.success('Message updated');
    list.fetchItems();
    onChange();
  };

  const remove = async (message) => {
    if (!window.confirm(`Delete message from ${message.name}?`)) return;
    await api.delete(`/messages/${message._id}`);
    toast.success('Message deleted');
    list.fetchItems();
    onChange();
  };

  const sendReply = async () => {
    await api.post(`/messages/${selected._id}/reply`, { reply });
    toast.success('Reply processed');
    setReply('');
    setSelected(null);
    list.fetchItems();
    onChange();
  };

  return (
    <Panel title="Messages">
      <Toolbar search={list.search} setSearch={list.setSearch} filter={list.filter} setFilter={list.setFilter} filterOptions={statuses} exportPath="/messages/export/csv" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.items.map((message) => (
              <tr key={message._id} className="border-b border-gray-800 text-gray-200">
                <td className="py-3">{message.name}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                <td><span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs">{message.status}</span></td>
                <td className="space-x-3">
                  <button onClick={() => setSelected(message)} className="text-primary font-bold">View</button>
                  <button onClick={() => setStatus(message, 'Read')} className="text-primary font-bold">Read</button>
                  <button onClick={() => setStatus(message, 'Replied')} className="text-primary font-bold">Replied</button>
                  <button onClick={() => remove(message)} className="text-red-400 font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination pagination={list.pagination} setPage={list.setPage} />
      {selected && (
        <Modal title={selected.subject} onClose={() => setSelected(null)}>
          <p className="text-gray-300 mb-2">{selected.name} &lt;{selected.email}&gt;</p>
          <p className="text-white leading-7 mb-5 whitespace-pre-wrap">{selected.message}</p>
          <Textarea label="Reply" value={reply} onChange={(event) => setReply(event.target.value)} rows={5} />
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setSelected(null)} className="px-4 py-2 border border-gray-700 rounded-lg text-gray-200">Close</button>
            <button disabled={!reply.trim()} onClick={sendReply} className="px-4 py-2 bg-primary text-white rounded-lg font-bold disabled:opacity-40">Send Reply</button>
          </div>
        </Modal>
      )}
    </Panel>
  );
};

const ProfileManager = ({ onChange }) => {
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [resumePreview, setResumePreview] = useState('');
  const [resumeRows, setResumeRows] = useState(defaultResumeRows);
  const [profileFile, setProfileFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const fetchProfile = async () => {
    const response = await api.get('/profile');
    const nextProfile = response.data.profile;
    setProfile({
      ...nextProfile,
      skillsText: JSON.stringify(nextProfile.skills || [], null, 2),
    });
    setProfilePreview(nextProfile.profileImage || '');
    setResumePreview(nextProfile.resumeUrl || '');
    setResumeRows(
      nextProfile.resumes?.length
        ? nextProfile.resumes.map((resume) => ({ ...resume, file: null, fileName: '' }))
        : defaultResumeRows
    );
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const update = (event) => setProfile((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const updateResumeRow = (index, field, value) => {
    setResumeRows((rows) => rows.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)));
  };
  const chooseResumeFile = (index, file) => {
    setResumeRows((rows) => rows.map((row, rowIndex) => (
      rowIndex === index ? { ...row, file, fileName: file?.name || '' } : row
    )));
  };
  const addResumeRow = () => {
    setResumeRows((rows) => [
      ...rows,
      {
        id: `custom-${Date.now()}`,
        domain: 'Other',
        label: 'New Resume',
        href: '',
        file: null,
        fileName: '',
      },
    ]);
  };
  const removeResumeRow = (index) => {
    setResumeRows((rows) => rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', profile.name || profile.fullName || '');
    data.append('title', profile.title || '');
    data.append('bio', profile.bio || '');
    data.append('email', profile.email || '');
    data.append('phone', profile.phone || '');
    data.append('location', profile.location || '');
    data.append('about', profile.about || '');
    data.append('github', profile.github || profile.socialLinks?.github || '');
    data.append('linkedin', profile.linkedin || profile.socialLinks?.linkedin || '');
    data.append('skills', profile.skillsText || '[]');
    if (profileFile) data.append('profileImage', profileFile);
    if (resumeFile) data.append('resume', resumeFile);
    const resumesPayload = resumeRows.map(({ file, fileName, ...resume }) => {
      if (!file) return resume;
      const fileIndex = data.getAll('resumeFiles').length;
      data.append('resumeFiles', file);
      return { ...resume, fileIndex };
    });
    data.append('resumes', JSON.stringify(resumesPayload));
    await api.put('/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    toast.success('Profile updated');
    fetchProfile();
    onChange();
  };

  if (!profile) return <Panel title="Profile"><p className="text-gray-400">Loading profile...</p></Panel>;

  return (
    <Panel title="Profile">
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Input label="Name" name="name" value={profile.name || profile.fullName || ''} onChange={update} />
        <Input label="Title" name="title" value={profile.title || ''} onChange={update} />
        <Input label="Email" name="email" value={profile.email || ''} onChange={update} />
        <Input label="Phone" name="phone" value={profile.phone || ''} onChange={update} />
        <Input label="Location" name="location" value={profile.location || ''} onChange={update} />
        <Input label="GitHub" name="github" value={profile.github || profile.socialLinks?.github || ''} onChange={update} />
        <Input label="LinkedIn" name="linkedin" value={profile.linkedin || profile.socialLinks?.linkedin || ''} onChange={update} />
        <Textarea label="Bio" name="bio" value={profile.bio || ''} onChange={update} className="md:col-span-2" />
        <Textarea label="About" name="about" value={profile.about || ''} onChange={update} className="md:col-span-2" />
        <Textarea label="Skills JSON" name="skillsText" value={profile.skillsText || '[]'} onChange={update} rows={8} className="md:col-span-2" />
        <ImageUploader label="Profile Image" name="profileImage" preview={profilePreview} onChange={(event) => { const file = event.target.files?.[0]; setProfileFile(file); if (file) setProfilePreview(URL.createObjectURL(file)); }} />
        <ImageUploader label="Resume PDF" name="resume" accept="application/pdf" preview={resumePreview} onChange={(event) => { const file = event.target.files?.[0]; setResumeFile(file); if (file) setResumePreview(file.name); }} />
        <div className="md:col-span-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-primary">Role-wise Resumes</h3>
              <p className="text-sm text-gray-400">Upload updated PDFs for each role and control the labels shown on the portfolio.</p>
            </div>
            <button type="button" onClick={addResumeRow} className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 font-bold">
              Add Resume
            </button>
          </div>
          <div className="space-y-4">
            {resumeRows.map((resume, index) => (
              <div key={resume.id || index} className="grid lg:grid-cols-[1fr_1fr_1.4fr_auto] gap-3 rounded-lg bg-black/20 border border-gray-800 p-4">
                <Select
                  label="Domain"
                  value={resume.domain || 'Other'}
                  onChange={(event) => updateResumeRow(index, 'domain', event.target.value)}
                  options={domains.filter((domain) => domain !== 'All')}
                />
                <Input
                  label="Button Label"
                  value={resume.label || ''}
                  onChange={(event) => updateResumeRow(index, 'label', event.target.value)}
                  placeholder="Full Stack Resume"
                />
                <Input
                  label="Current Link"
                  value={resume.href || ''}
                  onChange={(event) => updateResumeRow(index, 'href', event.target.value)}
                  placeholder="/uploads/resume/file.pdf"
                />
                <div className="flex lg:items-end">
                  <button type="button" onClick={() => removeResumeRow(index)} className="w-full px-4 py-3 rounded-lg border border-red-500/60 text-red-300 hover:bg-red-500/10 font-bold">
                    Remove
                  </button>
                </div>
                <div className="lg:col-span-4">
                  <ImageUploader
                    label="Replace PDF"
                    name={`resume-${index}`}
                    accept="application/pdf"
                    preview={resume.fileName || resume.href}
                    onChange={(event) => chooseResumeFile(index, event.target.files?.[0] || null)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-5 py-3 bg-primary text-white rounded-lg font-bold">Save Profile</button>
        </div>
      </form>
    </Panel>
  );
};

const ActivityPanel = ({ activities }) => (
  <div className="mt-8 rounded-lg bg-black/20 border border-gray-800 p-5">
    <h3 className="text-xl font-bold text-primary mb-4">Latest Activity</h3>
    <div className="grid md:grid-cols-2 gap-3">
      {activities.map((activity) => (
        <div key={activity._id} className="text-sm text-gray-300">
          <span className="text-primary">{activity.entity}</span> {activity.action} {activity.details && `- ${activity.details}`}
        </div>
      ))}
    </div>
  </div>
);

const Input = ({ label, className = '', ...props }) => (
  <label className={`block ${className}`}>
    <span className="block text-sm font-bold text-primary mb-2">{label}</span>
    <input {...props} className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:border-primary" />
  </label>
);

const Select = ({ label, options, ...props }) => (
  <label className="block">
    <span className="block text-sm font-bold text-primary mb-2">{label}</span>
    <select {...props} className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:border-primary">
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

const Textarea = ({ label, className = '', ...props }) => (
  <label className={`block ${className}`}>
    <span className="block text-sm font-bold text-primary mb-2">{label}</span>
    <textarea {...props} className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-700 text-white focus:outline-none focus:border-primary resize-y" />
  </label>
);

const FormActions = ({ onClose }) => (
  <div className="md:col-span-2 flex justify-end gap-3">
    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-700 rounded-lg text-gray-200">Cancel</button>
    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-bold">Save</button>
  </div>
);

const downloadCsv = async (path) => {
  const response = await api.get(path, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', path.split('/').filter(Boolean)[0] + '.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default AdminDashboard;
