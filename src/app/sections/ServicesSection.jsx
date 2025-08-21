"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Images
const trekkingImages = ["/rajasthan1.jpg","/rajasthan2.jpg","/rajasthan3.jpg","/rajasthan4.jpg","/rajasthan5.jpg"];
const heritageImages = ["/rajasthan1.jpg","/rajasthan2.jpg","/rajasthan3.jpg","/rajasthan4.jpg","/rajasthan5.jpg"];
const toursImages = ["/rajasthan1.jpg","/rajasthan2.jpg","/rajasthan3.jpg","/rajasthan4.jpg","/rajasthan5.jpg"];

// Tile sizes
const tileSizes = [
  { width: 240, height: 160 },
  { width: 160, height: 160 },
  { width: 320, height: 160 },
  { width: 160, height: 240 },
  { width: 240, height: 240 },
];

// Utilities
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateRow = (imagesArray, length) => {
  const shuffled = shuffleArray(imagesArray);
  return shuffled.slice(0, length).map((src) => {
    const size = tileSizes[Math.floor(Math.random() * tileSizes.length)];
    return { src, size };
  });
};

const BentoTile = ({ tile }) => (
  <div
    className="relative rounded-xl overflow-hidden shadow-md flex-shrink-0 hover:scale-105 transition-transform duration-500 cursor-pointer"
    style={{ width: tile.size.width, height: tile.size.height, minWidth: tile.size.width }}
  >
    <Image src={tile.src} alt="Image" fill className="object-cover" />
  </div>
);

const BentoSection = ({ title, description, images, speed }) => {
  const scrollRef = useRef(null);
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    setRow1(generateRow(images, 6));
    setRow2(generateRow(images, 6));
  }, [images]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let frame;
    const step = () => {
      if (!isUserScrolling) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isUserScrolling, speed]);

  const handlePointerDown = () => setIsUserScrolling(true);
  const handlePointerUp = () => setIsUserScrolling(false);

  const allRows = [...row1, ...row1];
  const allRows2 = [...row2, ...row2];

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-amber-800 mb-3">{title}</h2>
        <p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-white z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-white z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex flex-col gap-4 px-4 overflow-x-scroll snap-x snap-mandatory scrollbar-hide touch-pan-x"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="flex gap-4">
            {allRows.map((tile, idx) => (
              <BentoTile key={`r1-${idx}`} tile={tile} />
            ))}
          </div>
          <div className="flex gap-4">
            {allRows2.map((tile, idx) => (
              <BentoTile key={`r2-${idx}`} tile={tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AdventuresSection() {
  return (
    <>
      <BentoSection
        title="Trekking Adventures"
        description="Explore scenic trails, hills, and hidden trekking routes in Rajasthan."
        images={trekkingImages}
        speed={0.5} // Slow
      />
      <BentoSection
        title="Heritage Walks & Temples"
        description="Experience Rajasthan's culture, temples, and heritage walks through historical trails."
        images={heritageImages}
        speed={0.7} // Slightly faster
      />
      <BentoSection
        title="Tours & Events"
        description="Join curated tours and exciting events across Rajasthan, from festivals to cultural experiences."
        images={toursImages}
        speed={1} // Fastest
      />
    </>
  );
}
