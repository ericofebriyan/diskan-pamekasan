"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export type AgendaItem = {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;
    status: "Akan Datang" | "Selesai" | "Ditunda";
};

export type NewsItem = {
    id: number;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    category: string;
    content: string;
};

export type GalleryItem = {
    id: number;
    title: string;
    image: string;
    date: string;
};

export type FishPriceItem = {
    id: number;
    name: string;
    price: number;
    unit: string; // e.g., 'kg'
    change: "up" | "down" | "stable";
    lastUpdated: string;
};

export type DocumentItem = {
    id: number;
    title: string;
    category: "Peraturan" | "Pengumuman" | "Laporan";
    fileUrl: string; // Mock URL
    date: string;
};

// Initial Data
const initialAgenda: AgendaItem[] = [
    { id: 1, title: "Rapat Koordinasi Mingguan", date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), time: "08:00 - 10:00", location: "Ruang Rapat Utama", type: "Rapat Internal", status: "Akan Datang" },
    { id: 2, title: "Kunjungan Lapangan Kelompok Nelayan", date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), time: "09:00 - 13:00", location: "Kec. Tlanakan", type: "Kunjungan", status: "Akan Datang" },
    { id: 3, title: "Sosialisasi Perizinan Online", date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), time: "08:30 - 12:00", location: "Aula Dinas", type: "Sosialisasi", status: "Akan Datang" },
    { id: 4, title: "Monitoring Harga Ikan", date: new Date().toISOString(), time: "05:00 - 08:00", location: "Pasar Kolpajung", type: "Monitoring", status: "Selesai" },
];

const initialNews: NewsItem[] = [
    { id: 1, title: "Penyaluran Bantuan Sarana Perikanan Tangkap Tahun Anggaran 2024", date: "2024-10-12", author: "Admin", excerpt: "Dinas Perikanan menyalurkan bantuan berupa mesin kapal dan jaring kepada 5 kelompok usaha bersama (KUB).", category: "Program", content: "" },
    { id: 2, title: "Sosialisasi Perizinan Online (E-Pas Kecil) di Kecamatan Tlanakan", date: "2024-10-10", author: "Humas", excerpt: "Kegiatan jemput bola pelayanan perizinan kapal nelayan < 5 GT.", category: "Pelayanan", content: "" },
    { id: 3, title: "Monitoring Harga Ikan di Pasar Kolpajung Minggu Ke-2 Oktober", date: "2024-10-08", author: "Tim Data", excerpt: "Harga ikan layang dan tongkol mengalami kenaikan tipis akibat cuaca.", category: "Informasi Pasar", content: "" },
];

const initialGallery: GalleryItem[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    title: `Dokumentasi Kegiatan Dinas ${i + 1}`,
    image: "", // Empty string will be handled as placeholder
    date: "2024-10-01"
}));

const initialFishPrices: FishPriceItem[] = [
    { id: 1, name: "Ikan Tongkol", price: 25000, unit: "kg", change: "up", lastUpdated: new Date().toISOString() },
    { id: 2, name: "Ikan Layang", price: 18000, unit: "kg", change: "stable", lastUpdated: new Date().toISOString() },
    { id: 3, name: "Ikan Kembung", price: 22000, unit: "kg", change: "down", lastUpdated: new Date().toISOString() },
    { id: 4, name: "Cumi-cumi", price: 65000, unit: "kg", change: "up", lastUpdated: new Date().toISOString() },
];

const initialDocuments: DocumentItem[] = [
    { id: 1, title: "Peraturan Bupati tentang Retribusi Perikanan", category: "Peraturan", date: "2024-01-15", fileUrl: "#" },
    { id: 2, title: "Laporan Kinerja Instansi Pemerintah 2023", category: "Laporan", date: "2024-03-10", fileUrl: "#" },
    { id: 3, title: "Pengumuman Pelelangan Kapal Ikan", category: "Pengumuman", date: "2024-10-20", fileUrl: "#" },
];

type AppContextType = {
    agenda: AgendaItem[];
    addAgenda: (item: Omit<AgendaItem, "id">) => void;
    deleteAgenda: (id: number) => void;
    news: NewsItem[];
    addNews: (item: Omit<NewsItem, "id">) => void;
    deleteNews: (id: number) => void;
    gallery: GalleryItem[];
    addGallery: (item: Omit<GalleryItem, "id">) => void;
    deleteGallery: (id: number) => void;
    fishPrices: FishPriceItem[];
    updateFishPrice: (id: number, newPrice: number) => void;
    documents: DocumentItem[];
    addDocument: (item: Omit<DocumentItem, "id">) => void;
    deleteDocument: (id: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    // Helper to load from localStorage
    const loadState = <T,>(key: string, fallback: T): T => {
        if (typeof window === "undefined") return fallback;
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : fallback;
        } catch (e) {
            console.error(`Error loading ${key}`, e);
            return fallback;
        }
    };

    // States with initializers that check localStorage
    const [agenda, setAgenda] = useState<AgendaItem[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [fishPrices, setFishPrices] = useState<FishPriceItem[]>([]);
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Hydrate on mount
    useEffect(() => {
        setAgenda(loadState("agenda", initialAgenda));
        setNews(loadState("news", initialNews));
        setGallery(loadState("gallery", initialGallery));
        setFishPrices(loadState("fishPrices", initialFishPrices));
        setDocuments(loadState("documents", initialDocuments));
        setIsInitialized(true);
    }, []);

    // Persist effects
    useEffect(() => {
        if (isInitialized) localStorage.setItem("agenda", JSON.stringify(agenda));
    }, [agenda, isInitialized]);

    useEffect(() => {
        if (isInitialized) localStorage.setItem("news", JSON.stringify(news));
    }, [news, isInitialized]);

    useEffect(() => {
        if (isInitialized) localStorage.setItem("gallery", JSON.stringify(gallery));
    }, [gallery, isInitialized]);

    useEffect(() => {
        if (isInitialized) localStorage.setItem("fishPrices", JSON.stringify(fishPrices));
    }, [fishPrices, isInitialized]);

    useEffect(() => {
        if (isInitialized) localStorage.setItem("documents", JSON.stringify(documents));
    }, [documents, isInitialized]);

    const addAgenda = (item: Omit<AgendaItem, "id">) => {
        const newItem = { ...item, id: Date.now() };
        setAgenda([newItem, ...agenda]);
    };

    const deleteAgenda = (id: number) => {
        setAgenda(agenda.filter((i) => i.id !== id));
    };

    const addNews = (item: Omit<NewsItem, "id">) => {
        const newItem = { ...item, id: Date.now() };
        setNews([newItem, ...news]);
    };

    const deleteNews = (id: number) => {
        setNews(news.filter((i) => i.id !== id));
    };

    const addGallery = (item: Omit<GalleryItem, "id">) => {
        const newItem = { ...item, id: Date.now() };
        setGallery([newItem, ...gallery]);
    };

    const deleteGallery = (id: number) => {
        setGallery(gallery.filter((i) => i.id !== id));
    };

    const updateFishPrice = (id: number, newPrice: number) => {
        setFishPrices(fishPrices.map(item => {
            if (item.id === id) {
                const change = newPrice > item.price ? "up" : newPrice < item.price ? "down" : "stable";
                return { ...item, price: newPrice, change, lastUpdated: new Date().toISOString() };
            }
            return item;
        }));
    };

    const addDocument = (item: Omit<DocumentItem, "id">) => {
        const newItem = { ...item, id: Date.now() };
        setDocuments([newItem, ...documents]);
    };

    const deleteDocument = (id: number) => {
        setDocuments(documents.filter((i) => i.id !== id));
    };

    if (!isInitialized) {
        return null; // or a loading spinner
    }

    return (
        <AppContext.Provider value={{ agenda, addAgenda, deleteAgenda, news, addNews, deleteNews, gallery, addGallery, deleteGallery, fishPrices, updateFishPrice, documents, addDocument, deleteDocument }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
