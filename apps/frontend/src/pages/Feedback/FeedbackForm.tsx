
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Bug, Lightbulb, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';

export const FeedbackForm: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-orange-200 bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-lg glass-card rounded-2xl p-8 space-y-8"
            >
                <div className="text-center space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 ring-1 ring-white/10">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">We value your opinion</h2>
                    <p className="text-slate-400">Help us improve your experience by sharing your feedback.</p>
                </div>

               
                    <form className="space-y-6">

                        <div className="space-y-4">
                            <Input
                                label="Subject"
                                placeholder="What's this about?"
                                required
                            />
                            <TextArea
                                label="Description"
                                placeholder="Tell us more details..."
                                rows={4}
                                required
                            />
                        </div>

                        <Button type="submit" variant="gradient" className="w-full h-12 text-lg shadow-xl shadow-indigo-500/20">
                            Submit Feedback
                        </Button>
                    </form>
            </motion.div>
        </div>
    );
};
