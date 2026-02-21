"use client";
import { Montserrat } from "next/font/google";

import {
    LayoutGrid,
    Clapperboard,
    Music,
    Bot,
    Code,
    BookOpen,
    MessageSquareHeartIcon,
    Sparkles,
    ShoppingBag
} from "lucide-react";

const montserrat = Montserrat({
    weight: "800",
    subsets: ["latin"],
});

const categories = [
    { id: "all", label: "All", icon: LayoutGrid },
    { id: "video", label: "Video", icon: Clapperboard },
    { id: "music", label: "Music", icon: Music },
    { id: "ai", label: "AI Tools", icon: Bot },
    { id: "social", label: "Social", icon: MessageSquareHeartIcon },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "design", label: "Design", icon: Sparkles },
    { id: "software", label: "Software", icon: Code },


];

interface BannerProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

export default function Banner({ activeCategory, onSelectCategory }: BannerProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 mb-10">

            <div className="relative bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl text-white">

                {/* --- DECORATIVE BACKGROUND BLOBS (The "Cool" Factor) --- */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-400 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-400 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">

                    {/* TEXT CONTENT */}
                    <h1 className={`text-3xl md:text-5xl  ${montserrat.className} mb-4 tracking-tight drop-shadow-md`}>
                        Premium for Less.
                    </h1>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl font-medium opacity-90">
                        Get the best subscriptions for a fraction of the price.
                        Instant delivery, secure payment.
                    </p>

                    {/* CATEGORY NAV */}
                    <div className="w-full flex justify-start md:justify-center overflow-x-auto pb-2 pt-2 scrollbar-hide">
                        <div className="flex gap-3 md:gap-4 p-1">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                const Icon = cat.icon;

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => onSelectCategory(cat.id)}
                                        className={`
                      group flex flex-col items-center justify-center 
                      w-[70px] h-[70px] md:w-[85px] md:h-[85px] 
                      rounded-2xl transition-all duration-300 ease-out border
                      ${isActive
                                                ? "bg-white border-white text-blue-700 shadow-xl scale-110 -translate-y-1"
                                                : "bg-white/10 border-white/10 text-blue-100 hover:bg-white/20 hover:border-white/30"
                                            }
                    `}
                                    >
                                        <Icon
                                            size={24}
                                            className={`mb-2 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                                        />
                                        <span className="text-[10px] md:text-xs font-bold tracking-wide">
                                            {cat.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}