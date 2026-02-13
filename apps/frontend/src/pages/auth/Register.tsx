
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { motion } from 'framer-motion';

export const Register: React.FC = () => {
  
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
                        Create Account
                    </h2>
                    <p className="text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" >
                    <div className="space-y-4">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            label="Full Name"
                        />
                        <Input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="name@example.com"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="••••••••"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="gradient"
                            className="w-full h-11"
                            // isLoading={isLoading}
                        >
                            Get Started
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
