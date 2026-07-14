import { create } from 'zustand';

const getStoredAdmin = () => {
  const adminStr = localStorage.getItem('admin');

  if (!adminStr) {
    return null;
  }

  try {
    return JSON.parse(adminStr);
  } catch {
    localStorage.removeItem('admin');
    return null;
  }
};

const useAuthStore = create((set) => ({
  admin: getStoredAdmin(),
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  setAuth: (admin, token, refreshToken) => {
    localStorage.setItem('token', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('admin', JSON.stringify(admin));
    set({ admin, token, refreshToken: refreshToken || localStorage.getItem('refreshToken'), isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('admin');
    set({ admin: null, token: null, refreshToken: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const admin = getStoredAdmin();
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (admin && token) {
      set({
        admin,
        token,
        refreshToken,
        isAuthenticated: true,
      });
      return;
    }

    set({ admin: null, token: null, refreshToken: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
