// components/Header.js
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBudget } from '../context/BudgetContext';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { items, isMiniCartOpen, openMiniCart, closeMiniCart } = useBudget();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar ambos os menus ao navegar
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    closeMiniCart();
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Barra superior */}
      <div className="bg-brand-red-dark text-white px-4 py-2 text-xs md:text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <span>Horário: Seg-Sex 08:00-12:00 | 13h30-18:00</span>
          <span className="hidden md:inline">(47) 99288-6358</span>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="bg-white px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" onClick={handleLinkClick}>
            <div className="relative h-[48px] w-[300px] md:h-[64px] md:w-[350px] cursor-pointer">
              <Image 
                src="/logo-wf.png" 
                alt="WF Embalagens Logo" 
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain"
                priority={true}
              />
            </div>
          </Link>
          
          {/* Links de Navegação para Desktop */}
          <div className="hidden md:flex items-center gap-6 text-lg font-medium">
            <Link href="/" className="text-gray-700 hover:text-brand-red transition-colors" onClick={handleLinkClick}>Início</Link>
            <Link href="/produtos" className="text-gray-700 hover:text-brand-red transition-colors" onClick={handleLinkClick}>Produtos</Link>
            <Link href="/sobre" className="text-gray-700 hover:text-brand-red transition-colors" onClick={handleLinkClick}>Sobre</Link>
            <Link href="/blog" className="text-gray-700 hover:text-brand-red transition-colors" onClick={handleLinkClick}>Blog</Link>
            <Link href="/contato" className="text-gray-700 hover:text-brand-red transition-colors" onClick={handleLinkClick}>Contato</Link>
            
            {/* Botão de Orçamento com o Dropdown */}
            <div className="relative" onMouseEnter={openMiniCart} onMouseLeave={closeMiniCart}>
              <Link href="/orcamento" className="relative text-white bg-brand-red px-4 py-2 rounded-md hover:bg-brand-red-dark transition-colors flex items-center gap-2">
                <FaShoppingCart />
                <span className="hidden lg:inline">Lista de Orçamento</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-brown text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
                )}
              </Link>

              {/* O Dropdown do Mini-Carrinho */}
              {isMiniCartOpen && items.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">Itens Adicionados:</h3>
                    <ul className="my-4 space-y-3 max-h-60 overflow-y-auto">
                      {items.map(item => (
                        <li key={item.id} className="flex items-center gap-3 text-sm">
                          <img src={item.imageUrl || '/images/placeholder.png'} alt={item.name} className="h-12 w-12 object-contain rounded-md border" />
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-700">{item.name}</p>
                            <p className="text-gray-500">Qtd: {item.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Link href="/orcamento" className="block w-full text-center bg-brand-red text-white py-2 rounded-md hover:bg-brand-red-dark transition-colors" onClick={handleLinkClick}>
                        Finalizar Orçamento
                      </Link>
                      <Link href="/produtos" className="block w-full text-center bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors" onClick={handleLinkClick}>
                        Ver Mais Produtos
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botão Hambúrguer para Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <IoClose className="h-6 w-6 text-gray-700" /> : <IoMenu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Menu Dropdown para Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleLinkClick}>Início</Link>
            <Link href="/produtos" className="block text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleLinkClick}>Produtos</Link>
            <Link href="/sobre" className="block text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleLinkClick}>Sobre</Link>
            <Link href="/blog" className="block text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleLinkClick}>Blog</Link>
            <Link href="/contato" className="block text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleLinkClick}>Contato</Link>
            <Link href="/orcamento" className="block text-center py-2 bg-brand-red text-white hover:bg-brand-red-dark rounded-md" onClick={handleLinkClick}>Lista de Orçamento ({totalItems})</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;