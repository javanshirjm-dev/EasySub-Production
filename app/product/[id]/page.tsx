"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { Montserrat } from "next/font/google";

import { notFound, useParams, useRouter } from "next/navigation";
import {
    Check,
    ShieldCheck,
    Star,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    MessageCircle,
    Clock,
    Shield,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const OWNER_PHONE_NUMBER = "994515978888";

const montserrat = Montserrat({
    weight: "800",
    subsets: ["latin"],
});

// Dummy FAQ Data (You can move this to a data file later)
const FAQS = [
    {
        question: "How long does delivery take?",
        answer: "Delivery is automated and instant! You will receive your login details immediately after payment confirmation on WhatsApp."
    },
    {
        question: "Is this a private account?",
        answer: "This is a shared premium subscription. You get your own profile and pin (for video services) to ensure your privacy within the shared account."
    },
    {
        question: "What if the password stops working?",
        answer: "We offer a full warranty for the duration of your subscription. If you have issues, use our 'Quick Reset' tool or contact support for an instant fix."
    },
    {
        question: "Can I renew the same account?",
        answer: "Yes! When your subscription ends, just contact us to top up the same account so you don't lose your history."
    }
];

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const product = products.find((p) => p.id === params.id);

    // States
    const [duration, setDuration] = useState<string>("monthly");
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(0); // Default first one open

    if (!product) return notFound();

    const handleBuyClick = () => setStep(2);

    const handleFinalPurchase = () => {
        if (!userName.trim()) {
            alert("Please enter your name");
            return;
        }
        const price = product.pricing[duration as keyof typeof product.pricing];
        const message = `Hello! I want to buy a subscription.%0A%0A *Product:* ${product.name}%0A *Duration:* ${duration}%0A *Name:* ${userName}%0A *Price:* $${price}`;
        const whatsappUrl = `https://wa.me/${OWNER_PHONE_NUMBER}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">

            {/* --- HEADER / BACK BUTTON --- */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm">
                    <ArrowLeft size={16} className="mr-2" /> Back to Store
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* ================= LEFT COLUMN (Product Info & FAQ) ================= */}
                <div className="lg:col-span-2 space-y-10">

                    {/* 1. HERO IMAGE CARD */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                        {/* Background Blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {product.category || "Premium"}
                                    </span>
                                    <div className="flex items-center text-yellow-400 text-xs gap-1">
                                        <Star fill="currentColor" size={14} />
                                        <span className="text-slate-500 font-semibold">4.9/5 Rating</span>
                                    </div>
                                </div>
                                <h1 className={`text-3xl md:text-5xl ${montserrat.className} text-slate-900 mb-4 tracking-tight`}>{product.name}</h1>
                                <p className="text-slate-500 text-lg leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. FEATURES LIST */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <ShieldCheck className="text-blue-600" /> What's Included
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Instant Delivery via Email/WhatsApp", "4K Ultra HD Streaming Support", "Works on TV, Mobile & PC", "Private Pin Protection", "30-Day Money Back Guarantee", "Premium 24/7 Support"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. FAQ SECTION (Requested) */}
                    <div className="pt-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <HelpCircle className="text-blue-600" /> Frequently Asked Questions
                        </h3>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-bold text-slate-800">{faq.question}</span>
                                        {openFaq === index ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
                                    </button>
                                    <div
                                        className={`bg-slate-50 px-5 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                                            }`}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ================= RIGHT COLUMN (Sticky Purchase Card) ================= */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-6 md:p-8">

                        {/* STEP 1: DURATION SELECTOR */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Choose Plan</h3>
                                    <p className="text-sm text-slate-500">Select your billing cycle</p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {(Object.keys(product.pricing) as Array<keyof typeof product.pricing>).map((key) => {
                                        const price = product.pricing[key];

                                        // 1. Check if price is null
                                        const isUnavailable = price === null;

                                        const isSelected = duration === key;
                                        const isYearly = key === "yearly";

                                        return (
                                            <button
                                                key={key}
                                                // 2. Disable interaction if unavailable
                                                disabled={isUnavailable}
                                                onClick={() => !isUnavailable && setDuration(key)}
                                                className={`w-full relative group p-4 rounded-xl border-2 text-left transition-all duration-200 
                    ${isUnavailable
                                                        ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed grayscale" // Unavailable styles
                                                        : isSelected
                                                            ? "border-blue-600 bg-blue-50 shadow-md"
                                                            : "border-slate-100 hover:border-blue-200 bg-white"
                                                    }`}
                                            >
                                                {/* Only show badge if available */}
                                                {isYearly && !isUnavailable && (
                                                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                        BEST VALUE
                                                    </span>
                                                )}

                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className={`block text-sm font-bold capitalize ${isSelected ? "text-blue-800" : "text-slate-700"}`}>
                                                            {key.replace("_", " ")}
                                                        </span>
                                                        {/* Hide auto-renewal text if unavailable */}
                                                        {!isUnavailable && (
                                                            <span className="text-xs text-slate-400 font-medium">Auto-renewal available</span>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        {/* 3. Logic to show Price or 'Unavailable' */}
                                                        <span className={`block ${isUnavailable ? "text-sm font-bold text-slate-400" : "text-xl font-black"} ${isSelected ? "text-blue-600" : "text-slate-900"}`}>
                                                            {isUnavailable ? "Unavailable" : `$${price}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Total Summary */}
                                <div className="border-t border-slate-200 pt-4 mb-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-500 text-sm font-medium">Total Price</span>
                                        <span className="text-3xl font-black text-slate-900">${product.pricing[duration as keyof typeof product.pricing]}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBuyClick}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight size={20} />
                                </button>

                                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                    <ShieldCheck size={12} /> Secure WhatsApp Checkout
                                </p>
                            </div>
                        )}

                        {/* STEP 2: USER DETAILS */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1">
                                    <ArrowLeft size={12} /> Change Plan
                                </button>

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900">Final Step</h3>
                                    <p className="text-sm text-slate-500">Enter your name to confirm</p>
                                </div>

                                {/* Order Summary Box */}
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-white rounded-lg p-2 shadow-sm">
                                            <img src={product.image} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{product.name}</p>
                                            <p className="text-xs text-slate-500 capitalize">{duration.replace("_", " ")} Plan</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-blue-200/50 mt-2 pt-2 flex justify-between items-center text-sm">
                                        <span className="text-blue-800 font-medium">To Pay:</span>
                                        <span className="text-blue-700 font-black text-lg">${product.pricing[duration as keyof typeof product.pricing]}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="e.g. Alex Smith"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        onClick={handleFinalPurchase}
                                        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={20} /> Checkout on WhatsApp
                                    </button>
                                    <p className="text-[10px] text-center text-slate-400 leading-tight">
                                        By clicking checkout, you will be redirected to WhatsApp to complete your secure payment.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>


                </div>

            </div>
        </div>
    );
}