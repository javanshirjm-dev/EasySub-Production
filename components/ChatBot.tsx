"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    id: number;
    from: "bot" | "user";
    text: string;
    time: string;
    chips?: string[];
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const PRODUCTS: Record<string, { emoji: string; color: string }> = {
    netflix: { emoji: "🎬", color: "#E50914" },
    youtube: { emoji: "▶️", color: "#FF0000" },
    tinder: { emoji: "🔥", color: "#FD5564" },
    canva: { emoji: "🎨", color: "#00C4CC" },
    chatgpt: { emoji: "🤖", color: "#10A37F" },
    gemini: { emoji: "✨", color: "#4285F4" },
    spotify: { emoji: "🎵", color: "#1DB954" },
    amazon: { emoji: "📦", color: "#FF9900" },
    duolingo: { emoji: "🦜", color: "#58CC02" },
};

type KBEntry = { patterns: string[]; response: string; chips?: string[] };

const KB: KBEntry[] = [
    // ── Greetings
    {
        patterns: ["hi", "hello", "hey", "sup", "yo", "good morning", "good evening", "hola", "howdy"],
        response: "Hey there! 👋 Welcome to **EasySub** — your one-stop shop for premium subscriptions at the best prices.\n\nI'm **Subi**, your AI assistant. I can help you with pricing, delivery, features, and anything else about our subscriptions. What are you looking for today?",
        chips: ["See all products", "How does it work?", "Pricing", "Delivery time"],
    },
    {
        patterns: ["how are you", "how r u", "what's up", "wassup"],
        response: "I'm doing great, ready to help you save money on subscriptions! 😄 EasySub has the best deals on Netflix, Spotify, ChatGPT, and more.\n\nWhat can I help you with?",
        chips: ["Show me deals", "Netflix", "Spotify", "ChatGPT Pro"],
    },

    // ── How it works
    {
        patterns: ["how does it work", "how it works", "explain", "what is easysub", "about easysub", "what do you do"],
        response: "Here's how **EasySub** works in 3 simple steps:\n\n1️⃣ **Choose** your subscription from our catalog\n2️⃣ **Pay** securely — we accept cards, crypto & more\n3️⃣ **Receive** your account credentials instantly via email or WhatsApp\n\nAll accounts are 100% working, tested before delivery, and come with a **replacement guarantee** if anything goes wrong! 🛡️",
        chips: ["Payment methods", "Delivery time", "Guarantee policy", "See products"],
    },

    // ── All products
    {
        patterns: ["all products", "what do you sell", "what do you have", "catalog", "list", "show products", "everything", "full list"],
        response: "Here's everything we offer at EasySub:\n\n🎬 **Netflix Premium** — from $4.99/mo\n▶️ **YouTube Premium** — from $5.99/mo\n🔥 **Tinder Gold** — from $9.99/mo\n🎨 **Canva Pro** — from $3.99/mo\n🤖 **ChatGPT Plus** — from $8.99/mo\n✨ **Gemini Advanced** — from $6.99/mo\n🎵 **Spotify Premium** — from $3.49/mo\n📦 **Amazon Prime** — from $5.99/mo\n🦜 **Duolingo Super** — from $2.99/mo\n\nAll prices are significantly cheaper than official rates! 💸",
        chips: ["Netflix", "Spotify", "ChatGPT Pro", "How to order"],
    },

    // ── Netflix
    {
        patterns: ["netflix", "netflix premium", "netflix plan", "netflix price", "netflix cost", "stream", "4k streaming"],
        response: "🎬 **Netflix Premium** at EasySub:\n\n• **Price:** $4.99/month (official: $22.99)\n• **Quality:** Full 4K UHD + HDR\n• **Screens:** Up to 4 simultaneous screens\n• **Downloads:** Yes, for offline viewing\n• **Delivery:** Instant after payment\n\nYou save up to **78%** vs the official price! We provide a dedicated profile on a shared Premium account — you get your own PIN and profile name. 🍿",
        chips: ["How to order Netflix", "Netflix delivery", "Netflix guarantee", "Other streaming"],
    },
    {
        patterns: ["netflix profile", "netflix account", "netflix shared", "netflix how"],
        response: "Great question! Here's how our **Netflix accounts** work:\n\n✅ You get your **own profile** on a Premium plan\n✅ You can set your own **profile name & avatar**\n✅ Your **watch history stays private** to your profile\n✅ Full access to **all Netflix content** in your region\n✅ Works on **TV, phone, tablet, laptop** — all devices\n\nNote: You'll be sharing the main account billing, but your profile is 100% yours. If there's any issue, we replace instantly! 🔄",
        chips: ["Order Netflix now", "Delivery time", "Guarantee"],
    },

    // ── YouTube Premium
    {
        patterns: ["youtube", "youtube premium", "yt premium", "youtube music", "ad free youtube", "youtube price"],
        response: "▶️ **YouTube Premium** at EasySub:\n\n• **Price:** $5.99/month (official: $13.99)\n• **Ad-free:** 100% no ads on all videos\n• **Background play:** Music keeps playing when screen is off\n• **YouTube Music:** Full streaming included\n• **Downloads:** Save videos & music offline\n• **Delivery:** Within 1–2 hours\n\nPerfect if you're tired of ads interrupting your videos! 🙌",
        chips: ["Order YouTube Premium", "Spotify instead?", "How delivery works"],
    },
    {
        patterns: ["youtube vs spotify", "youtube or spotify", "music streaming", "which music"],
        response: "Great question! Here's a quick comparison:\n\n🎵 **Spotify Premium** ($3.49/mo)\n→ Best for music discovery, playlists, podcasts\n→ 100M+ songs, amazing algorithm\n→ No YouTube integration\n\n▶️ **YouTube Premium** ($5.99/mo)\n→ Ad-free videos + YouTube Music\n→ Background play on mobile\n→ Access to YouTube Originals\n\n**Our pick:** Get Spotify if you mainly listen to music. Get YouTube Premium if you watch a lot of YouTube. Some customers grab both! 😄",
        chips: ["Get Spotify", "Get YouTube Premium", "Bundle deals"],
    },

    // ── Tinder Gold
    {
        patterns: ["tinder", "tinder gold", "tinder price", "tinder cost", "dating", "tinder features", "tinder platinum"],
        response: "🔥 **Tinder Gold** at EasySub:\n\n• **Price:** $9.99/month (official: $29.99)\n• **See who liked you** before swiping\n• **Unlimited Likes** — no daily cap\n• **5 Super Likes** per day\n• **1 Boost** per month (top of the stack)\n• **Passport** — swipe anywhere in the world\n• **Rewind** last swipe\n• **Delivery:** Within 2 hours\n\nYou save **67%** vs the official price! 💪",
        chips: ["How Tinder delivery works", "Order Tinder Gold", "Other social apps"],
    },

    // ── Canva Pro
    {
        patterns: ["canva", "canva pro", "canva price", "design", "canva features", "graphic design", "canva team"],
        response: "🎨 **Canva Pro** at EasySub:\n\n• **Price:** $3.99/month (official: $14.99)\n• **Premium templates:** 610,000+ templates\n• **Brand Kit:** Custom fonts, colors, logos\n• **Background Remover:** One-click tool\n• **Magic Resize:** Instant format switching\n• **100GB** cloud storage\n• **Schedule social posts** directly from Canva\n• **AI image generation** included\n• **Delivery:** Instant\n\nPerfect for designers, marketers, and content creators! 🖌️",
        chips: ["Order Canva Pro", "ChatGPT Pro instead?", "How delivery works"],
    },

    // ── ChatGPT / GPT Plus
    {
        patterns: ["chatgpt", "gpt", "gpt-4", "openai", "chatgpt plus", "chatgpt pro", "ai chat", "gpt4"],
        response: "🤖 **ChatGPT Plus** at EasySub:\n\n• **Price:** $8.99/month (official: $20/mo)\n• **GPT-4o** — fastest, smartest model\n• **DALL·E 3** image generation\n• **Code Interpreter** & data analysis\n• **Custom GPTs** access\n• **Priority access** — no wait times\n• **Browsing** — real-time web search\n• **Delivery:** 1–3 hours\n\nThis is the most powerful AI assistant available — worth every cent! 🧠",
        chips: ["ChatGPT vs Gemini", "Order ChatGPT Plus", "What can ChatGPT do?"],
    },
    {
        patterns: ["chatgpt vs gemini", "gemini vs chatgpt", "which ai", "best ai", "ai comparison", "compare ai"],
        response: "Here's an honest comparison:\n\n🤖 **ChatGPT Plus** ($8.99/mo)\n→ Best for: Writing, coding, complex reasoning\n→ GPT-4o is incredible for long documents\n→ DALL·E 3 for image generation\n→ Huge plugin & GPT ecosystem\n\n✨ **Gemini Advanced** ($6.99/mo)\n→ Best for: Google Workspace integration\n→ Deeply connected to Gmail, Docs, Drive\n→ Great for research with Google Search\n→ Multimodal — image, video, audio\n\n**Our verdict:** Coders & writers → ChatGPT. Google users → Gemini. Power users grab both! 💡",
        chips: ["Get ChatGPT Plus", "Get Gemini", "Get both"],
    },
    {
        patterns: ["what can chatgpt do", "chatgpt uses", "chatgpt for what"],
        response: "ChatGPT Plus can help you with SO much:\n\n✍️ **Writing** — emails, essays, articles, scripts\n💻 **Coding** — debug, write, explain code in any language\n📊 **Data** — analyze spreadsheets, create charts\n🎨 **Images** — generate art with DALL·E 3\n🔍 **Research** — browse the web for live info\n🗣️ **Languages** — translate & learn new languages\n📋 **Summarize** — condense long docs in seconds\n🧮 **Math** — solve complex equations step by step\n\nEssentially your personal AI assistant for anything! 🚀",
        chips: ["Order ChatGPT Plus", "ChatGPT vs Gemini"],
    },

    // ── Gemini
    {
        patterns: ["gemini", "gemini advanced", "google ai", "google gemini", "bard", "gemini price"],
        response: "✨ **Gemini Advanced** at EasySub:\n\n• **Price:** $6.99/month (official: $19.99)\n• **Gemini Ultra 1.0** — most capable model\n• **Google Workspace** deep integration\n• **1TB Google One** storage\n• **Multimodal** — understands images, video, audio\n• **Real-time Google Search** integration\n• **Works inside Gmail & Docs**\n• **Delivery:** 1–3 hours\n\nBest for people already in the Google ecosystem! 🌐",
        chips: ["Gemini vs ChatGPT", "Order Gemini", "Other AI tools"],
    },

    // ── Spotify
    {
        patterns: ["spotify", "spotify premium", "music", "spotify price", "spotify cost", "podcast", "spotify features"],
        response: "🎵 **Spotify Premium** at EasySub:\n\n• **Price:** $3.49/month (official: $10.99)\n• **Ad-free** music & podcasts\n• **Offline downloads** — listen anywhere\n• **Unlimited skips** — no more limits\n• **High quality audio** — up to 320kbps\n• **100M+ songs** + 5M+ podcasts\n• **Spotify AI DJ** — personalized radio\n• **Delivery:** Instant\n\nThe cheapest way to enjoy Spotify Premium! 🎧",
        chips: ["Order Spotify", "YouTube Music vs Spotify", "Bundle with Netflix?"],
    },

    // ── Amazon Prime
    {
        patterns: ["amazon", "amazon prime", "prime video", "prime delivery", "amazon prime price", "prime features"],
        response: "📦 **Amazon Prime** at EasySub:\n\n• **Price:** $5.99/month (official: $14.99)\n• **Prime Video** — thousands of movies & shows\n• **Amazon Originals** — exclusive content\n• **Free fast shipping** on Amazon orders\n• **Prime Music** — 100M+ songs\n• **Prime Reading** — ebooks & magazines\n• **Amazon Photos** — unlimited photo storage\n• **Twitch Prime** — free games & channel sub\n• **Delivery:** Within 2 hours\n\nIncredible value — video, music, shipping, AND more! 🌟",
        chips: ["Order Amazon Prime", "Amazon vs Netflix", "How delivery works"],
    },
    {
        patterns: ["amazon vs netflix", "prime video vs netflix", "which streaming", "best streaming"],
        response: "Streaming showdown! 🍿\n\n🎬 **Netflix Premium** ($4.99/mo)\n→ Larger, more diverse content library\n→ Better original series (Stranger Things, Wednesday)\n→ Superior 4K HDR quality\n→ No extra perks\n\n📦 **Amazon Prime** ($5.99/mo)\n→ Solid content library + great originals\n→ BONUS: Free shipping, Music, Reading, Photos\n→ Best value overall if you shop on Amazon\n\n**Winner for pure streaming:** Netflix\n**Winner for overall value:** Amazon Prime\n\nMany customers subscribe to both! 😄",
        chips: ["Get Netflix", "Get Amazon Prime", "Get both"],
    },

    // ── Duolingo
    {
        patterns: ["duolingo", "duolingo super", "duolingo plus", "language learning", "learn language", "duolingo price"],
        response: "🦜 **Duolingo Super** at EasySub:\n\n• **Price:** $2.99/month (official: $6.99)\n• **No ads** — distraction-free learning\n• **Unlimited hearts** — never run out of lives\n• **Legendary challenges** unlock\n• **Progress quizzes** — test your level\n• **Unlimited test-outs** — skip boring levels\n• **40+ languages** available\n• **Offline mode** — learn without internet\n• **Delivery:** Instant\n\nThe most affordable subscription we offer, and the most fun! 🌍",
        chips: ["Order Duolingo Super", "Which language to learn?", "Other subscriptions"],
    },

    // ── Pricing / Deals
    {
        patterns: ["price", "prices", "pricing", "cost", "how much", "cheapest", "discount", "deal", "cheap", "affordable", "save money"],
        response: "Here are our best prices today 💰:\n\n🦜 Duolingo Super → **$2.99/mo**\n🎵 Spotify Premium → **$3.49/mo**\n🎨 Canva Pro → **$3.99/mo**\n🎬 Netflix Premium → **$4.99/mo**\n▶️ YouTube Premium → **$5.99/mo**\n📦 Amazon Prime → **$5.99/mo**\n✨ Gemini Advanced → **$6.99/mo**\n🤖 ChatGPT Plus → **$8.99/mo**\n🔥 Tinder Gold → **$9.99/mo**\n\nAll prices are **60–80% cheaper** than official! 🎉",
        chips: ["How to order", "Payment methods", "Bundle discount?"],
    },

    // ── Delivery
    {
        patterns: ["delivery", "how long", "when will i get", "delivery time", "how fast", "instant", "receive"],
        response: "⚡ Our delivery times:\n\n• **Instant (0–5 min):** Spotify, Canva, Duolingo\n• **Fast (1–3 hours):** Netflix, ChatGPT, Gemini\n• **Standard (2–4 hours):** YouTube, Amazon, Tinder\n\nYou'll receive your credentials via **email** and optionally via **WhatsApp**. We're available 24/7 so there's never a long wait! 🚀\n\nMost orders are fulfilled within **1 hour** on average.",
        chips: ["Payment methods", "What if I don't receive it?", "How to order"],
    },

    // ── Payment
    {
        patterns: ["payment", "pay", "how to pay", "payment method", "card", "crypto", "paypal", "visa", "mastercard"],
        response: "💳 We accept multiple payment methods:\n\n• **Credit/Debit Cards** — Visa, Mastercard, Amex\n• **PayPal** — fast and secure\n• **Cryptocurrency** — Bitcoin, USDT, ETH\n• **Bank Transfer** — for large orders\n• **Local payment** — contact us for options\n\nAll payments are **SSL encrypted** and 100% secure. We never store your card details! 🔒",
        chips: ["Is it safe to pay?", "How to order", "Delivery time"],
    },

    // ── Safety / Trust
    {
        patterns: ["safe", "legit", "trust", "scam", "real", "fake", "is it safe", "secure", "reliable", "legitimate"],
        response: "Great question — your trust matters to us! Here's why EasySub is 100% safe:\n\n✅ **1,000+ happy customers** and counting\n✅ **Replacement guarantee** — if it breaks, we fix it free\n✅ **24/7 support** via WhatsApp & email\n✅ **SSL secured** checkout\n✅ **Real accounts** — tested before every delivery\n✅ **Transparent pricing** — no hidden fees\n\nWe've been operating since 2022 and have built a reputation for reliability. Check our reviews! ⭐⭐⭐⭐⭐",
        chips: ["Guarantee policy", "Contact support", "How to order"],
    },

    // ── Guarantee
    {
        patterns: ["guarantee", "warranty", "refund", "replacement", "broken", "not working", "issue", "problem", "help"],
        response: "🛡️ Our **Guarantee Policy**:\n\n• If your account stops working → **Free instant replacement**\n• If you're not satisfied → **We'll make it right**\n• If delivery takes too long → **Priority resend immediately**\n\n⏱️ Guarantee duration:\n→ 1-month plans: 30-day guarantee\n→ 3-month plans: Full 90-day coverage\n→ 6-month plans: Full 180-day coverage\n\nSimply message us on WhatsApp and we'll sort it within minutes! 💪",
        chips: ["Contact support", "Payment methods", "How to order"],
    },

    // ── Order / Buy
    {
        patterns: ["how to order", "how to buy", "purchase", "buy now", "place order", "get subscription", "order"],
        response: "Ordering is super easy! Here's how:\n\n1️⃣ Browse our product catalog on the website\n2️⃣ Click **Buy Now** on the subscription you want\n3️⃣ Choose your plan duration (1, 3, or 6 months)\n4️⃣ Complete payment securely\n5️⃣ Receive your credentials via **email or WhatsApp**\n6️⃣ Log in and enjoy! 🎉\n\nTotal time from order to access: **under 3 hours** on average. Need help? Message us directly on WhatsApp anytime!",
        chips: ["Payment methods", "Delivery time", "What's included?"],
    },

    // ── Bundle
    {
        patterns: ["bundle", "combo", "multiple", "both", "package", "two subscriptions", "all in one"],
        response: "🎁 **Bundle & Save!**\n\nWe offer special discounts when you order multiple subscriptions:\n\n• **2 subscriptions** → 5% extra off\n• **3 subscriptions** → 10% extra off\n• **4+ subscriptions** → 15% extra off\n\nPopular combos our customers love:\n🎬+🎵 Netflix + Spotify — Ultimate entertainment\n🤖+✨ ChatGPT + Gemini — AI power duo\n🎨+🤖 Canva + ChatGPT — Creator's toolkit\n🎵+🦜 Spotify + Duolingo — Learn & listen\n\nContact us on WhatsApp to set up your bundle! 📲",
        chips: ["Contact for bundle", "All products", "Pricing"],
    },

    // ── Support / Contact
    {
        patterns: ["contact", "support", "whatsapp", "email", "talk to human", "agent", "help me", "customer service"],
        response: "📲 **Contact EasySub Support:**\n\n• **WhatsApp:** +994 51 597 8888\n• **Response time:** Usually under 5 minutes\n• **Hours:** 24/7 — we never sleep! 😄\n\nOr use the **Request Card** on our homepage to send us a direct message about any product you need.\n\nDon't hesitate to reach out — we love hearing from customers! 💙",
        chips: ["Send WhatsApp", "Guarantee policy", "Back to products"],
    },

    // ── Fallback handled separately
];

// ─── Match logic ──────────────────────────────────────────────────────────────
function getBotResponse(input: string): { response: string; chips?: string[] } {
    const lower = input.toLowerCase().trim();
    for (const entry of KB) {
        if (entry.patterns.some((p) => lower.includes(p))) {
            return { response: entry.response, chips: entry.chips };
        }
    }
    return {
        response: "Hmm, I'm not sure about that one! 🤔 But I'm here to help with anything about our subscriptions.\n\nYou can ask me about:\n• Specific products (Netflix, Spotify, etc.)\n• Pricing & deals\n• Delivery time\n• Payment methods\n• Guarantees & support\n\nOr type **'all products'** to see everything we offer! 😊",
        chips: ["All products", "Pricing", "Contact support", "How to order"],
    };
}

// ─── Time helper ──────────────────────────────────────────────────────────────
const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── Typing dots ─────────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-400"
                    style={{
                        animation: `typingBounce 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                    }}
                />
            ))}
        </div>
    );
}

// ─── Markdown-ish renderer ────────────────────────────────────────────────────
function RenderText({ text }: { text: string }) {
    const lines = text.split("\n");
    return (
        <div className="flex flex-col gap-0.5">
            {lines.map((line, i) => {
                const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                return (
                    <p
                        key={i}
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: bold || "&nbsp;" }}
                    />
                );
            })}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function EasySubChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            from: "bot",
            text: "👋 Hi! I'm **Subi**, EasySub's AI assistant.\n\nI can answer anything about our subscriptions — pricing, delivery, features, and more. What can I help you with?",
            time: getTime(),
            chips: ["See all products", "Pricing", "How to order", "Delivery time"],
        },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [unread, setUnread] = useState(1);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    useEffect(() => {
        if (open) setUnread(0);
    }, [open]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        const userMsg: Message = { id: Date.now(), from: "user", text, time: getTime() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setTyping(true);

        const delay = 600 + Math.random() * 800;
        setTimeout(() => {
            const { response, chips } = getBotResponse(text);
            const botMsg: Message = {
                id: Date.now() + 1,
                from: "bot",
                text: response,
                time: getTime(),
                chips,
            };
            setTyping(false);
            setMessages((prev) => [...prev, botMsg]);
            if (!open) setUnread((n) => n + 1);
        }, delay);
    };

    return (
        <>
            <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
        .chat-window { animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .msg-bubble { animation: fadeIn 0.25s ease forwards; }
        .fab-btn { animation: pulse-ring 2s ease-out infinite; }
        .chip:hover { background: #3b82f6; color: white; border-color: #3b82f6; }
        .send-btn:not(:disabled):hover { background: #2563eb; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
      `}</style>

            {/* FAB */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="fab-btn fixed bottom-9 right-9 z-50 w-14 h-14 rounded-full bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
                style={{ boxShadow: "0 8px 32px rgba(59,130,246,0.45)" }}
            >
                {open ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
                {!open && unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </button>

            {/* Chat window */}
            {open && (
                <div
                    className="chat-window fixed bottom-28 right-9 z-50 w-[330px] max-w-[calc(100vw-24px)] rounded-[24px] overflow-hidden flex flex-col bg-white"
                    style={{
                        height: "500px",
                        boxShadow: "0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center gap-3 px-4 py-3.5"
                        style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" }}
                    >
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold text-white">
                                S
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold text-sm leading-none">Subi</p>
                            <p className="text-blue-100 text-[11px] mt-0.5">EasySub Assistant • Online</p>
                        </div>

                    </div>



                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`msg-bubble flex flex-col gap-1.5 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                                {msg.from === "bot" && (
                                    <div className="flex items-end gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-0.5">S</div>
                                        <div
                                            className="max-w-[82%] rounded-[18px] rounded-bl-[4px] px-4 py-3 bg-white text-gray-800"
                                            style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}
                                        >
                                            <RenderText text={msg.text} />
                                            <p className="text-[10px] text-gray-300 mt-1.5 text-right">{msg.time}</p>
                                        </div>
                                    </div>
                                )}

                                {msg.from === "user" && (
                                    <div
                                        className="max-w-[82%] rounded-[18px] rounded-br-[4px] px-4 py-3 text-white text-sm"
                                        style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                                    >
                                        <p className="leading-relaxed">{msg.text}</p>
                                        <p className="text-[10px] text-blue-200 mt-1.5 text-right">{msg.time}</p>
                                    </div>
                                )}

                                {/* Quick chips */}
                                {msg.from === "bot" && msg.chips && (
                                    <div className="flex flex-wrap gap-1.5 pl-8 max-w-[92%]">
                                        {msg.chips.map((chip) => (
                                            <button
                                                key={chip}
                                                onClick={() => sendMessage(chip)}
                                                className="chip text-[11px] font-medium px-3 py-1.5 rounded-full border border-blue-200 text-blue-500 bg-white transition-all duration-150"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {typing && (
                            <div className="msg-bubble flex items-end gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">S</div>
                                <div className="bg-white rounded-[18px] rounded-bl-[4px]" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}>
                                    <TypingDots />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggested topics */}
                    <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-white border-t border-gray-100" style={{ scrollbarWidth: "none" }}>
                        {["Netflix", "Spotify", "ChatGPT", "Pricing", "Delivery"].map((s) => (
                            <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                className="flex-shrink-0 text-[11px] font-semibold text-gray-500 bg-gray-100 hover:bg-blue-50 hover:text-blue-500 px-3 py-1.5 rounded-full transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim()}
                            className="send-btn w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}