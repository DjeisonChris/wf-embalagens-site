// components/ProductCard.js
import { useBudget } from '../context/BudgetContext';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { addToBudget } = useBudget();
  // A URL agora é mais simples e direta
  const detailUrl = `/produto/${product.slug}`;
  // A tag principal será a primeira da lista de categorias
  const primaryCategory = product.categories && product.categories[0];

  return (
    <div className="group border rounded-lg shadow-md bg-white flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
      <Link href={detailUrl} className="block cursor-pointer">
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrl || '/images/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
          />
          {primaryCategory && (
            <div className="absolute top-3 left-3 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-md">
              {primaryCategory}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 border-t flex flex-col flex-grow">
        {product.brand && (
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
        )}
        <h3 className="font-bold text-gray-800 text-md flex-grow transition-colors group-hover:text-brand-red">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-2 text-sm">{product.volume}</p>
        
        <div className="mt-auto pt-4">
          <button 
            onClick={() => addToBudget(product)}
            className="w-full border border-gray-300 text-gray-700 font-bold py-2 rounded-md transition-colors group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red hover:!bg-brand-yellow hover:!text-brand-brown hover:!border-brand-yellow"
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span>Adicionar ao Orçamento</span>
            </span>
          </button>

          <Link href={detailUrl} className="mt-2 w-full bg-gray-100 text-gray-600 font-bold py-2 rounded-md transition-colors hover:bg-gray-200 text-center block">
             <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <span>Ver Detalhes</span>
             </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;