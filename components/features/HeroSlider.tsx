"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/slides/slide1.jpg",
        title: "Dinas Perikanan Kabupaten Pamekasan",
        description: "Mewujudkan Perikanan yang Mandiri, Berdaya Saing, dan Berkelanjutan.",
    },
    {
        id: 2,
        image: "/slides/slide2.jpg",
        title: "Pelayanan Publik Prima",
        description: "Kami siap melayani kebutuhan administrasi dan perizinan nelayan dengan cepat dan transparan.",
    },
    {
        id: 3,
        image: "/slides/slide3.jpg",
        title: "Potensi Kelautan Melimpah",
        description: "Mengoptimalkan hasil laut Pamekasan untuk kesejahteraan masyarakat pesisir.",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image Placeholder if file not found, use color */}
                    <div className="absolute inset-0 bg-slate-800" />
                    {/* Real Image: In real app, un-comment below. For now using placeholder logic or ensure images exist */}
                    {/* Real Image using Next.js Image for optimization and avoiding inline style lint */}
                    <div className="absolute inset-0">
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl text-white">
                    <motion.h1
                        key={`h1-${current}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
                    >
                        {slides[current].title}
                    </motion.h1>
                    <motion.p
                        key={`p-${current}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl mb-8 text-slate-100 drop-shadow-md"
                    >
                        {slides[current].description}
                    </motion.p>
                    <motion.div
                        key={`btn-${current}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4 justify-center"
                    >
                        <Button size="lg" className="bg-primary hover:bg-blue-700 text-white border-0">
                            Jelajahi Profil
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                            Layanan Publik
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all" aria-label="Previous slide">
                <ChevronLeft size={32} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all" aria-label="Next slide">
                <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
