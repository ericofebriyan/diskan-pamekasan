"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Upload, FileText, ChevronRight, ChevronLeft } from "lucide-react";

export default function BBMServicesPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nama: "",
        nik: "",
        alamat: "",
        jenisKapal: "",
        fileKTP: null,
        filePasKecil: null
    });

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Permohonan Rekomendasi BBM</h1>
                    <p className="text-slate-600">Ajukan surat rekomendasi pembelian BBM subsidi untuk nelayan secara online.</p>
                </div>

                {/* Stepper */}
                <div className="mb-8 flex justify-center items-center">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? "bg-primary text-white" : "bg-slate-200 text-slate-500"
                                }`}>
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            {s < 3 && (
                                <div className={`w-12 h-1 ${step > s ? "bg-primary" : "bg-slate-200"} mx-2`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Data Pemohon</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        placeholder="Sesuai KTP"
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                                        value={formData.nama}
                                        onChange={e => setFormData({ ...formData, nama: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">NIK</label>
                                    <input
                                        type="text"
                                        placeholder="16 Digit NIK"
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                                        value={formData.nik}
                                        onChange={e => setFormData({ ...formData, nik: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                                    <textarea
                                        placeholder="Alamat tempat tinggal"
                                        rows={3}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                                        value={formData.alamat}
                                        onChange={e => setFormData({ ...formData, alamat: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kapal / GT</label>
                                    <select
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none bg-white"
                                        value={formData.jenisKapal}
                                        onChange={e => setFormData({ ...formData, jenisKapal: e.target.value })}
                                        aria-label="Pilih Jenis Kapal"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="< 5 GT">Kapal &lt; 5 GT</option>
                                        <option value="5 - 10 GT">Kapal 5 - 10 GT</option>
                                        <option value="> 10 GT">Kapal &gt; 10 GT</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">Upload Dokumen</h2>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-primary group-hover:bg-blue-50">
                                        <Upload size={24} />
                                    </div>
                                    <h3 className="font-medium text-slate-700">Foto KTP</h3>
                                    <p className="text-xs text-slate-500 mt-1">Drag file kesini atau klik untuk upload (Max 2MB)</p>
                                </div>

                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-primary group-hover:bg-blue-50">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="font-medium text-slate-700">Scan Pas Kecil / Dokumen Kapal</h3>
                                    <p className="text-xs text-slate-500 mt-1">Drag file kesini atau klik untuk upload (Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 text-center py-8">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Konfirmasi Pengajuan</h2>
                            <p className="text-slate-600 max-w-md mx-auto">
                                Pastikan data yang Anda masukkan sudah benar. Pengajuan akan diproses oleh admin Dinas Perikanan dalam waktu 1-3 hari kerja.
                            </p>

                            <div className="bg-slate-50 p-4 rounded-lg text-left max-w-sm mx-auto mt-6 text-sm text-slate-600 space-y-2 border border-slate-200">
                                <p><strong>Nama:</strong> {formData.nama || "-"}</p>
                                <p><strong>NIK:</strong> {formData.nik || "-"}</p>
                                <p><strong>Kapal:</strong> {formData.jenisKapal || "-"}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={handlePrev}
                            disabled={step === 1}
                            className={step === 1 ? "invisible" : ""}
                        >
                            <ChevronLeft size={16} className="mr-2" /> Kembali
                        </Button>

                        {step < 3 ? (
                            <Button onClick={handleNext}>
                                Selanjutnya <ChevronRight size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button className="bg-green-600 hover:bg-green-700">
                                Kirim Permohonan <Check size={16} className="ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
