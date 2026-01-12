import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgendaCalendar from "@/components/features/AgendaCalendar";

export default function AgendaPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Agenda Kegiatan</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Jadwal kegiatan mingguan Dinas Perikanan Kabupaten Pamekasan.
                    </p>
                </div>

                <AgendaCalendar />
            </div>
            <Footer />
        </main>
    );
}
