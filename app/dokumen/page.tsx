import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Download, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
    { id: 1, title: "Peraturan Bupati No. 21 Tahun 2023", category: "Peraturan", size: "2.4 MB", date: "2023-05-12" },
    { id: 2, title: "Renstra Dinas Perikanan 2024-2029", category: "Perencanaan", size: "5.1 MB", date: "2024-01-10" },
    { id: 3, title: "Formulir Pendaftaran Pokdakan Baru", category: "Formulir", size: "350 KB", date: "2024-02-15" },
    { id: 4, title: "SOP Pelayanan Rekomendasi BBM Nelayan", category: "SOP", size: "1.2 MB", date: "2023-11-20" },
    { id: 5, title: "Laporan Kinerja Instansi Pemerintah (LKjIP) 2023", category: "Laporan", size: "8.5 MB", date: "2024-03-01" },
];

export default function DokumenPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pusat Unduhan</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Akses dokumen publik, regulasi, dan formulir pelayanan Dinas Perikanan.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari dokumen..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Filter</Button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="divide-y divide-slate-100">
                        {documents.map((doc) => (
                            <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{doc.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{doc.category}</span>
                                            <span>{doc.date}</span>
                                            <span>{doc.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="shrink-0 gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                                    <Download size={16} />
                                    Unduh
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
