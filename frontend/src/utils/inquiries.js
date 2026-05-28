const STORAGE_KEY = 'hg_inquiries_v1';

const safeParse = (raw, fallback) => {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const getInquiries = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const list = safeParse(raw, []);
  return Array.isArray(list) ? list : [];
};

export const addInquiry = (inquiry) => {
  if (typeof window === 'undefined') return null;
  const prev = getInquiries();
  const next = [inquiry, ...prev];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return inquiry;
};

export const deleteInquiry = (id) => {
  if (typeof window === 'undefined') return [];
  const prev = getInquiries();
  const next = prev.filter((i) => i?.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const clearInquiries = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

