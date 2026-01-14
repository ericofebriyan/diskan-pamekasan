"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import HeroSlider from "@/components/features/HeroSlider";
import StatsSection from "@/components/features/StatsSection";
import AnnouncementBanner from "@/components/features/AnnouncementBanner";

export default function Home() {
  const { news } = useApp();
  const latestNews = news.slice(0, 3); // Top 3 news

  return (
    <div className="flex flex-col">
      <HeroSlider />

      <div className="relative z-30">
        <StatsSection />
      </div>

      {/* Banner Pengumuman */}
      <section className="py-8 bg-white">
        <AnnouncementBanner />
      </section>

      {/* Latest Information - Dynamic */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Informasi Terbaru</h2>
              <p className="text-slate-500">Berita, Pengumuman, dan Artikel terkini Dinas Perikanan.</p>
            </div>
            <Link href="/informasi/berita" className="text-primary font-medium hover:underline flex items-center gap-2">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <article key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {/* Placeholder for News Image */}
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                    <span className="text-xs">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium text-[10px] uppercase tracking-wider">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <Link href={`/informasi/berita/${item.slug || '#'}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                    Baca Selengkapnya <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Summary (Kept for content richness) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Mewujudkan Kesejahteraan Nelayan & Pembudidaya</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Dinas Perikanan Kabupaten Pamekasan berkomitmen untuk meningkatkan produksi perikanan, menjaga kelestarian ekosistem laut, dan memberdayakan masyarakat pesisir melalui inovasi dan pelayanan prima.
            </p>
            <ul className="space-y-3 mb-8">
              {["Pelayanan Perizinan Satu Pintu", "Bantuan Sarana Prasarana Modern", "Pembinaan Kelompok Usaha Bersama (KUB)"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/profil">
              <Button variant="outline">Lihat Visi Misi Lengkap</Button>
            </Link>
          </div>
          <div className="h-80 bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200">
            {/* Placeholder Image */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <span className="font-medium">Ilustrasi Kegiatan (Placeholder)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
