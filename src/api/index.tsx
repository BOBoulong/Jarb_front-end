'use client'
// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from "sonner"


interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  apiClient: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  const router = useRouter()
  const pathName = usePathname()

  const apiClient: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        toast.error(`Error: ${error.response.status}`, {
          description: error.response.data.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        toast.error(`Error: ${error.response.status}`, {
          description: error.response.data.message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        return Promise.reject(error);
      }
    );

    return instance;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicPaths = ['/login']
  const searchParams = useSearchParams();

  const fetchUser = async () => {

    if (searchParams.get('token')) {
      localStorage.setItem('token', (searchParams.get('token') as string));
    }

    console.log(searchParams.get('token'), 'searhc')

    console.log(localStorage.getItem('token'))

    console.log(publicPaths.includes(pathName) && localStorage.getItem('token'))
    try {
      if (publicPaths.includes(pathName) && localStorage.getItem('token')) {
        router.push('/')
      }

      const { data: userData } = await apiClient.get('/auth/profile');
      setUser(userData);

    } catch (error) {
      logout();
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await apiClient.post('/auth/login', { name: username, password });
      localStorage.setItem('token', data.access_token);
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (!publicPaths.includes(pathName)) {
      router.push('/login')
    }

  };

  return (
    <AuthContext.Provider value={{user, login, logout, apiClient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};