"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Settings, LogOut, File, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menu = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Berita & Artikel", href: "/admin/berita", icon: FileText },
        { name: "Dokumen", href: "/admin/dokumen", icon: File },
        { name: "Layanan", href: "/admin/layanan", icon: Users },
        { name: "Pengaturan", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen flex bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    <p className="text-xs text-slate-500">Dinas Perikanan</p>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {menu.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-primary text-white" : "hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
