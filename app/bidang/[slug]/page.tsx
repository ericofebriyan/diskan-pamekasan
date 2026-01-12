import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Info, Users, Shield, Anchor, HeartPulse, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock Data Dictionary
const departments = {
    tangkap: {
        title: "Bidang Perikanan Tangkap",
        description: "Mengelola sumber daya perikanan tangkap, pemberdayaan nelayan, dan perizinan alat tangkap untuk keberlanjutan laut Pamekasan.",
        icon: Anchor,
        features: [
            { title: "Verifikasi Alat Tangkap", desc: "Pemeriksaan dan sertifikasi alat tangkap ramah lingkungan." },
            { title: "Kartu KUSUKA", desc: "Fasilitasi pembuatan Kartu Pelaku Usaha Kelautan dan Perikanan." },
            { title: "Bantuan Sarana", desc: "Penyaluran bantuan mesin, jaring, dan perahu untuk nelayan kecil." }
        ],
        stats: [
            { label: "Jumlah Nelayan", value: "12,500+" },
            { label: "Armada Kapal", value: "3,200" },
            { label: "Produksi Tahunan", value: "25 Ribu Ton" },
        ]
    },
    budidaya: {
        title: "Bidang Perikanan Budidaya",
        description: "Mengembangkan potensi budidaya ikan air tawar, payau, dan laut serta pembinaan kelompok pembudidaya ikan (Pokdakan).",
        icon: HeartPulse, // Nature/Growth vibe
        features: [
            { title: "Pembinaan Pokdakan", desc: "Pendampingan teknis dan manajerial bagi kelompok pembudidaya." },
            { title: "Benih Unggul", desc: "Penyediaan dan distribusi benih ikan berkualitas." },
            { title: "Teknologi Bioflok", desc: "Penerapan teknologi budidaya intensif hemat lahan." }
        ],
        stats: [
            { label: "Jumlah Pokdakan", value: "450+" },
            { label: "Luas Tambak", value: "1,200 Ha" },
            { label: "Produksi Rumput Laut", value: "15 Ribu Ton" },
        ]
    },
    pengawasan: {
        title: "Bidang Pelayanan & Pengawasan",
        description: "Menjamin tertib hukum melalui pengawasan sumber daya kelautan dan pelayanan publik yang prima.",
        icon: Shield,
        features: [
            { title: "Patroli Laut", desc: "Pengawasan rutin perairan dari illegal fishing." },
            { title: "Layanan Pengaduan", desc: "Menerima laporan masyarakat terkait pelanggaran perikanan." },
            { title: "Sosialisasi Hukum", desc: "Edukasi regulasi perikanan kepada masyarakat pesisir." }
        ],
        stats: [
            { label: "Operasi Pengawasan", value: "24/Tahun" },
            { label: "Kasus Ditangani", value: "5" },
            { label: "Indeks Kepuasan", value: "88.5" },
        ]
    },
    pengolahan: {
        title: "Bidang Pengolahan & PDS",
        description: "Meningkatkan nilai tambah produk perikanan, daya saing UMKM, dan keamanan pangan hasil laut.",
        icon: ShoppingBag,
        features: [
            { title: "Sertifikasi SKP", desc: "Penerbitan Sertifikat Kelayakan Pengolahan." },
            { title: "Promosi Produk", desc: "Pemasaran produk olahan ikan khas Pamekasan." },
            { title: "Pelatihan Pengolahan", desc: "Diversifikasi produk olahan ikan (Nugget, Kerupuk, dll)." }
        ],
        stats: [
            { label: "UMKM Binaan", value: "120+" },
            { label: "Unit Pengolahan", value: "15" },
            { label: "Ekspor", value: "2 Negara" },
        ]
    }
};

export function generateStaticParams() {
    return Object.keys(departments).map((slug) => ({ slug }));
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug as keyof typeof departments;
    const data = departments[slug];

    if (!data) return { title: "Bidang Tidak Ditemukan" };

    return {
        title: `${data.title} - Dinas Perikanan Pamekasan`,
        description: data.description,
    };
}

export default async function BidangPage({ params }: Props) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug as keyof typeof departments;
    const data = departments[slug];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-slate-400">Halaman tidak ditemukan</h1>
            </div>
        );
    }

    const Icon = data.icon;

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="bg-primary pt-32 pb-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -right-20 -bottom-20 opacity-10">
                    <Icon size={400} />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-sky-200 font-medium">
                        <Link href="/" className="hover:text-white">Beranda</Link>
                        <span>/</span>
                        <span>Bidang</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>
                    <p className="text-xl max-w-3xl text-sky-100 leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {data.stats.map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <FileText className="text-primary" />
                                Layanan & Program Unggulan
                            </h2>
                            <div className="grid gap-6">
                                {data.features.map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                            <Info size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">{feature.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Users className="text-primary" />
                                Tim Kami
                            </h2>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
                                <p className="text-slate-600 mb-4">Ingin mengetahui struktur pejabat di bidang ini?</p>
                                <Link href="/profil/pegawai">
                                    <Button>Lihat Direktori Pegawai</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Bidang Lainnya</h3>
                            <ul className="space-y-2">
                                {Object.entries(departments).map(([key, val]) => (
                                    <li key={key}>
                                        <Link
                                            href={`/bidang/${key}`}
                                            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${slug === key ? 'bg-primary/10 text-primary font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            <ArrowRight size={16} className={slug === key ? 'opacity-100' : 'opacity-0'} />
                                            {val.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Kontak Bidang</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Memiliki pertanyaan spesifik terkait layanan bidang ini?
                            </p>
                            <Button variant="outline" className="w-full">Hubungi Admin Bidang</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
