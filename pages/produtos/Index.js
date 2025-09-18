// pages/produtos.js
import { useState } from 'react'; // Importamos o useState do React
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  // 1. BUSCAR PRODUTOS (igual antes)
  const productsSheetName = 'Produtos';
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
  let allActiveProducts = [];
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    const allProducts = data.values.slice(1).map(row => ({
      id: row[0] || null, name: row[1] || '', description: row[2] || '',
      volume: row[3] || '', category: row[4] || '', imageUrl: row[5] || '',
      isFeatured: row[6] || 'NÃO', isActive: row[7] || 'NÃO'
    }));
    allActiveProducts = allProducts.filter(product => product.isActive === 'SIM');
  } catch (error) {
    console.error("Falha ao buscar Produtos:", error.message);
  }

  // 2. BUSCAR CATEGORIAS (precisamos delas para os botões de filtro)
  const categoriesSheetName = 'Categorias';
  const categoriesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${categoriesSheetName}?key=${apiKey}`;
  let categories = [];
  try {
    const res = await fetch(categoriesUrl);
    const data = await res.json();
    categories = data.values.slice(1).map(row => ({
      name: row[0] || '', imageUrl: row[1] || ''
    }));
  } catch (error) {
    console.error("Falha ao buscar Categorias:", error.message);
  }
  
  return {
    props: {
      products: allActiveProducts,
      categories: categories, // Enviamos também as categorias para a página
    },
    revalidate: 60,
  };
}

const ProdutosPage = ({ products, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory === 'Todos') return true;
      return product.category === selectedCategory;
    })
    .filter(product => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Nossos Produtos</h1>
        
        {/* ... (Área de busca e filtros continua a mesma) ... */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
          <input 
            type="text"
            placeholder="Buscar pelo nome do produto..."
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" /></svg>
            <button 
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedCategory === 'Todos' ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-brand-yellow'}`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button 
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedCategory === category.name ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-brand-yellow'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">Nenhum produto encontrado com os filtros selecionados.</p>
        )}

        {/* 2. NOVA SEÇÃO ADICIONADA AQUI */}
        <section className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Não encontrou o que procurava?
            </h2>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco e solicite um orçamento personalizado
            </p>
            <Link href="/contato" className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-brand-red-dark transition-colors">
              Solicitar Orçamento Personalizado
            </Link>
        </section>

      </div>
    </main>
  );
};

export default ProdutosPage;