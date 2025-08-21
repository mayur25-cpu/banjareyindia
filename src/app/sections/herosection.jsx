"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const images = [
 `/banjareyindia/rajasthan1.jpg`,
  `${prefix}/rajasthan2.jpg`,
  `${prefix}/rajasthan3.jpg`,
  `${prefix}/rajasthan4.jpg`,
  `${prefix}/rajasthan5.jpg`,
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [sparks, setSparks] = useState([]);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate sparks only on client
  useEffect(() => {
    const generatedSparks = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      yMovement: Math.random() * 100 + 50,
      delay: Math.random() * 5,
    }));
    setSparks(generatedSparks);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background slideshow */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: spark.width,
              height: spark.height,
              top: `${spark.top}%`,
              left: `${spark.left}%`,
              opacity: 0.8,
              boxShadow: "0 0 8px rgba(255,200,100,0.8)",
            }}
            animate={{
              y: [0, -spark.yMovement, 0],
              opacity: [0.9, 0.3, 0.9],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-amber-200 drop-shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Discover Rajasthan with <span className="text-amber-400">Banjarey India</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-100"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Trekking • Heritage Walks • Cultural Events • Guided Tours
        </motion.p>
        <motion.div
          className="mt-6 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
            Join Us
          </button>
          <button className="px-6 py-3 rounded-full border border-amber-400 text-amber-200 font-semibold hover:bg-amber-400 hover:text-black transition">
            Explore Tours
          </button>
        </motion.div>
      </div>
    </section>
  );
}
