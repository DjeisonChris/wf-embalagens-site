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
          // AQUI ESTÁ A MUDANÇA: transformamos o texto em uma lista (array)
          categories: row[5] ? row[5].split(',').map(cat => cat.trim()) : [],
          imageUrl: row[6] || '', isFeatured: row[7] || 'NÃO', isActive: row[8] || 'NÃO',
          slug: row[9] || null
        }));
        allActiveProducts = allProducts.filter(product => product.isActive === 'SIM');
    }
  } catch (error) { console.error("Falha ao buscar Produtos:", error.message); }
  
  // A lista de categorias agora é criada a partir de todas as categorias de todos os produtos
  const allCategories = allActiveProducts.flatMap(p => p.categories);
  const uniqueCategories = [...new Set(allCategories)];

  return { 
    props: { 
      products: allActiveProducts, 
      categories: uniqueCategories.sort(), // Ordenamos em ordem alfabética
    }, 
    revalidate: 60 
  };
}

const ProdutosPage = ({ products, categories }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.busca || '');
  const [selectedCategory, setSelectedCategory] = useState(router.query.categoria || 'Todos');

  useEffect(() => { /* ... (código useEffect continua o mesmo) ... */ }, [searchTerm, selectedCategory, router]);

  // A LÓGICA DE FILTRO MUDOU para usar .includes()
  const filteredProducts = products
    .filter(product => selectedCategory === 'Todos' || product.categories.includes(selectedCategory))
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    // O HTML/JSX da página continua o mesmo
    <>
      <Head>
        {/* ... */}
      </Head>
      <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
        {/* ... (todo o resto do seu componente continua o mesmo, ele já vai funcionar com a nova lógica) ... */}
      </main>
    </>
  );
};
export default ProdutosPage;