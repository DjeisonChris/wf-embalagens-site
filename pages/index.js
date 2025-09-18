// pages/index.js
import { EmblaCarousel } from '../components/Carousel';
import Link from 'next/link';
import { FaDollarSign, FaShippingFast, FaStar, FaHeadset } from 'react-icons/fa';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  let featuredCategoriesWithProducts = []; // Garante que a variável sempre seja um array
  try {
    // 1. Buscar todas as categorias
    const categoriesSheetName = 'Categorias';
    const categoriesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${categoriesSheetName}?key=${apiKey}`;
    const categoriesRes = await fetch(categoriesUrl);
    const categoriesData = await categoriesRes.json();
    
    let featuredCategoryNames = [];
    if (categoriesData.values) {
      // 2. Filtrar para encontrar apenas as categorias marcadas com "SIM"
      featuredCategoryNames = categoriesData.values
        .slice(1)
        .filter(row => row[2] === 'SIM') // Coluna C (índice 2) é 'Destaque_Home'
        .map(row => row[0]); 
    }

    // 3. Buscar todos os produtos ativos
    if (featuredCategoryNames.length > 0) {
      const productsSheetName = 'Produtos';
      const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
      const productsRes = await fetch(productsUrl);
      const productsData = await productsRes.json();
      
      if (productsData.values) {
        const allProducts = productsData.values.slice(1).map(row => ({
          id: row[0] || null, name: row[1] || '', description: row[2] || '',
          volume: row[3] || '', category: row[4] || '', imageUrl: row[5] || '',
          isActive: row[7] || 'NÃO'
        })).filter(p => p.isActive === 'SIM');

        // 4. Agrupar os produtos para cada categoria em destaque
        featuredCategoriesWithProducts = featuredCategoryNames.map(categoryName => ({
          category: categoryName,
          products: allProducts.filter(p => p.category === categoryName)
        }));
      }
    }
  } catch (error) {
    console.error("Falha ao buscar dados para a Home:", error.message);
  }
  
  return {
    props: {
      featuredCategoriesWithProducts, // A variável é passada aqui
    },
    revalidate: 60,
  };
}

const FeatureCard = ({ icon, title, text }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
      <div className="text-brand-red text-4xl mb-4 inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );

// A página Home recebe a prop com o nome correto
export default function Home({ featuredCategoriesWithProducts }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      
      {/* Seção Hero */}
      <section className="w-full bg-brand-red-dark text-white text-center py-20">{/* ...código omitido... */}</section>
      
      {/* Seção "Por que escolher" */}
      <section className="w-full bg-white">{/* ...código omitido... */}</section>

      {/* NOVA SEÇÃO DE CARROSSÉIS DINÂMICOS */}
      {featuredCategoriesWithProducts && featuredCategoriesWithProducts.map(({ category, products }) => (
        <section key={category} className="w-full bg-gray-100">
          <div className="container mx-auto max-w-6xl py-16 px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{category}</h2>
            {products.length > 0 ? (
              <EmblaCarousel products={products} />
            ) : (
              <p className="text-center text-gray-500">Nenhum produto em destaque encontrado para esta categoria.</p>
            )}
             <div className="text-center mt-8">
                  <Link href="/produtos" className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-brand-red-dark transition-colors">
                      Ver todos os produtos
                  </Link>
             </div>
          </div>
        </section>
      ))}

      {/* Seção "Pronto para fazer seu pedido?" */}
      <section className="w-full bg-brand-red-dark text-white text-center py-16">{/* ...código omitido... */}</section>
    </main>
  );
}