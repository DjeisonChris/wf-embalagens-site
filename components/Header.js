// components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import { useBudget } from '../context/BudgetContext';

const Header = () => {
  const { items } = useBudget();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Barra superior */}
      <div className="bg-brand-red-dark text-white px-6 py-2 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <span>Horário: Seg-Sex 08:00-12:00 | 13h30-18:00</span>
          <span>(47) 99288-6358</span>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="bg-white px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          
          <Link href="/">
            <div className="relative h-12 w-48 cursor-pointer">
              <Image 
                src="/logo-wf.png" 
                alt="WF Embalagens Logo" 
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Links de Navegação */}
          <div className="flex items-center gap-6 text-lg font-medium">
            <Link href="/" className="text-gray-700 hover:text-brand-red transition-colors">
              Início
            </Link>
            <Link href="/produtos" className="text-gray-700 hover:text-brand-red transition-colors">
              Produtos
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-brand-red transition-colors">
              Sobre
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-brand-red transition-colors">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-brand-red transition-colors">
              Contato
            </Link>
            
            <Link href="/orcamento" className="relative text-white bg-brand-red px-4 py-2 rounded-md hover:bg-brand-red-dark transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span>Lista de Orçamento</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;