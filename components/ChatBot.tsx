"use client";

import { useState, useRef, useEffect } from "react";
// 👇 IMPORT YOUR PRODUCTS HERE
import { products } from "@/data/products";

type Message = {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
};

/* ─────────────── tiny CSS injected once ─────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes chat-rise {
    from { opacity: 0; transform: translateY(14px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes bubble-in-left {
    from { opacity: 0; transform: translateX(-10px) scale(0.95); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes bubble-in-right {
    from { opacity: 0; transform: translateX(10px) scale(0.95); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes dot-wave {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30%           { transform: translateY(-5px); opacity: 1; }
  }
  @keyframes widget-pop {
    0%   { opacity: 0; transform: scale(0.8) translateY(20px); }
    60%  { transform: scale(1.03) translateY(-4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes widget-close {
    from { opacity: 1; transform: scale(1) translateY(0); }
    to   { opacity: 0; transform: scale(0.88) translateY(16px); }
  }
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
    50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position:  200% center; }
  }

  .chat-widget-root * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

  .chat-window-enter { animation: widget-pop  0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
  .chat-window-exit  { animation: widget-close 0.26s cubic-bezier(0.4,0,1,1) forwards; }

  .msg-left  { animation: bubble-in-left  0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
  .msg-right { animation: bubble-in-right 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }

  .dot-1 { animation: dot-wave 1.2s ease-in-out infinite; }
  .dot-2 { animation: dot-wave 1.2s ease-in-out 0.18s infinite; }
  .dot-3 { animation: dot-wave 1.2s ease-in-out 0.36s infinite; }

  .fab-btn { animation: glow-pulse 2.4s ease-in-out infinite; }

  .send-btn:not(:disabled):hover { transform: scale(1.1) rotate(-8deg); }
  .send-btn { transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s; }

  .input-field:focus-within {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 2px 12px rgba(0,0,0,0.06);
  }

  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

  .status-dot { animation: dot-wave 2s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg, #a5b4fc 0%, #e0e7ff 40%, #a5b4fc 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 2.5s linear infinite;
  }
`;

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showWindow, setShowWindow] = useState(false);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "👋 Hey! Ask me about any product price or availability — like 'How much is Netflix?'",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const toggleChat = () => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setShowWindow(false);
                setIsOpen(false);
                setIsAnimating(false);
            }, 240);
        } else {
            setIsOpen(true);
            setShowWindow(true);
            setTimeout(() => inputRef.current?.focus(), 450);
        }
    };

    const generateResponse = (text: string) => {
        const lowerText = text.toLowerCase();

        const foundProducts = products.filter(
            (p) =>
                lowerText.includes(p.name.toLowerCase()) ||
                (p.category &&
                    lowerText.includes(p.category.toLowerCase()) &&
                    lowerText.length > 3) ||
                lowerText.includes(p.name.split(" ")[0].toLowerCase())
        );

        if (foundProducts.length > 0) {
            if (foundProducts.length === 1) {
                const p = foundProducts[0];
                return `Found it! ✦\n\n${p.name}\n💰 From $${p.pricing.monthly}/mo\n✨ ${p.description}`;
            } else {
                const list = foundProducts.map((p) => `• ${p.name}: ${p.pricing}`).join("\n");
                return `Here are a few options:\n\n${list}\n\nWhich one interests you?`;
            }
        }

        if (lowerText.includes("hello") || lowerText.includes("hi"))
            return "Hey there! 👋 Ask me about any subscription price.";
        if (lowerText.includes("support") || lowerText.includes("help"))
            return "For support, email us or tap the WhatsApp button on the site. 💬";
        if (lowerText.includes("safe") || lowerText.includes("legit"))
            return "Absolutely! Every product comes with a full warranty. 🛡️";

        return "I couldn't find that one. Try just the name — like 'Spotify' or 'VPN'. 🔍";
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userText = input;
        setInput("");

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: userText, sender: "user", timestamp: new Date() },
        ]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: generateResponse(userText),
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
        }, 1100);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div
                className="chat-widget-root"
                style={{
                    position: "fixed",
                    bottom: 28,
                    right: 28,
                    zIndex: 999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 16,
                }}
            >
                {/* ── Chat Window ── */}
                {showWindow && (
                    <div
                        className={isAnimating ? "chat-window-exit" : "chat-window-enter"}
                        style={{
                            width: 356,
                            maxWidth: "92vw",
                            borderRadius: 28,
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.72)",
                            backdropFilter: "blur(40px) saturate(180%)",
                            WebkitBackdropFilter: "blur(40px) saturate(180%)",
                            border: "1px solid rgba(255,255,255,0.6)",
                            boxShadow:
                                "0 32px 80px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                background: "linear-gradient(135deg, #0f0f14 0%, #1a1a2e 50%, #16213e 100%)",
                                padding: "20px 22px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Ambient glow orbs */}
                            <div style={{
                                position: "absolute", top: -30, right: -20,
                                width: 120, height: 120,
                                background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute", bottom: -40, left: 40,
                                width: 80, height: 80,
                                background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />

                            <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
                                {/* Avatar */}
                                <div style={{ position: "relative" }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: "50%",
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 20,
                                        boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                                    }}>
                                        ✦
                                    </div>
                                    <span className="status-dot" style={{
                                        position: "absolute", bottom: 1, right: 1,
                                        width: 11, height: 11,
                                        background: "#34d399",
                                        border: "2px solid #0f0f14",
                                        borderRadius: "50%",
                                        display: "block",
                                    }} />
                                </div>
                                <div>
                                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>
                                        Product AI
                                    </div>
                                    <div className="shimmer-text" style={{ fontSize: 12, fontWeight: 400 }}>
                                        Live · Searching database
                                    </div>
                                </div>
                            </div>

                            {/* Close */}
                            <button
                                onClick={toggleChat}
                                style={{
                                    width: 32, height: 32, borderRadius: "50%",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "rgba(255,255,255,0.6)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", transition: "all 0.2s",
                                    position: "relative", zIndex: 1,
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
                                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            className="scrollbar-hide"
                            style={{
                                height: 380,
                                overflowY: "auto",
                                padding: "20px 18px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                                background: "linear-gradient(180deg, rgba(248,249,255,0.6) 0%, rgba(255,255,255,0.4) 100%)",
                            }}
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={msg.sender === "user" ? "msg-right" : "msg-left"}
                                    style={{
                                        display: "flex",
                                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    {msg.sender === "bot" && (
                                        <div style={{
                                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 12, marginRight: 8, marginTop: 2,
                                            boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                                        }}>
                                            ✦
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            maxWidth: "78%",
                                            padding: "11px 16px",
                                            borderRadius: msg.sender === "user"
                                                ? "20px 20px 6px 20px"
                                                : "20px 20px 20px 6px",
                                            fontSize: 14,
                                            lineHeight: 1.55,
                                            letterSpacing: "-0.01em",
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            ...(msg.sender === "user"
                                                ? {
                                                    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                                                    color: "#fff",
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                                }
                                                : {
                                                    background: "rgba(255,255,255,0.85)",
                                                    color: "#1a1a2e",
                                                    border: "1px solid rgba(99,102,241,0.1)",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                                }),
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="msg-left" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 12, flexShrink: 0,
                                        boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                                    }}>
                                        ✦
                                    </div>
                                    <div style={{
                                        padding: "12px 18px",
                                        borderRadius: "20px 20px 20px 6px",
                                        background: "rgba(255,255,255,0.85)",
                                        border: "1px solid rgba(99,102,241,0.1)",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                        display: "flex", alignItems: "center", gap: 5,
                                    }}>
                                        <span className="dot-1" style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "block" }} />
                                        <span className="dot-2" style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "block" }} />
                                        <span className="dot-3" style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "block" }} />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: "14px 16px 18px",
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(20px)",
                            borderTop: "1px solid rgba(99,102,241,0.08)",
                        }}>
                            <div
                                className="input-field"
                                style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "rgba(255,255,255,0.9)",
                                    border: "1.5px solid rgba(99,102,241,0.18)",
                                    borderRadius: 50,
                                    padding: "8px 8px 8px 18px",
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                                }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Ask about any product…"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    style={{
                                        flex: 1, border: "none", outline: "none",
                                        background: "transparent",
                                        fontSize: 14, color: "#1a1a2e",
                                        letterSpacing: "-0.01em",
                                        fontFamily: "inherit",
                                    }}
                                />
                                <button
                                    className="send-btn"
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    style={{
                                        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                                        background: input.trim()
                                            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                            : "rgba(99,102,241,0.12)",
                                        border: "none", cursor: input.trim() ? "pointer" : "default",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: input.trim() ? "#fff" : "rgba(99,102,241,0.4)",
                                        boxShadow: input.trim() ? "0 4px 14px rgba(99,102,241,0.4)" : "none",
                                        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                                    }}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </div>

                            {/* Hint */}
                            <p style={{
                                textAlign: "center", marginTop: 10, marginBottom: 0,
                                fontSize: 11, color: "rgba(99,102,241,0.5)", letterSpacing: "0.02em",
                            }}>
                                Press ↵ to send · Powered by AI
                            </p>
                        </div>
                    </div>
                )}

                {/* ── FAB Trigger Button ── */}
                <button
                    className="fab-btn"
                    onClick={toggleChat}
                    style={{
                        width: 60, height: 60, borderRadius: "50%", border: "none",
                        cursor: "pointer",
                        background: isOpen
                            ? "rgba(255,255,255,0.9)"
                            : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                        color: isOpen ? "#6366f1" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        boxShadow: isOpen
                            ? "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)"
                            : "0 8px 32px rgba(99,102,241,0.45), 0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = `rotate(${isOpen ? "90deg" : "-8deg"}) scale(1.1)`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = `rotate(${isOpen ? "90deg" : "0deg"}) scale(1)`; }}
                >
                    {isOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}