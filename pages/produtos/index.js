// pages/produtos/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import Head from 'next/head';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  let allActiveProducts = [];
  try {
    const productsSheetName = 'Produtos';
    const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
    const res = await fetch(productsUrl);
    const data = await res.json();
    if (data.values) {
        const allProducts = data.values.slice(1).map(row => ({
          id: row[0] || null, name: row[1] || '', description: row[2] || '',
          volume: row[3] || '', brand: row[4] || null, 
          categories: row[5] ? row[5].split(',').map(cat => cat.trim()) : [],
          imageUrl: row[6] || '', isFeatured: row[7] || 'NÃO', isActive: row[8] || 'NÃO',
          slug: row[9] || null
        }));
        allActiveProducts = allProducts.filter(product => product.isActive === 'SIM');
    }
  } catch (error) { 
    console.error("Falha ao buscar Produtos:", error.message); 
  }
  
  const allCategories = allActiveProducts.flatMap(p => p.categories);
  const uniqueCategories = [...new Set(allCategories)];

  return { 
    props: { 
      products: allActiveProducts, 
      categories: uniqueCategories.sort(),
    }, 
    revalidate: 60 
  };
}

const ProdutosPage = ({ products, categories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.busca || '');
  const [selectedCategory, setSelectedCategory] = useState(router.query.categoria || 'Todos');

  useEffect(() => {
    if (router.isReady) {
      setSearchTerm(router.query.busca || '');
      setSelectedCategory(router.query.categoria || 'Todos');
    }
  }, [router.isReady, router.query]);

  const updateUrl = (newCategory, newSearchTerm) => {
    const query = {};
    if (newCategory !== 'Todos') query.categoria = newCategory;
    if (newSearchTerm) query.busca = newSearchTerm;
    
    router.push({
      pathname: '/produtos',
      query: query,
    }, undefined, { shallow: true, scroll: false });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateUrl(category, searchTerm);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const handler = setTimeout(() => {
      updateUrl(selectedCategory, e.target.value);
    }, 500);
    return () => clearTimeout(handler);
  };

  const filteredProducts = products
    .filter(product => selectedCategory === 'Todos' || product.categories.includes(selectedCategory))
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <>
      <Head>
          <title>Nossos Produtos | WF Embalagens</title>
          <meta name="description" content="Explore nosso catálogo completo de embalagens, incluindo bandejas de isopor, sacolas, potes, embalagens a vácuo e muito mais." />
      </Head>
      <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Nossos Produtos</h1>
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
            <input 
              type="text"
              placeholder="Buscar pelo nome do produto..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="flex flex-wrap items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" /></svg>
              <button onClick={() => handleCategoryChange('Todos')} className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedCategory === 'Todos' ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-brand-yellow'}`}>Todos</button>
              {categories.map(category => (
                <button key={category} onClick={() => handleCategoryChange(category)} className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedCategory === category ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-brand-yellow'}`}>{category}</button>
              ))}
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">Nenhum produto encontrado com os filtros selecionados.</p>
          )}
          <section className="mt-12 text-center bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Não encontrou o que procurava?</h2>
              <p className="text-gray-600 mb-6">Entre em contato conosco e solicite um orçamento personalizado</p>
              <Link href="/contato" className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-brand-red-dark transition-colors">Solicitar Orçamento Personalizado</Link>
          </section>
        </div>
      </main>
    </>
  );
};
export default ProdutosPage;