"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

export default function Header() {
    const router = useRouter();

    // -- CLOCK STATE --
    const [time, setTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    // -- SEARCH STATE --
    const [query, setQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // -- WHATSAPP LINK --
    // Replace with your actual number
    const whatsappUrl = "https://wa.me/994515978888?text=I%20need%20support";

    // 1. Handle Clock Tick
    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Handle Clicking Outside Search
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 3. Filter Products
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleProductSelect = (id: string) => {
        router.push(`/product/${id}`);
        setIsSearchOpen(false);
        setQuery("");
    };

    return (
        <header className="bg-blue-50 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">

                {/* --- LOGO --- */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-blue-600 tracking-tighter hover:scale-105 transition-transform flex-shrink-0 [-webkit-text-stroke:1.5px_currentColor]"
                >
                    EASY
                    {/* We apply the stroke here too so it matches the SUB color, not the parent color */}
                    <span className="text-blue-900 [-webkit-text-stroke:1.5px_currentColor]">
                        SUB
                    </span>
                    .
                </Link>

                {/* --- SEARCH BAR --- */}
                <div className="relative flex-1 max-w-md" ref={searchRef}>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white text-gray-700 pl-10 pr-4 py-2.5 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setIsSearchOpen(true);
                            }}
                            onFocus={() => setIsSearchOpen(true)}
                        />
                        <svg className="w-5 h-5 text-blue-400 absolute left-3 top-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* --- SEARCH DROPDOWN --- */}
                    {isSearchOpen && query.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleProductSelect(product.id)}
                                        className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-none transition-colors"
                                    >
                                        <img src={product.image} alt={product.name} className="w-8 h-8 object-contain rounded-md" />
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                                            <p className="text-xs text-blue-500">From ${product.pricing.monthly}/mo</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">No results found.</div>
                            )}
                        </div>
                    )}
                </div>

                {/* --- RIGHT SIDE ACTIONS (z-index added here) --- */}
                <div className="flex items-center gap-4 relative z-50">

                    {/* CLOCK (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Local Time</span>
                        <div className="text-lg font-mono font-bold text-blue-900 w-[100px] text-right">
                            {mounted ? time : <span className="opacity-0">00:00:00</span>}
                        </div>
                    </div>

                    {/* --- SUPPORT BUTTON (DESKTOP) --- */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                        </svg>
                        Support
                    </a>

                    {/* --- SUPPORT BUTTON (MOBILE FIX) --- */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 active:bg-blue-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </a>

                </div>
            </div>
        </header>
    );
}