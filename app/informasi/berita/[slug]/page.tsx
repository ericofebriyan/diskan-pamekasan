"use client";

import { useApp, NewsItem } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowLeft, Tag, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BeritaDetail() {
    const params = useParams();
    const router = useRouter();
    const { news } = useApp();

    // Find news by slug
    // Ensure params.slug is treated as string
    const slug = typeof params?.slug === 'string' ? params.slug : "";
    const newsItem = news.find(n => n.slug === slug);

    if (!newsItem && slug) {
        // Fallback or loading or just show not found
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h1>
                    <Link href="/informasi/berita">
                        <Button>Kembali ke Berita</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Since we are client-side only currently with mock data, if direct link is visited and data isn't loaded/persisted well, it might be empty.
    // But AppProvider loads from localStorage or initialData. So it should work.

    if (!newsItem) return null;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header Image / Hero */}
            <div className="h-[40vh] bg-slate-800 relative w-full">
                {/* Placeholder for real image */}
                <div className="absolute inset-0 bg-slate-700 flex items-center justify-center text-slate-500">
                    <span>Image Hero Placeholder</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 pb-12">
                    <div className="max-w-4xl mx-auto text-white">
                        <div className="flex items-center gap-4 mb-4 text-sm font-medium">
                            <span className="bg-primary px-3 py-1 rounded-full">{newsItem.category}</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> {newsItem.date}</span>
                            <span className="flex items-center gap-1"><User size={14} /> {newsItem.author}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{newsItem.title}</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 w-full mb-12">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div className="prose prose-slate max-w-none">
                        <p className="lead text-xl text-slate-600 mb-8 font-medium italic border-l-4 border-primary pl-4">
                            {newsItem.excerpt}
                        </p>
                        <div className="whitespace-pre-line text-slate-800 leading-relaxed">
                            {newsItem.content}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <Button variant="outline" onClick={() => router.back()}>
                            <ArrowLeft size={16} className="mr-2" /> Kembali
                        </Button>
                        <Button variant="ghost" className="text-slate-500 hover:text-primary">
                            <Share2 size={16} className="mr-2" /> Bagikan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
