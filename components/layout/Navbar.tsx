"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Fish, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Beranda", href: "/" },
    {
        name: "Profil",
        href: "#",
        children: [
            { name: "Profil Dinas", href: "/profil" },
            { name: "Struktur Organisasi", href: "/profil/struktur" },
            { name: "Daftar Pejabat", href: "/profil/pegawai" },
        ],
    },
    {
        name: "Bidang",
        href: "#",
        children: [
            { name: "Perikanan Tangkap", href: "/bidang/tangkap" },
            { name: "Perikanan Budidaya", href: "/bidang/budidaya" },
            { name: "Pelayanan & Pengawasan", href: "/bidang/pengawasan" },
            { name: "Pengolahan & PDS", href: "/bidang/pengolahan" },
        ],
    },
    {
        name: "Informasi",
        href: "#",
        children: [
            { name: "Berita", href: "/informasi/berita" },
            { name: "Galeri", href: "/informasi/galeri" },
            { name: "Dokumen", href: "/dokumen" }, // TODO: Make page if needed or link to drive
            { name: "Kalender Musim Ikan", href: "/informasi/musim-ikan" },
        ],
    },
    {
        name: "Layanan",
        href: "#",
        children: [
            { name: "Pengaduan Online", href: "/layanan/pengaduan" },
        ],
    },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <Fish size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">
                                Pemerintah Kab. Pamekasan
                            </span>
                            <span className="text-xl font-bold text-primary leading-none">
                                Dinas Perikanan
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.children ? (
                                    <button
                                        className="flex items-center gap-1 text-slate-700 hover:text-primary font-medium transition-colors py-2"
                                    >
                                        {item.name}
                                        <ChevronDown size={16} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-slate-700 hover:text-primary font-medium transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* Dropdown Desktop */}
                                {item.children && (
                                    <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 z-50">
                                        <div className="py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Search Widget */}
                        <div className="relative">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.input
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        type="text"
                                        placeholder="Cari..."
                                        className="absolute right-10 top-1/2 -translate-y-1/2 px-3 py-1 text-sm border border-slate-200 rounded-full focus:outline-none focus:border-primary bg-white shadow-sm"
                                        autoFocus
                                        aria-label="Cari di website"
                                    />
                                )}
                            </AnimatePresence>
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-slate-700 hover:text-primary p-2 transition-colors"
                                aria-label="Buka pencarian"
                            >
                                <Search size={20} />
                            </button>
                        </div>

                        <Button>Hubungi Kami</Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-700 hover:text-primary p-2"
                            aria-label="Toggle mobile menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {/* Mobile Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Cari berita atau dokumen..."
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50"
                                    aria-label="Cari berita atau dokumen"
                                />
                            </div>

                            {navItems.map((item) => (
                                <div key={item.name}>
                                    {item.children ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.name)}
                                                className="flex w-full items-center justify-between py-3 text-base font-medium text-slate-700 border-b border-slate-100"
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    size={16}
                                                    className={cn(
                                                        "transition-transform",
                                                        activeDropdown === item.name ? "rotate-180" : ""
                                                    )}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === item.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="bg-slate-50 px-4 py-2 space-y-2"
                                                    >
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                href={child.href}
                                                                className="block py-2 text-sm text-slate-600"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="block py-3 text-base font-medium text-slate-700 border-b border-slate-100"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4">
                                <Button className="w-full">Hubungi Kami</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
