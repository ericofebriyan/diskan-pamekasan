"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { news, fishPrices } = useApp();
  const latestNews = news.slice(0, 3); // Top 3 news

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 bg-[url('/hero.png')]"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Dinas Perikanan Kabupaten Pamekasan
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100 drop-shadow-md">
            Mewujudkan Perikanan yang Mandiri, Berdaya Saing, dan Berkelanjutan
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-blue-700 text-white border-0">
              Jelajahi Profil
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Layanan Publik
            </Button>
          </div>
        </div>
      </section>

      {/* Info Cards - Fish Prices Widget */}
      <section className="py-12 px-4 -mt-20 relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Widget Harga Ikan */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-primary">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <TrendingUp size={24} />
              <h3 className="font-bold text-lg">Update Harga Ikan</h3>
            </div>
            <div className="space-y-3">
              {fishPrices.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2 last:border-0">
                  <span className="text-slate-700 font-medium">{item.name}</span>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">Rp {item.price.toLocaleString('id-ID')} /kg</div>
                    <div className={`text-xs ${item.change === 'up' ? 'text-red-500' : item.change === 'down' ? 'text-green-500' : 'text-slate-400'}`}>
                      {item.change === 'up' ? '▲ Naik' : item.change === 'down' ? '▼ Turun' : '• Stabil'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">Diperbarui: {new Date(fishPrices[0]?.lastUpdated || new Date()).toLocaleDateString("id-ID")}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-4 text-yellow-600">
              <TrendingUp size={24} />
              <h3 className="font-bold text-lg">Cuaca & Gelombang</h3>
            </div>
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-slate-800 mb-2">Cerah</div>
              <div className="text-sm text-slate-500">Tinggi Gelombang: 0.5 - 1.25 m</div>
              <p className="mt-4 text-xs text-slate-400">Sumber: BMKG Maritim</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-b-4 border-green-600">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <Calendar size={24} />
              <h3 className="font-bold text-lg">Agenda Terdekat</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center min-w-[60px]">
                  <div className="text-xs font-bold uppercase">OKT</div>
                  <div className="text-xl font-bold">12</div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 line-clamp-1">Penyaluran Bantuan Alat Tangkap</h4>
                  <p className="text-sm text-slate-500">08:00 WIB • Tlanakan</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Visi Misi Summary */}
      <section className="py-20 bg-slate-50">
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
            <Link href="/profil/visi-misi">
              <Button variant="outline">Lihat Visi Misi Lengkap</Button>
            </Link>
          </div>
          <div className="h-80 bg-slate-200 rounded-2xl relative overflow-hidden">
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-400">
              <span className="font-medium">Ilustrasi Kegiatan (Placeholder)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Information - Dynamic */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Informasi Terbaru</h2>
              <p className="text-slate-500">Berita, Pengumuman, dan Artikel terkini.</p>
            </div>
            <Link href="/informasi/berita" className="text-primary font-medium hover:underline flex items-center gap-2">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((item) => (
              <article key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="aspect-video bg-slate-100 relative">
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                    <span className="text-xs">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-400 mb-3 block">{item.date} • {item.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <span className="text-primary text-sm font-medium hover:underline cursor-pointer">Baca Selengkapnya</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
