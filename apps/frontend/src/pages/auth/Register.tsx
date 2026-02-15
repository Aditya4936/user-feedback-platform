import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { signupApi } from "../../api/auth.api";
import { ERROR_MESSAGES, ROUTES } from "../../constants";

export function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signupApi({ name, email, password });
            navigate(ROUTES.LOGIN);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || ERROR_MESSAGES.REGISTER_FAILED
                );
            } else {
                setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
            }
            console.error("Register error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-200 bg-cover bg-center">
            <h1 className="font-extrabold text-2xl mb-3">Register</h1>
            <p className="text-lg font-medium mb-3">
                Register your account to continue
            </p>

            {error && (
                <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
            )}

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="text-lg font-light mt-4">
                Already have an account?{" "}
                <Link to={ROUTES.LOGIN}>Login</Link>
            </p>
        </div>
    );
}
