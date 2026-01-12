"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Send, Mail } from "lucide-react";
import { useState } from "react";

export default function PengaduanPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            // Reset after 3s
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="bg-primary pt-32 pb-16 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Layanan Pengaduan Masyarakat</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Sampaikan aspirasi, kritik, dan saran Anda untuk kemajuan pelayanan Dinas Perikanan Kabupaten Pamekasan.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 w-full mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                    {status === "success" ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Terima Kasih!</h2>
                            <p className="text-slate-600">Laporan Anda telah kami terima dan akan segera ditindaklanjuti.</p>
                            <Button className="mt-6" onClick={() => setStatus("idle")}>Kirim Laporan Lain</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                                    <input required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Sesuai KTP" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Nomor Telepon / WA</label>
                                    <input required type="tel" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="08xxxxxxxxxx" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Judul Laporan</label>
                                <input required type="text" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Contoh: Indikasi Kecurangan BBM Subsidi" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Isi Pengaduan</label>
                                <textarea required className="w-full p-3 h-32 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Jelaskan kronologi kejadian secara rinci..." />
                            </div>

                            <Button type="submit" disabled={status === "submitting"} className="w-full h-12 text-lg font-bold">
                                {status === "submitting" ? "Mengirim..." : "Kirim Laporan"}
                            </Button>
                        </form>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">Call Center</h3>
                        <p className="text-slate-500 text-sm mt-1">(0324) 322XXX</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">WhatsApp</h3>
                        <p className="text-slate-500 text-sm mt-1">0812-3456-7890</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800">Email</h3>
                        <p className="text-slate-500 text-sm mt-1">dinas@pamekasankab.go.id</p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
