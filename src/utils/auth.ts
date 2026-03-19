const API_URL = 'http://localhost:5000/api/auth';
// const API_URL = 'http://localhost:5000/api/auth';


export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialcreator_token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('socialcreator_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('socialcreator_token');
  }
};

export const setUser = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialcreator_user', JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('socialcreator_user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const logout = () => {
  removeToken();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('socialcreator_user');
    window.location.href = '/login';
  }
};
