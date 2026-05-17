import { useEffect, useState } from "react";

export function ImageCarousel({ interval = 4000 }) {
  // Carga todas las imágenes del directorio (Vite)
  const images = Object.values(
    import.meta.glob("/src/assets/carousel/*.{jpg,jpeg,png,webp}", {
      eager: true,
      as: "url",
    }),
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-3xl shadow-xl bg-[#f6f1ec]">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
          style={{
            opacity: index === current ? 1 : 0,
          }}
        >
          <img
            src={img}
            alt={`carousel-${index}`}
            className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms]"
            style={{
              transform: index === current ? "scale(1.02)" : "scale(1)",
            }}
          />
        </div>
      ))}

      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b1f1a]/40 via-transparent to-transparent" />

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#e7ddd4]" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
