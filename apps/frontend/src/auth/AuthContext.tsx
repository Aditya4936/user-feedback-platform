import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { AuthContextType, DecodedToken, UserRole } from "../types";
import { STORAGE_KEYS } from "../constants";

// ─── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setRole(decoded.role);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            }
        }

        setLoading(false);
    }, []);

    const login = (token: string) => {
        const decoded = jwtDecode<DecodedToken>(token);
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        setRole(decoded.role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        setRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, loading, role, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
