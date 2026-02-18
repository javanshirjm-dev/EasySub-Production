"use client";

import { useState } from "react";

export default function RequestCard() {
    const [productName, setProductName] = useState("");

    const phoneNumber = "994515978888";

    const handleSend = () => {
        if (!productName.trim()) return;
        const message = `Hello! I am looking for a product that is not listed on your website: ${productName}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        setProductName("");
    };

    return (
        <div
            className="h-full rounded-[2rem] p-4 overflow-hidden relative z-10 flex flex-col"
            style={{
                background: "linear-gradient(145deg, #a0a0a0, #6b6b6b)",

                boxShadow: "inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.4), 4px 4px 12px rgba(0,0,0,0.4)",
                border: "3px solid #555",
            }}
        >
            {/* TV Screen */}
            <div
                className="rounded-[1.5rem] relative overflow-hidden flex flex-col gap-4 p-4"
                style={{
                    background: "radial-gradient(ellipse at 40% 35%, #f0f0f0 0%, #cccccc 50%, #aaaaaa 100%)",
                    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.3)",
                    minHeight: "220px",
                    border: "3px solid #333",
                }}
            >
                {/* Scanlines overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
                    }}
                />
                {/* Screen glare */}
                <div
                    className="absolute top-2 left-3 w-1/3 h-1/4 pointer-events-none z-10 rounded-full"
                    style={{
                        background: "radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 80%)",
                        transform: "rotate(-20deg)",
                    }}
                />

                {/* Content */}
                <div className="relative z-20">
                    <h3
                        className="text-xl text-black font-bold"
                        style={{

                            textShadow: "0 1px 2px rgba(255,255,255,0.3)",
                            fontFamily: "monospace",
                        }}
                    >
                        Can't find it? 🔍
                    </h3>
                    <p
                        className="text-sm text-black mt-1"
                        style={{ fontFamily: "monospace" }}
                    >
                        Type the name of the subscription or product you are looking for, and we will get it for you!
                    </p>
                </div>

                <div className="flex flex-col gap-2 relative z-20">
                    <input
                        type="text"
                        placeholder="Type product name..."
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        style={{
                            background: "rgba(0,0,0,0.3)",
                            border: "2px solid #444",
                            borderRadius: "14px",
                            padding: "10px 14px",
                            color: "white",
                            fontFamily: "monospace",
                            fontSize: "16px",
                            outline: "none",
                            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#888")}
                        onBlur={(e) => (e.target.style.borderColor = "#444")}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!productName.trim()}
                        style={{
                            background: productName.trim()
                                ? "linear-gradient(145deg, #555, #333)"
                                : "linear-gradient(145deg, #888, #666)",
                            border: "2px solid #222",
                            borderRadius: "14px",
                            fontSize: "16px",
                            padding: "10px 16px",
                            color: productName.trim() ? "#e0e0e0" : "#aaa",
                            fontFamily: "monospace",
                            fontWeight: "bold",
                            cursor: productName.trim() ? "pointer" : "not-allowed",
                            boxShadow: productName.trim()
                                ? "0 3px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.1)"
                                : "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s",
                        }}
                    >
                        <span>Request</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>

            {/* TV bottom bar with knobs */}
            <div className="flex items-center justify-between mt-3 px-2">
                <div className="flex gap-2">
                    {/* Knobs */}
                    {["#888", "#777"].map((c, i) => (
                        <div
                            key={i}
                            style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: `radial-gradient(circle at 35% 35%, ${c}, #333)`,
                                border: "2px solid #222",
                                boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                            }}
                        />
                    ))}
                </div>
                {/* Speaker grille dots */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: "4px",
                                height: "14px",
                                borderRadius: "2px",
                                background: "#444",
                                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                            }}
                        />
                    ))}
                </div>
                {/* Power indicator */}
                <div
                    style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 40% 40%, #88ff88, #228822)",
                        boxShadow: "0 0 6px rgba(80,255,80,0.7)",
                    }}
                />
            </div>
        </div>

    );
}