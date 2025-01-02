import React, { createContext, useContext, useState, ReactNode } from 'react';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// Definimos los tipos para el contexto
interface AuthContextType {
    setToken: (token: string) => void;
    getToken: () => string | undefined;
    saveUser: (user: User) => void;
    getUser: () => User | null;
    userInfo: User | null;
    token: string | undefined;
    logout: () => void;
}

// Definimos el tipo del usuario
interface User { name: string; lastname: string; avatar?: string }

const SECRET_KEY = import.meta.env.VITE_SECRET_ENC_CRIPTO; 

const encryptData = (data: any): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData: string): any => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : null;
};

const setToken = (token: string) => {
    Cookies.set('data:ath-tk', token, {
        expires: 1 / 24, // Expira en 1 hora
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });
};


const getToken = (): string | undefined => {
    return Cookies.get('data:ath-tk');
};

const saveUser = (user: User) => {
    const encryptedUser = encryptData(user); // Encriptamos el usuario antes de guardarlo
    Cookies.set('data:usr-inf', encryptedUser, { expires: 7, secure: true, sameSite: 'Strict' });
};

const getUser = (): User | null => {
    const encryptedUser = Cookies.get('data:usr-inf');
    return encryptedUser ? decryptData(encryptedUser) : null;
};

const logout = (): void => {
    Cookies.remove('data:ath-tk');
    Cookies.remove('data:usr-inf');
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userInfo] = useState<User | null>(getUser()); 
    const [token] = useState<string | undefined>(getToken()); 

    return (
        <AuthContext.Provider value={{
            setToken,
            getToken,
            saveUser,
            getUser,
            userInfo,
            token,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthProvider not found");
    }
    return context;
};
