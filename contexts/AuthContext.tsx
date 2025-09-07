import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const userJson = await SecureStore.getItemAsync('user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // In a real app, you would call your authentication API here
      // This is just a mock implementation
      if (email && password) {
        const mockUser = {
          id: '1',
          name: 'Test User',
          email: email,
        };
        
        await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Please enter both email and password' };
      }
    } catch (error) {
      console.error('Sign in error', error);
      return { success: false, error: 'Failed to sign in. Please try again.' };
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      // In a real app, you would call your registration API here
      // This is just a mock implementation
      if (name && email && password) {
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
        };
        
        await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Please fill in all fields' };
      }
    } catch (error) {
      console.error('Sign up error', error);
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
