"use client";

import { Users, FileText, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">+2 Hari Ini</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">24</div>
                    <div className="text-sm text-slate-500">Total Berita Dipublish</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">5 Aktif</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">12</div>
                    <div className="text-sm text-slate-500">Permohonan Masuk</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">3</div>
                    <div className="text-sm text-slate-500">Menunggu Verifikasi</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <CheckCircle size={24} />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">89%</div>
                    <div className="text-sm text-slate-500">Tingkat Kepuasan</div>
                </div>
            </div>

            {/* Recent Activity Mock */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Aktivitas Terbaru</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                    AU
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Admin Utama memposting berita baru</p>
                                    <p className="text-xs text-slate-500">"Penyaluran Bantuan..." • 2 Jam yang lalu</p>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">Log #{100 + i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
