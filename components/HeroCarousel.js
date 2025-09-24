// components/HeroCarousel.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

// CORREÇÃO: Movi o SlideInner para o topo do arquivo.
const SlideInner = ({ slide }) => {
  const hasOverlay = (slide.backgroundUrl || slide.backgroundUrlMobile) && (slide.title || slide.subtitle);

  return (
    <div 
      className="w-full h-full flex items-center justify-center py-16 md:py-20 min-h-[500px] md:min-h-[450px]"
      style={{
        backgroundColor: hasOverlay ? 'rgba(0,0,0,0.5)' : 'transparent',
        backgroundBlendMode: hasOverlay ? 'darken' : 'normal',
      }}
    >
      {/* O fundo para DESKTOP (escondido no mobile) */}
      {slide.backgroundUrl && (
        <div 
          className="absolute inset-0 z-0 hidden md:block"
          style={{
            backgroundImage: `url(${slide.backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        />
      )}
      {/* O fundo para MOBILE (escondido no desktop) */}
      {slide.backgroundUrlMobile && (
         <div 
          className="absolute inset-0 z-0 md:hidden"
          style={{
            backgroundImage: `url(${slide.backgroundUrlMobile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        />
      )}
      
      {/* Conteúdo do slide (texto e botões) */}
      <div className="relative z-10 container mx-auto px-4 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{slide.title}</h1>
        <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
        <p className="max-w-3xl mx-auto mb-8 text-gray-200">{slide.paragraph}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {slide.button1Text && (
            <Link href={slide.button1Link || '#'} className="border-2 border-white text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-white hover:text-brand-red-dark transition-colors w-full sm:w-auto">
              {slide.button1Text}
            </Link>
          )}
          {slide.button2Text && (
            <Link href={slide.button2Link || '#'} className="bg-white text-brand-red-dark font-bold py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto">
              {slide.button2Text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Slide = ({ slide }) => {
  return slide.bannerLinkUrl ? (
    <Link href={slide.bannerLinkUrl} className="flex-shrink-0 w-full block cursor-pointer relative">
      <SlideInner slide={slide} />
    </Link>
  ) : (
    <div className="flex-shrink-0 w-full relative">
      <SlideInner slide={slide} />
    </div>
  );
};

export const HeroCarousel = ({ slides }) => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi, setSelectedIndex]);
  useEffect(() => { if (!emblaApi) return; onSelect(); setScrollSnaps(emblaApi.scrollSnapList()); emblaApi.on('select', onSelect); }, [emblaApi, setScrollSnaps, onSelect]);

  const handleMouseEnter = () => autoplay.current.stop();
  const handleMouseLeave = () => autoplay.current.play();

  return (
    <div className="relative w-full bg-brand-red-dark" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <Slide key={index} slide={slide} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {scrollSnaps.map((_, index) => (
          <button key={index} onClick={() => scrollTo(index)} className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};