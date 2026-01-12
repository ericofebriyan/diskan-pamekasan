import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StaffList from "@/components/features/StaffList";

export default function PegawaiPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Direktori Pejabat & Staff</h1>
                    <p className="max-w-2xl mx-auto text-slate-600">
                        Daftar lengkap pejabat struktural dan fungsional di lingkungan Dinas Perikanan Kabupaten Pamekasan.
                    </p>
                </div>

                <StaffList />
            </div>
            <Footer />
        </main>
    );
}
