"use client";

import { FileText, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

export default function BeritaPage() {
    const { news } = useApp();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    // Get unique categories
    const categories = ["Semua", ...Array.from(new Set(news.map(item => item.category)))];

    // Filter
    const filteredNews = selectedCategory === "Semua"
        ? news
        : news.filter(item => item.category === selectedCategory);

    // Pagination
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <div className="bg-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Berita & Artikel</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Informasi terkini seputar kegiatan, program, dan perkembangan sektor perikanan di Kabupaten Pamekasan.
                    </p>
                </div>
            </div>

            <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                                    ? "bg-primary text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                {currentNews.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {currentNews.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
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
                                    <Link href={`/informasi/berita/${item.slug}`} className="inline-flex text-primary font-medium text-sm hover:underline mt-auto items-center gap-1">
                                        Baca Selengkapnya <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        Tidak ada berita ditemukan untuk kategori ini.
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ArrowLeft size={16} className="mr-2" /> Sebelumnya
                        </Button>
                        <span className="flex items-center px-4 font-medium text-slate-600">
                            Halaman {currentPage} dari {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Selanjutnya <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
