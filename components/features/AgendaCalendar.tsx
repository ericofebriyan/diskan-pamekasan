"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export default function AgendaCalendar() {
    const { agenda: events } = useApp();
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get Start of Week (Monday)
    const getStartOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    };

    const startOfWeek = getStartOfWeek(new Date(currentDate));

    // Generate 7 days
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    const nextWeek = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() + 7);
        setCurrentDate(next);
    };

    const prevWeek = () => {
        const prev = new Date(currentDate);
        prev.setDate(currentDate.getDate() - 7);
        setCurrentDate(prev);
    };

    const getEventsForDay = (date: Date) => {
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear();
        });
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <Button variant="outline" size="sm" onClick={prevWeek}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Minggu Lalu
                </Button>
                <div className="text-center">
                    <h2 className="text-lg font-bold text-slate-900">
                        {new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentDate)}
                    </h2>
                    <p className="text-xs text-slate-500">
                        {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(weekDays[0])} - {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(weekDays[6])}
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={nextWeek}>
                    Minggu Depan
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {/* Days List */}
            <div className="space-y-4">
                {weekDays.map((day, idx) => {
                    const dayEvents = getEventsForDay(day);
                    return (
                        <div key={idx} className={`bg-white rounded-xl shadow-sm border ${isToday(day) ? 'border-primary ring-1 ring-primary' : 'border-slate-100'} overflow-hidden transition-all hover:shadow-md`}>
                            <div className={`px-6 py-3 border-b border-slate-100 flex justify-between items-center ${isToday(day) ? 'bg-blue-50' : 'bg-slate-50/50'}`}>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold ${isToday(day) ? 'text-primary' : 'text-slate-700'}`}>
                                        {formatDate(day)}
                                    </span>
                                    {isToday(day) && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded-full">
                                            Hari Ini
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-slate-400">
                                    {dayEvents.length} Kegiatan
                                </span>
                            </div>

                            <div className="p-4">
                                {dayEvents.length > 0 ? (
                                    <div className="grid gap-4">
                                        {dayEvents.map(event => (
                                            <div key={event.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                                                <div className="flex-shrink-0 w-24 text-center sm:text-left">
                                                    <div className="flex items-center gap-1.5 text-primary font-bold">
                                                        <Clock size={16} />
                                                        <span className="text-sm">{event.time}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-slate-800">{event.title}</h4>
                                                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={14} />
                                                            <span>{event.location}</span>
                                                        </div>
                                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                        <span className="text-slate-400 italic">{event.type}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <Button size="sm" variant="ghost">Detail</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-slate-400 italic text-sm">
                                        Tidak ada agenda kegiatan.
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
