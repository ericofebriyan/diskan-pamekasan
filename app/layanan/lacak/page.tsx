"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock Data
const mockStatus = {
    "REQ-2024001": [
        { status: "Permohonan Diterima", date: "12 Okt 2024 09:00", description: "Berkas telah masuk ke sistem.", done: true },
        { status: "Verifikasi Berkas", date: "12 Okt 2024 14:30", description: "Berkas lengkap dan valid.", done: true },
        { status: "Menunggu Persetujuan", date: "13 Okt 2024", description: "Sedang diproses oleh Kepala Dinas.", done: false },
        { status: "Selesai", date: "-", description: "Surat Rekomendasi siap diunduh.", done: false },
    ]
};

export default function LacakLayananPage() {
    const [resi, setResi] = useState("");
    const [timeline, setTimeline] = useState<any[] | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = () => {
        if (mockStatus[resi as keyof typeof mockStatus]) {
            setTimeline(mockStatus[resi as keyof typeof mockStatus]);
            setNotFound(false);
        } else {
            setTimeline(null);
            setNotFound(true);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Lacak Status Layanan</h1>
                    <p className="text-slate-600">Pantau progres pengajuan surat atau perizinan Anda secara real-time.</p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex gap-4 mb-8">
                    <div className="flex-grow relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Masukkan Nomor Resi / ID Pengajuan (Contoh: REQ-2024001)"
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            value={resi}
                            onChange={(e) => setResi(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <Button size="lg" onClick={handleSearch}>Lacak</Button>
                </div>

                {/* Result */}
                {notFound && (
                    <div className="text-center py-12 bg-white rounded-xl border border-red-100">
                        <XCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">Data Tidak Ditemukan</h3>
                        <p className="text-slate-500">Pastikan nomor resi yang Anda masukkan benar.</p>
                    </div>
                )}

                {timeline && (
                    <div className="bg-white p-8 rounded-xl shadow-md border border-slate-100">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Detail Status</h2>
                                <p className="text-sm text-slate-500">ID: {resi}</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Proses</span>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {timeline.map((item, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Icon */}
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${item.done ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
                                        }`}>
                                        {item.done ? <CheckCircle size={18} /> : <Clock size={18} />}
                                    </div>

                                    {/* Content */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900">{item.status}</div>
                                            <time className="font-mono text-xs text-slate-500">{item.date}</time>
                                        </div>
                                        <div className="text-slate-500 text-sm">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
