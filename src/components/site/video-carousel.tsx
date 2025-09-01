'use client';

import { useEffect, useRef, useState } from 'react';

const SOURCES = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4', '/videos/4.mp4'];

export function VideoCarousel({ title, subtitle }: { title?: string, subtitle?: string }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Toca o vídeo ativo e pausa os demais
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        try {
          v.currentTime = 0;
          // autoplay silencioso (necessário para a maioria dos browsers)
          v.play().catch(() => {});
        } catch {}
      } else {
        try {
          v.pause();
        } catch {}
      }
    });
  }, [index]);

  // Auto-rotação
  const startAuto = () => {
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SOURCES.length);
    }, 8000);
  };
  const stopAuto = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  // Navegação por teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + SOURCES.length) % SOURCES.length);
  const next = () => setIndex((i) => (i + 1) % SOURCES.length);

  return (
    <section
      aria-label="Destaques em vídeo"
      className="mx-auto mt-12 w-full max-w-6xl px-4"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
        <div className="max-w-3xl">
        {title && <h2 className="text-3xl lg:text-4xl font-bold mb-2">{title}</h2>}
        {subtitle && (
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            {subtitle}
            </p>
        )}
        </div>
      <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
        {SOURCES.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === index ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            playsInline
            preload="metadata"
            loop
            controls={false}
            autoPlay={i === index}          // ajuda no iOS
            aria-hidden={i !== index}
            onError={(e) => {
                console.error('Falha ao carregar vídeo:', src, e);
                if (i === index) next();      // pula o quebrado
            }}
            onLoadedMetadata={() => console.log('Metadata OK:', src)}
            >
            <source src={src} type="video/mp4" />
        </video>
        ))}
        {/* Controles esquerda/direita */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
          <button
            onClick={prev}
            className="pointer-events-auto rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur transition hover:bg-black/60"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="pointer-events-auto rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur transition hover:bg-black/60"
            aria-label="Próximo"
          >
            ›
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {SOURCES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para vídeo ${i + 1}`}
            className={`h-2 w-8 rounded-full transition ${
              i === index ? 'bg-black/80' : 'bg-black/30 hover:bg-black/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
