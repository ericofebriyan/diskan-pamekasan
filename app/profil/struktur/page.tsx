"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NodeProps = {
    name: string;
    role: string;
    nip?: string;
    image?: string;
    children?: React.ReactNode;
    color?: string;
};

const OrgNode = ({ name, role, nip, children, color = "bg-white" }: NodeProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = !!children;

    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative z-10 w-64 p-4 rounded-xl shadow-md border border-slate-200 text-center transition-all hover:shadow-lg ${color}`}
            >
                <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full mb-3 flex items-center justify-center text-slate-400 overflow-hidden border-2 border-slate-50">
                    <User size={32} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{name}</h3>
                <p className="text-primary text-xs font-semibold mb-1">{role}</p>
                {nip && <p className="text-slate-400 text-[10px]">NIP. {nip}</p>}

                {hasChildren && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:text-primary z-20"
                        aria-label="Toggle children"
                    >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
            </motion.div>

            <AnimatePresence>
                {hasChildren && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col items-center w-full"
                    >
                        <div className="w-px h-8 bg-slate-300"></div>
                        <div className="relative flex justify-center gap-8 pt-4 border-t border-slate-300 px-4">
                            {/* Lines connector correction logic would be complex here for pure CSS, 
                                simplified: border-t covers all children, need to hide ends. 
                                For now, simplified tree view. 
                             */}
                            <div className="flex gap-4 sm:gap-8 items-start flex-wrap justify-center">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function StrukturPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 w-full overflow-x-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Struktur Organisasi</h1>
                    <p className="text-slate-600">Dinas Perikanan Kabupaten Pamekasan</p>
                </div>

                <div className="min-w-[1000px] flex justify-center pb-20">
                    <OrgNode
                        name="Ir. Abdul Fata, M.Si"
                        role="Kepala Dinas"
                        nip="197xxxxxxx"
                        color="bg-blue-50 border-blue-200"
                    >
                        <OrgNode name="Dra. Nurul Hidayati" role="Sekretaris Dinas" nip="198xxxxxxx">
                            <OrgNode name="Budi Santoso, S.Pi" role="Kasubag Perencanaan" />
                            <OrgNode name="Siti Aminah, SE" role="Kasubag Umum & Kepegawaian" />
                            <OrgNode name="Rahmat Hidayat, S.Sos" role="Kasubag Keuangan" />
                        </OrgNode>

                        <div className="flex gap-8">
                            <OrgNode name="Ahmad Zaini, S.Pi" role="Kabid Perikanan Tangkap" color="bg-green-50">
                                <OrgNode name="Subseksi 1" role="Kasi Sarana" />
                                <OrgNode name="Subseksi 2" role="Kasi Kenelayanan" />
                            </OrgNode>

                            <OrgNode name="Dewi Ratna, S.Pi" role="Kabid Perikanan Budidaya" color="bg-yellow-50">
                                <OrgNode name="Subseksi 1" role="Kasi Benih" />
                                <OrgNode name="Subseksi 2" role="Kasi Pakan" />
                            </OrgNode>

                            <OrgNode name="Bambang S., S.H" role="Kabid Pengolahan & Pemasaran" color="bg-orange-50">
                                <OrgNode name="Subseksi 1" role="Kasi Bina Mutu" />
                                <OrgNode name="Subseksi 2" role="Kasi Promosi" />
                            </OrgNode>
                        </div>
                    </OrgNode>
                </div>
            </div>
            <Footer />
        </main>
    );
}
