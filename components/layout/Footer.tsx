import { Fish, Mail, MapPin, Phone, Facebook, Youtube, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Identity */}
                    <div className="space-y-6">
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
                        {/* Social Media */}
                        <div className="flex gap-4">
                            <Link href="#" aria-label="Facebook Dinas Perikanan" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" aria-label="Instagram Dinas Perikanan" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" aria-label="YouTube Dinas Perikanan" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all">
                                <Youtube size={18} />
                            </Link>
                            <Link href="#" aria-label="Twitter Dinas Perikanan" className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all">
                                <Twitter size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Contact & Map */}
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
                        {/* Integrated Map (Placeholder for now) */}
                        <div className="w-full h-32 rounded-lg overflow-hidden border border-slate-700 mt-4">
                            <iframe
                                title="Peta Lokasi Dinas Perikanan Pamekasan"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d113.4!3d-7.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDYnMDAuMCJTIDExM8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                allowFullScreen
                                loading="lazy"
                                className="w-full h-full grayscale hover:grayscale-0 transition-all border-0"
                            ></iframe>
                        </div>
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
                                <Link href="/layanan/pengaduan" className="hover:text-primary transition-colors">
                                    Layanan Pengaduan
                                </Link>
                            </li>
                            <li>
                                <Link href="https://kp.go.id" target="_blank" className="hover:text-primary transition-colors">
                                    Kementerian Kelautan & Perikanan
                                </Link>
                            </li>
                            <li>
                                <Link href="https://pamekasankab.go.id" target="_blank" className="hover:text-primary transition-colors">
                                    Pemkab Pamekasan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Jam Pelayanan */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Jam Pelayanan</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span>Senin - Kamis</span>
                                <span>07:30 - 16:00</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span>Jumat</span>
                                <span>07:30 - 15:00</span>
                            </li>
                            <li className="flex justify-between text-slate-500 pt-2">
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
