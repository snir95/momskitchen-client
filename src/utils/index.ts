export const createPageUrl = (pageName: string): string => {
  const pageMap: { [key: string]: string } = {
    'Homepage': '/',
    'OurStory': '/our-story',
    'Contact': '/contact',
    'Cart': '/cart',
    'Account': '/account',
    'AdminDashboard': '/admin'
  };
  
  return pageMap[pageName] || '/';
};

export const formatPrice = (price: number): string => {
  return `₪${price.toFixed(2)}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Israeli phone number
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 9;
};
