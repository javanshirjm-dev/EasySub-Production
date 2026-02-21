'use client'

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import RequestCard from "@/components/RequestCard";
import Banner from "@/components/Banner";
import { ArrowRight, Sparkles } from "lucide-react"; // Ensure you have lucide-react installed
import Features from "@/components/Features";

export default function Home() {

  const [category, setCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    if (category === "all") return true;
    return product.category === category;
  });

  return (
    <main className="min-h-screen bg-[#F3F4F6] pb-10"> {/* Clean light gray background */}

      <Banner activeCategory={category} onSelectCategory={setCategory} />

      <div className="max-w-7xl mx-auto px-6">


        <div className="flex items-end gap-3 mb-10">
          <h2 className="text-3xl font-bold font-sans text-gray-900 tracking-tight">
            {category === "all" ? "Explore Premium" : category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="h-1 flex-1 bg-gray-200 rounded-full mb-2">
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <RequestCard />
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group relative">

                {/* CARD CONTAINER */}
                <div className="h-full bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 border-2 border-blue-200 overflow-hidden relative z-10">

                  {/* --- 1. IMAGE SECTION WITH SPOTLIGHT --- */}
                  <div className="relative h-48 w-full rounded-[1.5rem] bg-gray-100 overflow-hidden flex items-center justify-center mb-4 group-hover:bg-blue-50/50 transition-colors duration-500">

                    {/* The Spotlight Orb (Moves/Expands on hover) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-400/20 blur-[50px] rounded-full group-hover:w-40 group-hover:h-40 group-hover:bg-blue-500/20 transition-all duration-700"></div>

                    {/* Category Badge (Floating top left) */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 shadow-sm z-20">
                      {product.category || "Sub"}
                    </span>

                    {/* Product Image (Floating Physics) */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 w-50 h-50 object-contain drop-shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                    />
                  </div>

                  {/* --- 2. CONTENT SECTION --- */}
                  <div className="px-2 pb-2">
                    <h2 className="text-lg font-bold text-gray-900 mb-1 truncate leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* --- 3. ACTIVE PRICING BAR --- */}
                    <div className="flex items-center justify-between mt-auto">

                      {/* Price (Fades out slightly on hover to focus on button) */}
                      <div className="flex flex-col group-hover:opacity-50 transition-opacity duration-300">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">{product.billing}</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-bold text-blue-600">$</span>
                          <span className="text-2xl font-black text-gray-900">{product.pricing.monthly ? product.pricing.monthly.toFixed(2) : product.pricing.permanent}</span>
                        </div>
                      </div>

                      {/* The "Morphing" Button */}
                      <button className="relative overflow-hidden cursor-pointer hover:bg-blue-800 rounded-2xl bg-gray-100 text-gray-900 px-5 py-3 font-bold text-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:pl-4 group-hover:pr-10 w-12 group-hover:w-auto h-12 flex items-center justify-center">

                        {/* Initial State: Arrow */}
                        <ArrowRight size={18} className="absolute group-hover:opacity-0 group-hover:translate-x-4 transition-all duration-300" />

                        {/* Hover State: "Add" Text + Arrow */}
                        <span className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300  whitespace-nowrap">
                          Buy Now
                        </span>
                        <ArrowRight size={16} className="absolute right-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75" />
                      </button>

                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] shadow-sm border border-dashed border-gray-300 mx-auto max-w-lg">
            <div className="bg-gray-50 p-4 rounded-full mb-4 animate-bounce">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">No subscriptions found.</p>
            <p className="text-gray-500 mb-6 text-sm">We couldn't find any products in this category.</p>
            <button onClick={() => setCategory("all")} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1">
              View All Products
            </button>
          </div>
        )}
      </div>

      <Features />


    </main>
  );
}