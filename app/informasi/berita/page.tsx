"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function BeritaPage() {
    const { news } = useApp();

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Berita & Artikel</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Informasi terbaru mengenai kegiatan, program, dan perkembangan sektor perikanan Pamekasan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                            <div className="aspect-video bg-slate-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-400">
                                    <FileText size={48} className="opacity-20" />
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">{item.category}</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User size={12} />
                                        <span>{item.author}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
                                    {item.excerpt}
                                </p>
                                <Link href="#" className="inline-flex text-primary font-medium text-sm hover:underline mt-auto">
                                    Baca Selengkapnya
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
