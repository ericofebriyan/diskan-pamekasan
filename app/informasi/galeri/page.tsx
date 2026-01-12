"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Image as ImageIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function GaleriPage() {
    const { gallery } = useApp();

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Galeri Kegiatan</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Dokumentasi visual kegiatan Dinas Perikanan Kabupaten Pamekasan.
                    </p>
                </div>

                {gallery.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Belum ada dokumentasi kegiatan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((item) => (
                            <div key={item.id} className="aspect-square bg-slate-200 rounded-xl overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-400">
                                    <ImageIcon size={32} className="opacity-20" />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white text-sm font-medium px-4 text-center line-clamp-2">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
