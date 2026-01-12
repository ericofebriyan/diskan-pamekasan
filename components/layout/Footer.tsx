import { Fish, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                <Fish size={32} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                    Pemerintah Kab. Pamekasan
                                </span>
                                <span className="text-lg font-bold text-white leading-none">
                                    Dinas Perikanan
                                </span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Mewujudkan pengelolaan sumber daya perikanan yang berkelanjutan dan mensejahterakan masyarakat nelayan Pamekasan.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Hubungi Kami</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">
                                    Jl. KH. Wakhid Hasyim No. 5, Pamekasan, Jawa Timur 69321
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">(0324) 326051</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm">diskan@pamekasankab.go.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/profil" className="hover:text-primary transition-colors">
                                    Profil Dinas
                                </Link>
                            </li>
                            <li>
                                <Link href="/informasi/berita" className="hover:text-primary transition-colors">
                                    Berita Terbaru
                                </Link>
                            </li>
                            <li>
                                <Link href="/dokumen" className="hover:text-primary transition-colors">
                                    Unduh Dokumen
                                </Link>
                            </li>
                            <li>
                                <Link href="https://pamekasankab.go.id" target="_blank" className="hover:text-primary transition-colors">
                                    Pemkab Pamekasan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Jam Pelayanan (Additional) */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Jam Pelayanan</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                                <span>Senin - Kamis</span>
                                <span>07:30 - 16:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Jumat</span>
                                <span>07:30 - 15:00</span>
                            </li>
                            <li className="flex justify-between text-slate-500">
                                <span>Sabtu - Minggu</span>
                                <span>Tutup</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Dinas Perikanan Kabupaten Pamekasan. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}
