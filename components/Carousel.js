// components/Carousel.js
import React from 'react'
import Image from 'next/image' // Importamos o componente de Imagem
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export const EmblaCarousel = ({ products }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 2000 })])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {products.map((product) => (
          <div className="embla__slide" key={product.id}>
            <div className="flex flex-col items-center justify-between h-full border-2 border-gray-200 rounded-lg p-4 shadow-lg bg-white">
              {/* ADICIONAMOS A IMAGEM AQUI */}
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={150} 
                height={150}
                className="object-contain h-32 w-full mb-4"
              />
              <h3 className="text-lg font-bold text-center text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.volume}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}