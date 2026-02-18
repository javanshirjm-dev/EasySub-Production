'use client'

import Link from "next/link";
import {
    Twitter,
    Instagram,
    Github,
    Linkedin,
    ArrowRight,
    Send,
    Zap,
    Activity,
    Box,
    ExternalLink
} from "lucide-react";
import ChatBot from "./ChatBot";

const Footer = () => {
    return (
        <footer className="relative bg-[#050505] border-t border-white/10 overflow-hidden pt-19 pb-10">

            {/* --- BACKGROUND LAYERS --- */}
            {/* 1. Grain/Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* 2. Animated Grid */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none">
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div key={`v-${i}`} className="absolute h-full w-px bg-white/[0.03]" style={{ left: `${i * 5}%` }} />
                    ))}
                </div>
                <div className="absolute inset-0">
                    {[...Array(10)].map((_, i) => (
                        <div key={`h-${i}`} className="absolute w-full h-px bg-white/[0.03]" style={{ top: `${i * 10}%` }} />
                    ))}
                </div>
                {/* Scanner Beam */}
                <div className="absolute inset-0">
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan-vertical" />
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Top Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-7">

                    {/* COL 1: Brand & Newsletter (Span 5) */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-3 group">

                                <div className="flex flex-col">
                                    <span className="text-xl font-black tracking-tight text-white leading-none">
                                        EASY<span className="text-blue-500">SUB</span>.
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] mt-1">
                                        SYSTEM ONLINE v1.03
                                    </span>
                                </div>
                            </Link>

                            <p className="mt-6 text-sm text-gray-400 leading-relaxed max-w-sm">
                                The definitive platform for managing digital assets. Secure, fast, and built for the modern web.
                            </p>
                        </div>

                        {/* Newsletter Box */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-1 backdrop-blur-sm">
                            <div className="relative flex items-center">
                                <input
                                    type="email"
                                    placeholder="Enter email for updates..."
                                    className="w-full bg-transparent text-sm text-white px-4 py-3 focus:outline-none placeholder:text-gray-600 font-medium"
                                />
                                <button className="absolute right-1 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">

                    </div>

                    {/* COL 3: Stats Card (Span 3) */}
                    <div className="lg:col-span-3">
                        <div className="h-full bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />



                            {/* Middle Part */}
                            <div className="relative z-10 mt-3">
                                <div className="text-4xl font-mono text-white tracking-tighter tabular-nums">
                                    1,024
                                </div>
                                <div className="text-xs text-gray-500 mt-1 font-medium">Active Users</div>
                            </div>

                            {/* Bottom Part */}
                            <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Activity size={14} className="text-blue-500" />
                                    <span>Server Load</span>
                                </div>
                                <span className="text-xs font-mono text-white">23%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-8">
                        <p className="text-xs text-gray-500">
                            &copy; 2026 EasySub Inc.
                        </p>

                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-600 mr-2">
                            Crafted by <span className="text-pink-500 font-bold text-[13px]">Javanshir</span>
                        </span>


                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan-vertical {
                    0% { top: -10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }
                .animate-scan-vertical {
                    animation: scan-vertical 6s linear infinite;
                }
            `}</style>
            <ChatBot />
        </footer>
    )
}

export default Footer