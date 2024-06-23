import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

interface AuthStateType {
  user: User | null;
  isLoggedIn: boolean;
  loginUser: (emailOrPhone: string, password: string) => Promise<void>;
  signUpUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthStateType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const loginUser = async (emailOrPhone: string, password: string) => {
    setLoading(true);
    let data, error;
    if (emailOrPhone.includes('@')) {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email: emailOrPhone,
        password
      }));
    } else {
      ({ data, error } = await supabase.auth.signInWithPassword({
        phone: emailOrPhone,
        password
      }));
    }
    if (error) throw error;
    const user = data.user;
    if (user) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileError) throw profileError;
      const userProfile = { ...user, ...profileData };
      setUser(userProfile);
      await AsyncStorage.setItem('user', JSON.stringify(userProfile));
    }
    setLoading(false);
  };

  const signUpUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const user = data.user;
    if (user) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: user.id, first_name: firstName, last_name: lastName, phone }
        ])
        .select()
        .single();
      if (profileError) throw profileError;
      const userProfile = { ...user, ...profileData };
      setUser(userProfile);
      await AsyncStorage.setItem('user', JSON.stringify(userProfile));
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await AsyncStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginUser,
        signUpUser,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
