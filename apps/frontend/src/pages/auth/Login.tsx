
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-orange-200 bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-card rounded-2xl p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" >
                    <div className="space-y-4">
                        <Input
                            id="email-address"
                            // name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="name@example.com"
                            //     value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="••••••••"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                        />
                    </div>

                    {/* {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )} */}

                    <div>
                        <Button
                            type="submit"
                            variant="gradient"
                            className="w-full h-11"
                            // isLoading={isLoading}
                        >
                            Sign in
                        </Button>
                    </div>

                    <div className="text-xs text-center text-slate-500 mt-4">
                        Use <span className="text-slate-400 font-mono">test@example.com</span> / <span className="text-slate-400 font-mono">password</span>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
