"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabaseBrowser.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push("/admin");
            router.refresh();
        } catch (err: unknown) { // Changed 'any' to 'unknown'
            const message = err instanceof Error ? err.message : "Giriş zamanı xəta baş verdi";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-[url('/grid-dark.svg')] opacity-[0.03]" />
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-8 group">
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:to-white transition-all">
                            Dargah Group.
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3">Xoş Gəlmisiniz</h1>
                    <p className="text-slate-400">Admin panelinə daxil olmaq üçün məlumatlarınızı daxil edin</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="Email ünvanı"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                placeholder="Şifrə"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex items-center gap-2 text-red-400 text-sm bg-red-900/10 p-3 rounded-lg border border-red-900/20"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${loading
                                ? "bg-blue-600/50 cursor-wait"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                            }`}
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Daxil ol
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500">
                        Kömək lazımdır? Texniki dəstək ilə əlaqə saxlayın.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
