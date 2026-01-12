"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ChevronRight } from "lucide-react";

type OrgNode = {
    id: string;
    title: string;
    name: string; // Pejabat name mock
    description: string;
    children?: OrgNode[];
    color?: string;
};

const orgData: OrgNode = {
    id: "kadis",
    title: "Kepala Dinas",
    name: "Ir. Bambang Wijaya, MM",
    description: "Memimpin pelaksanaan tugas pokok dan fungsi Dinas Perikanan.",
    color: "bg-blue-600",
    children: [
        {
            id: "sekretaris",
            title: "Sekretariat",
            name: "Siti Humairoh, S.Pi",
            description: "Menyelenggarakan administrasi umum, keuangan, dan kepegawaian.",
            color: "bg-slate-600",
            children: [
                { id: "sub-umum", title: "Subbag Umum & Kepegawaian", name: "Budi Santoso", description: "Urusan surat menyurat dan pegawai.", color: "bg-slate-500" },
                { id: "sub-keuangan", title: "Subbag Perencanaan & Keuangan", name: "Ani Suryani", description: "Penyusunan anggaran dan laporan keuangan.", color: "bg-slate-500" },
            ],
        },
        {
            id: "tangkap",
            title: "Bidang Perikanan Tangkap",
            name: "Drs. H. Mulyadi",
            description: "Pengelolaan alat tangkap, perizinan nelayan, dan pemberdayaan nelayan kecil.",
            color: "bg-teal-600",
            children: [
                { id: "aksi-tangkap", title: "Seksi Pengelolaan Tangkap", name: "Rahmat Hidayat", description: "Teknis penangkapan ikan.", color: "bg-teal-500" }
            ]
        },
        {
            id: "budidaya",
            title: "Bidang Perikanan Budidaya",
            name: "Lutfianto, S.Kel",
            description: "Pengembangan budidaya air tawar, payau, dan laut. Pembinaan Pokdakan.",
            color: "bg-emerald-600",
            children: [
                { id: "aksi-budidaya", title: "Seksi Produksi Budidaya", name: "Dewi Kartika", description: "Teknis budidaya.", color: "bg-emerald-500" }
            ]
        },
        {
            id: "pengolahan",
            title: "Bidang Pengolahan & PDS",
            name: "Ratna Sari, ST",
            description: "Peningkatan mutu hasil perikanan, promosi produk UMKM, dan pemasaran.",
            color: "bg-orange-600",
            children: [
                { id: "aksi-pengolahan", title: "Seksi Bina Mutu", name: "Slamet Riyadi", description: "Pengawasan mutu produk.", color: "bg-orange-500" }
            ]
        },
        {
            id: "pengawasan",
            title: "Bidang Pelayanan & Pengawasan",
            name: "Agus Salim, SH",
            description: "Pengawasan sumber daya kelautan, penegakan regulasi, dan pelayanan publik.",
            color: "bg-indigo-600",
            children: [
                { id: "aksi-awas", title: "Seksi Pengawasan", name: "Joko Anwar", description: "Patroli dan pengawasan.", color: "bg-indigo-500" }
            ]
        },
    ],
};

const NodeCard = ({ node, onClick }: { node: OrgNode; onClick: (n: OrgNode) => void }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(node)}
        className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-lg text-white w-48 min-h-[120px] transition-colors relative z-10 ${node.color || "bg-blue-500"}`}
    >
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
            <User size={24} />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">{node.title}</span>
        <span className="text-sm font-medium leading-tight">{node.name}</span>
    </motion.button>
);

export default function OrgChart() {
    const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);

    return (
        <div className="w-full overflow-x-auto pb-12 pt-4 px-4 bg-slate-50 rounded-xl border border-slate-200 min-h-[600px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-12 min-w-max">
                {/* Level 1: Kepala Dinas */}
                <NodeCard node={orgData} onClick={setSelectedNode} />

                {/* Connector */}
                <div className="w-px h-8 bg-slate-300 -my-4" />
                <div className="w-[80%] h-px bg-slate-300" />
                <div className="w-px h-4 bg-slate-300 -my-4" />

                {/* Level 2: Children */}
                <div className="flex gap-8 items-start">
                    {orgData.children?.map((child, idx) => (
                        <div key={child.id} className="flex flex-col items-center">
                            <div className="h-4 w-px bg-slate-300 mb-4" />
                            <NodeCard node={child} onClick={setSelectedNode} />
                            {/* Optional Level 3 preview connector */}
                            {child.children && (
                                <>
                                    <div className="h-4 w-px bg-slate-300" />
                                    <div className="text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-200 mt-1">
                                        {child.children.length} Bawahan
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedNode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className={`${selectedNode.color || "bg-blue-600"} p-6 text-white flex justify-between items-start`}>
                                <div>
                                    <h3 className="text-lg font-bold opacity-90">{selectedNode.title}</h3>
                                    <p className="text-2xl font-bold mt-1">{selectedNode.name}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedNode(null)}
                                    aria-label="Tutup Detail"
                                    className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tugas Pokok & Fungsi</h4>
                                    <p className="text-slate-700 leading-relaxed">
                                        {selectedNode.description}
                                    </p>
                                </div>

                                {selectedNode.children && selectedNode.children.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Unit Bawahan</h4>
                                        <ul className="space-y-2">
                                            {selectedNode.children.map(sub => (
                                                <li key={sub.id} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                                                    <ChevronRight size={14} className="text-primary" />
                                                    <span className="font-semibold">{sub.title}:</span> {sub.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                                    <span>NIP. 197xxxxxx</span>
                                    <span>Gol. IV/a</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
