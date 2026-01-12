import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrgChart from "@/components/features/OrgChart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Struktur Organisasi - Dinas Perikanan Pamekasan",
    description: "Bagan struktur organisasi dan daftar pejabat Dinas Perikanan Kabupaten Pamekasan.",
};

export default function StrukturOrganisasiPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Struktur Organisasi</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Bagan struktur organisasi Dinas Perikanan Kabupaten Pamekasan. Klik pada jabatan untuk melihat detail tugas dan pejabat.
                    </p>
                </div>

                <OrgChart />
            </div>
            <Footer />
        </main>
    );
}
