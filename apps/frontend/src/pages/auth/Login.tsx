import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useAuth } from "../../auth/AuthContext";
import { loginApi } from "../../api/auth.api";
import { ERROR_MESSAGES, ROUTES } from "../../constants";
import type { DecodedToken } from "../../types";

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginApi({ email, password });
            login(res.data.accessToken);

            const decoded = jwtDecode<DecodedToken>(res.data.accessToken);
            navigate(decoded.role === "admin" ? ROUTES.DASHBOARD : ROUTES.FEEDBACK);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED
                );
            } else {
                setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
            }
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center flex-col justify-center p-4 bg-orange-200 bg-cover bg-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Feedback Platform</h1>
            <p className="text-lg font-medium mb-4">Login to continue</p>

            {error && (
                <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="text-lg font-medium mt-4">
                Don't have an account?{" "}
                <Link to={ROUTES.REGISTER}>Register</Link>
            </p>
        </div>
    );
}
