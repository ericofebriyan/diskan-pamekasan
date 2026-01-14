"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function ComplaintWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-80 mb-4 overflow-hidden"
                    >
                        <div className="bg-primary p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold">Layanan Pengaduan</h3>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1" aria-label="Tutup widget pengaduan">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-4 space-y-3">
                            <p className="text-xs text-slate-500">Sampaikan kritik, saran, atau aduan Anda terkait pelayanan kami.</p>
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                className="w-full text-sm p-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <textarea
                                placeholder="Isi pesan..."
                                rows={3}
                                className="w-full text-sm p-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <Button size="sm" className="w-full gap-2">
                                <Send size={14} /> Kirim Aduan
                            </Button>

                            <div className="pt-2 border-t mt-2 text-center">
                                <span className="text-[10px] text-slate-400">Atau lapor via SP4N Lapor!</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-lg transition-all ${isOpen ? 'bg-slate-700 text-white rotate-45' : 'bg-primary text-white hover:bg-blue-700'}`}
                aria-label="Buka layanan pengaduan"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
}
