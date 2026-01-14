"use client";

import { Download, FileText, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function DokumenPage() {
    const { documents } = useApp();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");
    const [selectedYear, setSelectedYear] = useState("Semua");

    // Extract Years
    const years = ["Semua", ...Array.from(new Set(documents.map(d => d.date.split("-")[0]))).sort((a, b) => b.localeCompare(a))];
    const categories = ["Semua", "Peraturan", "Renstra", "Laporan", "SOP", "Formulir", "Pengumuman"];

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "Semua" || doc.category === selectedCategory;
        const matchesYear = selectedYear === "Semua" || doc.date.startsWith(selectedYear);
        return matchesSearch && matchesCategory && matchesYear;
    });

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-slate-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Pusat Unduhan</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Akses dokumen publik, regulasi, SAKIP, dan formulir pelayanan Dinas Perikanan.
                    </p>
                </div>
            </div>

            <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari dokumen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer"
                                aria-label="Filter berdasarkan tahun"
                            >
                                {years.map(y => <option key={y} value={y}>{y === "Semua" ? "Semua Tahun" : y}</option>)}
                            </select>

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer"
                                aria-label="Filter berdasarkan kategori"
                            >
                                {categories.map(c => <option key={c} value={c}>{c === "Semua" ? "Semua Kategori" : c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* List */}
                    <div className="divide-y divide-slate-100">
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc) => (
                                <div key={doc.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{doc.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                <span className={`px-2 py-0.5 rounded font-medium ${doc.category === 'Peraturan' ? 'bg-blue-100 text-blue-700' :
                                                    doc.category === 'Laporan' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-slate-100 text-slate-600'
                                                    }`}>{doc.category}</span>
                                                <span className="border-l border-slate-200 pl-3">{doc.date}</span>
                                                {doc.size && <span className="border-l border-slate-200 pl-3">{doc.size}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="shrink-0 gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors" asChild>
                                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <Download size={16} /> Unduh
                                        </a>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-slate-500">
                                Tidak ada dokumen ditemukan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
