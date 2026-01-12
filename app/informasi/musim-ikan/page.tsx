import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, CloudSun, Anchor } from "lucide-react";

export default function MusimIkanPage() {
    const seasons = [
        { month: "Januari", fish: ["Tongkol", "Layang"], weather: "Ombak Tinggi (Barat)" },
        { month: "Februari", fish: ["Tongkol", "Tenggiri"], weather: "Berawan, Hujan Ringan" },
        { month: "Maret", fish: ["Kembung", "Cumi-cumi"], weather: "Cerah Berawan" },
        { month: "April", fish: ["Cumi-cumi", "Teri"], weather: "Cerah, Laut Tenang" },
        { month: "Mei", fish: ["Teri", "Rajungan"], weather: "Cerah" },
        { month: "Juni", fish: ["Rajungan", "Udang"], weather: "Cerah, Angin Timur" },
        { month: "Juli", fish: ["Udang", "Kakap"], weather: "Cerah, Angin Kencang" },
        { month: "Agustus", fish: ["Kakap", "Kerapu"], weather: "Puncak Musim Timur" },
        { month: "September", fish: ["Kerapu", "Manyung"], weather: "Cerah" },
        { month: "Oktober", fish: ["Manyung", "Layur"], weather: "Peralihan Musim" },
        { month: "November", fish: ["Layur", "Tongkol"], weather: "Hujan Mulai Turun" },
        { month: "Desember", fish: ["Tongkol", "Cakalang"], weather: "Ombak Tinggi (Barat)" },
    ];

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="bg-primary pt-32 pb-16 text-white text-center">
                <h1 className="text-4xl font-bold mb-4">Kalender Musim Ikan</h1>
                <p className="text-blue-100">Informasi perkiraan musim penangkapan ikan di perairan Pamekasan.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {seasons.map((item, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                                <h3 className="font-bold text-lg text-slate-900">{item.month}</h3>
                                <Calendar size={20} className="text-primary" />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        <Anchor size={14} /> Dominan Tangkapan
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.fish.map(f => (
                                            <span key={f} className="px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        <CloudSun size={14} /> Cuaca Laut
                                    </div>
                                    <p className="text-sm text-slate-600">{item.weather}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-yellow-50 border border-yellow-200 p-6 rounded-xl flex gap-4 items-start">
                    <CloudSun className="text-yellow-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-yellow-800 text-lg">Disclaimer</h4>
                        <p className="text-yellow-700">
                            Informasi ini adalah perkiraan berdasarkan data historis tahunan. Kondisi aktual di lapangan dapat berubah sewaktu-waktu dipengaruhi oleh anomali cuaca (La Nina / El Nino). Selalu utamakan keselamatan pelayaran.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
