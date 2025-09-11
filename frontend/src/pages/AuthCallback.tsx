// frontend/src/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLinkStore } from '@/store/linkStore';
import axios from 'axios';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useLinkStore();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');
        
        if (token) {
          // Store token in localStorage
          localStorage.setItem('jwt', token);
          
          // Set axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          
          // Fetch user data from backend and store it
          const response = await axios.get('/auth/me');
          
          // Store user data in localStorage as well (if you want persistence)
          localStorage.setItem('user', JSON.stringify(response.data));
          
          // Update your store with user data
          await login(response.data);
          // You'll need to add a setUser method to your store
          console.log('User authenticated:', response.data);
          
          navigate('/', { replace: true });
        } else {
          console.error('No token found');
          navigate('/');
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        navigate('/');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuth();
  }, [location, navigate,login]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Authenticating, please wait...</p>
        </div>
      </div>
    );
  }

  return null;
};