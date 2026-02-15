import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import type { UserRole } from "../types";
import { ROUTES } from "../constants";

interface RoleRouteProps {
    role: UserRole;
    children: ReactNode;
}

export function RoleRoute({ role, children }: RoleRouteProps) {
    const { isAuthenticated, loading, role: userRole } = useAuth();

    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (userRole !== role) {
        return <Navigate to={ROUTES.FEEDBACK} replace />;
    }

    return children;
}
