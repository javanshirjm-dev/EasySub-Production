"use client";

import {
    Zap,
    RotateCcw,
    ShieldCheck,
    Headset,
    Gem,
    HeartHandshake,
    ChevronRight
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Instant Delivery",
        description: "Automated dispatch system ensures you receive your subscription details immediately after payment.",
    },
    {
        icon: RotateCcw,
        title: "Quick Reset",
        description: "Lost access? Use our self-service dashboard to reset your passkey instantly without waiting for support.",
    },
    {
        icon: ShieldCheck,
        title: "SSL Secured",
        description: "Your data is protected. All transactions are encrypted with 256-bit SSL security protocols.",
    },
    {
        icon: Headset,
        title: "24/7 Live Support",
        description: "Our dedicated team is always online to help you with setup, renewal, or troubleshooting.",
    },
    {
        icon: Gem,
        title: "Affordable Premium",
        description: "Enjoy official premium benefits at a fraction of the cost through our shared subscription model.",
    },
    {
        icon: HeartHandshake,
        title: "Refund Guarantee",
        description: "Shop with confidence. We offer buyer protection with refunds available within 24 hours.",
        link: "/refund-policy"
    },
];

export default function Features() {
    return (
        <section className="py-20 ">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION HEADER */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        Why they choose <span className="text-blue-600">us?</span>
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Join thousands of happy customers saving money on their favorite streaming services today.
                    </p>
                </div>

                {/* FEATURES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-[2rem] bg-white border border-blue-100/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-6">

                                    {/* ICON CONTAINER */}
                                    <div className="flex-shrink-0 relative">
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-blue-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                                        <div className="relative w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <Icon size={26} strokeWidth={2} />
                                        </div>
                                    </div>

                                    {/* TEXT CONTENT */}
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-3">
                                            {feature.description}
                                        </p>

                                        {/* Optional Link (for Refund Policy) */}
                                        {feature.link && (
                                            <a href="#" className="inline-flex items-center text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">
                                                Read Policy <ChevronRight size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}