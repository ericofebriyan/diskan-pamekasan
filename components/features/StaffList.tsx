"use client";

import { useState } from "react";
import { Search, User, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const staffData = [
    { id: 1, name: "Ir. Bambang Wijaya, MM", nip: "19680101 199303 1 001", jabatan: "Kepala Dinas", bidang: "Pimpinan", image: null },
    { id: 2, name: "Siti Humairoh, S.Pi", nip: "19750512 200012 2 003", jabatan: "Sekretaris Dinas", bidang: "Sekretariat", image: null },
    { id: 3, name: "Drs. H. Mulyadi", nip: "19700817 199803 1 005", jabatan: "Kabid Perikanan Tangkap", bidang: "Perikanan Tangkap", image: null },
    { id: 4, name: "Lutfianto, S.Kel", nip: "19800220 200501 1 002", jabatan: "Kabid Perikanan Budidaya", bidang: "Perikanan Budidaya", image: null },
    { id: 5, name: "Agus Salim, SH", nip: "19721110 199903 1 008", jabatan: "Kabid Pelayanan & Pengawasan", bidang: "Pelayanan & Pengawasan", image: null },
    { id: 6, name: "Ratna Sari, ST", nip: "19850315 200902 2 004", jabatan: "Kabid Pengolahan & PDS", bidang: "Pengolahan & PDS", image: null },
    { id: 7, name: "Rahmat Hidayat", nip: "19881201 201101 1 009", jabatan: "Kasi Pengelolaan Tangkap", bidang: "Perikanan Tangkap", image: null },
    { id: 8, name: "Dewi Kartika", nip: "19900605 201402 2 011", jabatan: "Analisi Akuakultur", bidang: "Perikanan Budidaya", image: null },
    { id: 9, name: "Slamet Riyadi", nip: "19820930 200801 1 006", jabatan: "Pengelola Mutu Hasil", bidang: "Pengolahan & PDS", image: null },
    { id: 10, name: "Budi Santoso", nip: "19780421 200212 1 003", jabatan: "Kasubbag Umum", bidang: "Sekretariat", image: null },
];

const categories = ["Semua", "Pimpinan", "Sekretariat", "Perikanan Tangkap", "Perikanan Budidaya", "Pelayanan & Pengawasan", "Pengolahan & PDS"];

export default function StaffList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const filteredStaff = staffData.filter((staff) => {
        const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || staff.nip.includes(searchTerm);
        const matchesCategory = selectedCategory === "Semua" || staff.bidang === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama atau NIP..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-slate-400 shrink-0" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? "bg-primary text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStaff.map((staff) => (
                    <div key={staff.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
                        <div className="aspect-square bg-slate-100 relative overflow-hidden">
                            {staff.image ? (
                                <img src={staff.image!} alt={staff.name} className="object-cover w-full h-full" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                    <User size={64} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <p className="text-white text-xs font-medium">{staff.bidang}</p>
                            </div>
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{staff.name}</h3>
                            <p className="text-sm text-primary font-medium mt-1">{staff.jabatan}</p>
                            <div className="mt-3 pt-3 border-t border-slate-100">
                                <p className="text-xs text-slate-400">NIP</p>
                                <p className="text-sm font-mono text-slate-600">{staff.nip}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredStaff.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    <p className="text-lg">Tidak ada pegawai yang ditemukan.</p>
                </div>
            )}
        </div>
    );
}
