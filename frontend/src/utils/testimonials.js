const STORAGE_KEY = 'hg_testimonials_v1';

const safeParse = (raw, fallback) => {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const getTestimonials = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const list = safeParse(raw, []);
  return Array.isArray(list) ? list : [];
};

export const addTestimonial = (testimonial) => {
  if (typeof window === 'undefined') return null;
  const prev = getTestimonials();
  const next = [testimonial, ...prev].slice(0, 12);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return testimonial;
};

export const clearTestimonials = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};

