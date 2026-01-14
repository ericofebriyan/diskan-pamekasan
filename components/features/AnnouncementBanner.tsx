import { Megaphone, X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 relative">
            <div className="max-w-7xl mx-auto flex items-start md:items-center gap-3 pr-8">
                <Megaphone className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5 md:mt-0" />
                <div className="text-sm text-yellow-800">
                    <span className="font-bold mr-1">PENGUMUMAN:</span>
                    Layanan perizinan kapal <span className="font-semibold">Buka Setiap Hari Kerja</span> (Senin - Jumat) di Kantor Dinas Perikanan.
                    Silakan lengkapi dokumen sebelum datang.
                </div>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-2 p-1 text-yellow-500 hover:text-yellow-700 transition-colors"
                aria-label="Tutup pengumuman"
            >
                <X size={18} />
            </button>
        </div>
    );
}
