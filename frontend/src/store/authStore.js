import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isLoggedIn: false,
  
  login: (userData, role) => set({
    user: userData,
    role: role,
    isLoggedIn: true
  }),
  
  logout: () => set({
    user: null,
    role: null,
    isLoggedIn: false
  })
}));

export default useAuthStore;
