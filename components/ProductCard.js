// components/ProductCard.js
import Image from 'next/image';
import { useBudget } from '../context/BudgetContext';

const ProductCard = ({ product }) => {
  const { addToBudget } = useBudget();

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow flex flex-col">
      <div className="relative w-full h-48">
        {/* CÓDIGO DA IMAGEM ATUALIZADO */}
        <Image
          src={product.imageUrl || '/images/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 border-t flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-md flex-grow">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.volume}</p>
        <button 
          onClick={() => addToBudget(product)}
          className="mt-4 w-full bg-brand-red text-white py-2 rounded-md hover:bg-brand-red-dark transition-colors"
        >
          Adicionar ao Orçamento
        </button>
      </div>
    </div>
  );
};

export default ProductCard;