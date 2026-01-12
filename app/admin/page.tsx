"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Calendar, FileText, Image as ImageIcon, Settings, LogOut, Plus, Search, Trash, TrendingUp, AlertTriangle, CheckCircle, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const {
        agenda, addAgenda, deleteAgenda,
        news, addNews, deleteNews,
        gallery, addGallery, deleteGallery,
        fishPrices, updateFishPrice,
        documents, addDocument, deleteDocument
    } = useApp();

    // Notification State
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Confirmation State
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null; type: 'agenda' | 'news' | 'gallery' | 'document' | null }>({ isOpen: false, id: null, type: null });

    // Form States
    const [isAddingAgenda, setIsAddingAgenda] = useState(false);
    const [newAgenda, setNewAgenda] = useState({ title: "", date: "", time: "", location: "", type: "Rapat", status: "Akan Datang" as const });

    const [isAddingNews, setIsAddingNews] = useState(false);
    const [newNews, setNewNews] = useState({ title: "", date: "", author: "Admin", excerpt: "", category: "Umum", content: "" });

    const [isAddingGallery, setIsAddingGallery] = useState(false);
    const [newGallery, setNewGallery] = useState({ title: "", date: "", image: "" });

    const [isAddingDocument, setIsAddingDocument] = useState(false);
    const [newDocument, setNewDocument] = useState({ title: "", category: "Pengumuman" as const, date: "", fileUrl: "#" });

    // Notification Helper
    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Handlers
    const handleAddAgenda = (e: React.FormEvent) => {
        e.preventDefault();
        addAgenda({
            title: newAgenda.title,
            date: newAgenda.date ? new Date(newAgenda.date).toISOString() : new Date().toISOString(),
            time: newAgenda.time,
            location: newAgenda.location,
            type: newAgenda.type,
            status: newAgenda.status
        });
        setIsAddingAgenda(false);
        setNewAgenda({ title: "", date: "", time: "", location: "", type: "Rapat", status: "Akan Datang" });
        showNotification("Agenda berhasil ditambahkan!");
    };

    const handleAddNews = (e: React.FormEvent) => {
        e.preventDefault();
        addNews({
            ...newNews,
            date: newNews.date || new Date().toISOString().split('T')[0]
        });
        setIsAddingNews(false);
        setNewNews({ title: "", date: "", author: "Admin", excerpt: "", category: "Umum", content: "" });
        showNotification("Berita berhasil diterbitkan!");
    };

    const handleAddGallery = (e: React.FormEvent) => {
        e.preventDefault();
        addGallery({
            ...newGallery,
            date: newGallery.date || new Date().toISOString().split('T')[0]
        });
        setIsAddingGallery(false);
        setNewGallery({ title: "", date: "", image: "" });
        showNotification("Foto berhasil ditambahkan ke galeri!");
    }

    const handleAddDocument = (e: React.FormEvent) => {
        e.preventDefault();
        addDocument({
            ...newDocument,
            date: newDocument.date || new Date().toISOString().split('T')[0]
        });
        setIsAddingDocument(false);
        setNewDocument({ title: "", category: "Pengumuman", date: "", fileUrl: "#" });
        showNotification("Dokumen berhasil diunggah!");
    }

    // Delete Flow
    const initiateDelete = (id: number, type: 'agenda' | 'news' | 'gallery' | 'document') => {
        setDeleteConfirm({ isOpen: true, id, type });
    };

    const confirmDelete = () => {
        if (deleteConfirm.type === 'agenda' && deleteConfirm.id) {
            deleteAgenda(deleteConfirm.id);
        } else if (deleteConfirm.type === 'news' && deleteConfirm.id) {
            deleteNews(deleteConfirm.id);
        } else if (deleteConfirm.type === 'gallery' && deleteConfirm.id) {
            deleteGallery(deleteConfirm.id);
        } else if (deleteConfirm.type === 'document' && deleteConfirm.id) {
            deleteDocument(deleteConfirm.id);
        }
        setDeleteConfirm({ isOpen: false, id: null, type: null });
        showNotification("Item berhasil dihapus.");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-xl text-white flex items-center gap-3 animate-slide-in ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {notification.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Data Ini?</h3>
                            <p className="text-slate-500 mb-6">Tindakan ini tidak dapat dibatalkan. Data akan hilang secara permanen.</p>
                            <div className="flex gap-3 w-full">
                                <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm({ isOpen: false, id: null, type: null })}>
                                    Batal
                                </Button>
                                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>
                                    Ya, Hapus
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="font-bold text-white text-lg">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { id: "agenda", label: "Kelola Agenda", icon: Calendar },
                        { id: "berita", label: "Kelola Berita", icon: FileText },
                        { id: "galeri", label: "Kelola Galeri", icon: ImageIcon },
                        { id: "dokumen", label: "Kelola Dokumen", icon: File },
                        { id: "harga-ikan", label: "Harga Ikan", icon: TrendingUp },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg w-full transition-colors">
                        <LogOut size={20} />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h1>
                        <p className="text-slate-500 text-sm">Selamat datang kembali, Admin.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                            A
                        </div>
                    </div>
                </header>

                {activeTab === "dashboard" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Total Berita", value: news.length.toString(), icon: FileText, color: "bg-blue-500" },
                            { label: "Agenda Aktif", value: agenda.length.toString(), icon: Calendar, color: "bg-indigo-500" },
                            { label: "Dokumen Publik", value: documents.length.toString(), icon: File, color: "bg-emerald-500" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                                <div className={`${stat.color} p-4 rounded-lg text-white`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "agenda" && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Daftar Agenda Kegiatan</h3>
                            <Button size="sm" className="gap-2" onClick={() => setIsAddingAgenda(!isAddingAgenda)}>
                                <Plus size={16} /> {isAddingAgenda ? "Batal" : "Tambah Agenda"}
                            </Button>
                        </div>

                        {isAddingAgenda && (
                            <div className="p-6 bg-slate-50 border-b border-slate-100 animate-in slide-in-from-top-4 fade-in">
                                <form onSubmit={handleAddAgenda} className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Nama Kegiatan" aria-label="Nama Kegiatan" className="p-2 rounded border" value={newAgenda.title} onChange={e => setNewAgenda({ ...newAgenda, title: e.target.value })} />
                                    <input required type="date" aria-label="Tanggal Kegiatan" className="p-2 rounded border" value={newAgenda.date} onChange={e => setNewAgenda({ ...newAgenda, date: e.target.value })} />
                                    <input required type="text" placeholder="Waktu (e.g. 09:00 - 12:00)" aria-label="Waktu Kegiatan" className="p-2 rounded border" value={newAgenda.time} onChange={e => setNewAgenda({ ...newAgenda, time: e.target.value })} />
                                    <input required type="text" placeholder="Lokasi" aria-label="Lokasi Kegiatan" className="p-2 rounded border" value={newAgenda.location} onChange={e => setNewAgenda({ ...newAgenda, location: e.target.value })} />
                                    <div className="flex gap-2 col-span-2 justify-end">
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Nama Kegiatan</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4">Lokasi</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {agenda.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{new Date(item.date).toLocaleDateString('id-ID')}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.location}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                                            <button onClick={() => initiateDelete(item.id, 'agenda')} aria-label="Hapus Agenda" className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "berita" && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Daftar Berita</h3>
                            <Button size="sm" className="gap-2" onClick={() => setIsAddingNews(!isAddingNews)}>
                                <Plus size={16} /> {isAddingNews ? "Batal" : "Tambah Berita"}
                            </Button>
                        </div>

                        {isAddingNews && (
                            <div className="p-6 bg-slate-50 border-b border-slate-100 animate-in slide-in-from-top-4 fade-in">
                                <form onSubmit={handleAddNews} className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Judul Berita" aria-label="Judul Berita" className="p-2 rounded border col-span-2" value={newNews.title} onChange={e => setNewNews({ ...newNews, title: e.target.value })} />
                                    <input type="date" aria-label="Tanggal Berita" className="p-2 rounded border" value={newNews.date} onChange={e => setNewNews({ ...newNews, date: e.target.value })} />
                                    <input required type="text" placeholder="Kategori" aria-label="Kategori Berita" className="p-2 rounded border" value={newNews.category} onChange={e => setNewNews({ ...newNews, category: e.target.value })} />
                                    <textarea required placeholder="Ringkasan Berita" aria-label="Ringkasan Berita" className="p-2 rounded border col-span-2 h-24" value={newNews.excerpt} onChange={e => setNewNews({ ...newNews, excerpt: e.target.value })} />
                                    <div className="flex gap-2 col-span-2 justify-end">
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Judul</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {news.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900 line-clamp-1">{item.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.date}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.category}</td>
                                        <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                                            <button onClick={() => initiateDelete(item.id, 'news')} aria-label="Hapus Berita" className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "galeri" && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Kelola Galeri</h3>
                            <Button size="sm" className="gap-2" onClick={() => setIsAddingGallery(!isAddingGallery)}>
                                <Plus size={16} /> {isAddingGallery ? "Batal" : "Tambah Foto"}
                            </Button>
                        </div>

                        {isAddingGallery && (
                            <div className="p-6 bg-slate-50 border-b border-slate-100 animate-in slide-in-from-top-4 fade-in">
                                <form onSubmit={handleAddGallery} className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Judul Foto" aria-label="Judul Foto" className="p-2 rounded border col-span-2" value={newGallery.title} onChange={e => setNewGallery({ ...newGallery, title: e.target.value })} />
                                    <input type="date" aria-label="Tanggal Foto" className="p-2 rounded border" value={newGallery.date} onChange={e => setNewGallery({ ...newGallery, date: e.target.value })} />
                                    <div className="col-span-2 text-xs text-slate-500">Note: Upload gambar belum tersedia (menggunakan placeholder).</div>
                                    <div className="flex gap-2 col-span-2 justify-end">
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                            {gallery.map((item) => (
                                <div key={item.id} className="group relative bg-slate-100 rounded-lg overflow-hidden aspect-square border border-slate-200">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                        <ImageIcon size={32} />
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <p className="text-white text-xs font-medium truncate">{item.title}</p>
                                        <button onClick={() => initiateDelete(item.id, 'gallery')} aria-label="Hapus Foto" className="mt-2 text-red-300 hover:text-red-200 text-xs flex items-center gap-1">
                                            <Trash size={12} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "dokumen" && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Kelola Dokumen Digital</h3>
                            <Button size="sm" className="gap-2" onClick={() => setIsAddingDocument(!isAddingDocument)}>
                                <Plus size={16} /> {isAddingDocument ? "Batal" : "Upload Dokumen"}
                            </Button>
                        </div>

                        {isAddingDocument && (
                            <div className="p-6 bg-slate-50 border-b border-slate-100 animate-in slide-in-from-top-4 fade-in">
                                <form onSubmit={handleAddDocument} className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Nama Dokumen" aria-label="Nama Dokumen" className="p-2 rounded border col-span-2" value={newDocument.title} onChange={e => setNewDocument({ ...newDocument, title: e.target.value })} />
                                    <select className="p-2 rounded border" aria-label="Kategori Dokumen" value={newDocument.category} onChange={e => setNewDocument({ ...newDocument, category: e.target.value as any })}>
                                        <option value="Peraturan">Peraturan</option>
                                        <option value="Pengumuman">Pengumuman</option>
                                        <option value="Laporan">Laporan Kinerja</option>
                                    </select>
                                    <input type="date" aria-label="Tanggal Dokumen" className="p-2 rounded border" value={newDocument.date} onChange={e => setNewDocument({ ...newDocument, date: e.target.value })} />
                                    <div className="col-span-2 text-xs text-slate-500">Note: Fitur upload file fisik belum terhubung ke server.</div>
                                    <div className="flex gap-2 col-span-2 justify-end">
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Nama Dokumen</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Tanggal Upload</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {documents.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">{item.category}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{item.date}</td>
                                        <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                                            <button onClick={() => initiateDelete(item.id, 'document')} aria-label="Hapus Dokumen" className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "harga-ikan" && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Update Harga Ikan Hari Ini</h3>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Komoditas</th>
                                    <th className="px-6 py-4">Harga per Kg</th>
                                    <th className="px-6 py-4 text-right">Update Harga</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {fishPrices.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                        <td className="px-6 py-4 text-slate-600">Rp {item.price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <input
                                                    type="number"
                                                    aria-label={`Harga ${item.name}`}
                                                    className="w-24 p-1 border rounded text-right"
                                                    defaultValue={item.price}
                                                    onBlur={(e) => {
                                                        const val = parseInt(e.target.value);
                                                        if (!isNaN(val)) {
                                                            updateFishPrice(item.id, val);
                                                            showNotification("Harga berhasil diperbarui!", "success");
                                                        }
                                                    }}
                                                />
                                                <span className="text-xs text-slate-400">/ {item.unit}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
