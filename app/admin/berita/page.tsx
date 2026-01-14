"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function AdminBeritaPage() {
    const { news, addNews, deleteNews } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "Berita",
        excerpt: "",
        content: "",
        author: "Admin"
    });

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Generate slug from title
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

        addNews({
            ...formData,
            slug,
            date: new Date().toISOString().split('T')[0]
        });

        setIsEditing(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah anda yakin ingin menghapus berita ini?")) {
            deleteNews(id);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            category: "Berita",
            excerpt: "",
            content: "",
            author: "Admin"
        });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Manajemen Berita</h2>
                    <p className="text-slate-500">Kelola berita, artikel, dan pengumuman.</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} className="gap-2">
                        <Plus size={18} /> Tambah Berita
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h3 className="font-bold text-lg">Tambah Berita Baru</h3>
                        <button onClick={() => { setIsEditing(false); resetForm(); }} className="text-slate-400 hover:text-slate-600" aria-label="Batal edit">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium text-slate-700">Judul Berita</label>
                                <input
                                    id="title"
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="category" className="text-sm font-medium text-slate-700">Kategori</label>
                                <select
                                    id="category"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Berita">Berita</option>
                                    <option value="Artikel">Artikel</option>
                                    <option value="Pengumuman">Pengumuman</option>
                                    <option value="Kegiatan">Kegiatan</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="excerpt" className="text-sm font-medium text-slate-700">Ringkasan (Excerpt)</label>
                                <textarea
                                    id="excerpt"
                                    required
                                    rows={2}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="content" className="text-sm font-medium text-slate-700">Konten Lengkap</label>
                                <textarea
                                    id="content"
                                    required
                                    rows={10}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none font-mono text-sm"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Tulis konten berita disini..."
                                />
                                <p className="text-xs text-slate-500">Mendukung format Markdown sederhana.</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => { setIsEditing(false); resetForm(); }}>Batal</Button>
                            <Button type="submit" className="gap-2"><Save size={18} /> Simpan Berita</Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-100 flex gap-4">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari berita..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-bold text-xs">
                            <tr>
                                <th className="p-4 w-12 text-center">No</th>
                                <th className="p-4">Judul</th>
                                <th className="p-4 w-32">Kategori</th>
                                <th className="p-4 w-32">Tanggal</th>
                                <th className="p-4 w-32 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="p-4 text-center text-slate-500">{index + 1}</td>
                                        <td className="p-4 font-medium text-slate-800">{item.title}</td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">{item.category}</span>
                                        </td>
                                        <td className="p-4 text-slate-500">{item.date}</td>
                                        <td className="p-4 text-center flex justify-center gap-2">
                                            <button aria-label="Edit Berita" className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button aria-label="Hapus Berita" onClick={() => handleDelete(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400">Tidak ada berita ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
