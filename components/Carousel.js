// components/Carousel.js
import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const EmblaCarousel = ({ children, autoplay: useAutoplay = false }) => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));
  
  const plugins = useAutoplay ? [autoplay.current] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleMouseEnter = () => { if (useAutoplay) autoplay.current.stop(); };
  const handleMouseLeave = () => { if (useAutoplay) autoplay.current.play(); };
  
  // AQUI ESTÁ A NOVA LÓGICA INTELIGENTE:
  const childCount = React.Children.count(children);

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="embla" ref={emblaRef}>
        {/* Adicionamos a classe 'justify-center' apenas se tiver 2 ou menos itens */}
        <div className={`embla__container ${childCount <= 2 ? 'justify-center' : ''}`}>
          {children}
        </div>
      </div>
      
      {!useAutoplay && (
        <>
          <button className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" onClick={scrollPrev} disabled={prevBtnDisabled}>
            <FaChevronLeft className="text-gray-700" />
          </button>
          <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" onClick={scrollNext} disabled={nextBtnDisabled}>
            <FaChevronRight className="text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
};