// components/ProductCard.js
import { useBudget } from '../context/BudgetContext';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { addToBudget } = useBudget();
  // A URL agora é mais simples
  const detailUrl = `/produto/${product.slug}`;
  // A tag principal será a primeira da lista de categorias
  const primaryCategory = product.categories && product.categories[0];

  return (
    <div className="group border rounded-lg shadow-md bg-white flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
        <h3 className="font-bold text-gray-800 text-md flex-grow transition-colors group-hover:text-brand-red">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-2 text-sm">{product.volume}</p>
        <div className="mt-auto pt-4">
          <button 
            onClick={() => addToBudget(product)}
            className="w-full border border-gray-300 text-gray-700 font-bold py-2 rounded-md transition-colors group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red hover:!bg-brand-yellow hover:!text-brand-brown hover:!border-brand-yellow"
          >
            {/* ... ícone e texto do botão ... */}
          </button>
          <Link href={detailUrl} className="mt-2 w-full bg-gray-100 text-gray-600 font-bold py-2 rounded-md transition-colors hover:bg-gray-200 text-center block">
             {/* ... ícone e texto do botão ... */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;