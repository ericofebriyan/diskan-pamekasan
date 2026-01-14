import { Users, Anchor, Leaf } from "lucide-react";

const stats = [
    {
        id: 1,
        label: "Jumlah Nelayan",
        value: "12,450",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-100",
    },
    {
        id: 2,
        label: "Armada Kapal",
        value: "3,200+",
        icon: Anchor,
        color: "text-indigo-600",
        bg: "bg-indigo-100",
    },
    {
        id: 3,
        label: "Produksi Perikanan",
        value: "25.8 Ton",
        icon: Leaf,
        color: "text-green-600",
        bg: "bg-green-100",
    },
];

export default function StatsSection() {
    return (
        <section className="py-12 bg-white relative z-20 -mt-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1"
                        >
                            <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
