export const products = [
    {
        id: "netflix",
        name: "Netflix Premium",
        category: "video",
        image: "/images/netflix.png",
        description: "4K UHD streaming, 4 screens allowed.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 4.99,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "youtube",
        name: "YouTube Premium",
        category: "video",
        image: "/images/yotube.png",
        description: "Ad-free videos, background play, and YouTube Music.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 5.99,
            six_months: null,
            yearly: 59.99,
        },
    },
    {
        id: "tinder",
        name: "Tinder Gold",
        category: "social",
        image: "https://ca.tinderpressroom.com/download/Wordmark-R+Tinder+pink-RGB.png",
        description: "See who liked you, boost your profile, and more.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 9.99,
            six_months: 49.99,
            yearly: null,
        },
    },
    {
        id: "amazon",
        name: "Amazon Prime Video",
        category: "video",
        image: "https://download.logo.wine/logo/Amazon_Prime/Amazon_Prime-Logo.wine.png",
        description: "Access to exclusive Amazon Originals and more.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: null,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "duolingo",
        name: "Duolingo Plus",
        category: "education",
        image: "https://www.pngmart.com/files/23/Duolingo-PNG-Clipart.png",
        description: "Unlock all languages, no ads, and offline learning.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 4.99,
            six_months: 24.99,
            yearly: 49.99,
        },
    },
    {
        id: "spotify",
        name: "Spotify Premium",
        category: "music",
        image: "/images/spotify.png",
        description: "Ad-free music listening, offline playback.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 3.50,
            six_months: 17.99,
            yearly: 30.99,
        },
    },
    {
        id: "chatgpt",
        name: "ChatGPT Pro Plan",
        category: "ai",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png",
        description: "Faster response times, priority access to new features.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 6.99,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "canva",
        name: "Canva Pro",
        category: "design",
        image: "/images/canva.png",
        description: "Advanced design tools, templates, and stock assets.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 2.99,
            six_months: 14.99,
            yearly: 26.99,
        },
    },
    {
        id: "gemini",
        name: "Gemini Pro",
        category: "ai",
        image: "https://crystalpng.com/wp-content/uploads/2025/11/Gemini-logo.png",
        description: "Advanced AI capabilities for creative and professional tasks.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 4.99,
            six_months: null,
            yearly: 19.99,
        },
    },
    {
        id: "midjourney",
        name: "Midjourney Pro",
        category: "ai",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Midjourney_Emblem.svg/250px-Midjourney_Emblem.svg.png",
        description: "AI-powered image generation for creative projects.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 6.99,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "windows10",
        name: "Windows 10 Pro",
        category: "software",
        image: "https://static.vecteezy.com/system/resources/previews/020/975/574/non_2x/window-10-logo-window-10-icon-transparent-free-png.png",
        description: "Professional operating system for productivity and development.",
        billing: "permanent", // 👈 Permanent sub
        pricing: {

            permanent: 2.99,

        },
    },
    {
        id: "windows11",
        name: "Windows 11 Pro",
        category: "software",
        image: "https://365cloudstore.com/wp-content/uploads/2023/02/windows-11-500x500-01.png",
        description: "Latest professional operating system for productivity and development.",
        billing: "permanent", // 👈 Permanent sub
        pricing: {

            permanent: 2.99,
        },
    },
    {
        id: "capcut",
        name: "CapCut Pro",
        category: "video",
        image: "https://static.vecteezy.com/system/resources/thumbnails/048/759/325/small_2x/capcut-transparent-icon-free-png.png",
        description: "Professional video editing and creation tools.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 5.99,
            six_months: 49.99,
            yearly: 79.99,
        },
    },
    {
        id: "freepik",
        name: "Freepik Pro",
        category: "design",
        image: "https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F2699%2FPNG%2F512%2Ffreepik_logo_icon_170123.png&id=170123&pack_or_individual=pack",
        description: "Premium stock images, vectors, and design resources.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 4.99,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "envato",
        name: "Envato Elements",
        category: "design",
        image: "https://upload.wikimedia.org/wikipedia/ru/thumb/f/fe/Envato_Logo.svg/3840px-Envato_Logo.svg.png",
        description: "Access to a vast library of design assets, templates, and resources.",
        billing: "/month", // 👈 Monthly sub
        pricing: {
            monthly: 4.99,
            six_months: null,
            yearly: null,
        },
    },
    {
        id: "office21",
        name: "Microsoft Office 2021",
        category: "software",
        image: "https://www.freepnglogos.com/uploads/microsoft-office-png-logo/office-web-logo-png-0.png",
        description: "Professional productivity suite for Windows and Mac.",
        billing: "permanent", // 👈 Permanent sub
        pricing: {

            permanent: 5.99,
        },
    },
];