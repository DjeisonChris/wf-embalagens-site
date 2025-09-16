// pages/index.js
import { EmblaCarousel } from '../components/Carousel';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  // --- BUSCAR CATEGORIAS ---
  const categoriesSheetName = 'Categorias';
  const categoriesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${categoriesSheetName}?key=${apiKey}`;
  let categories = [];
  try {
    const res = await fetch(categoriesUrl);
    const data = await res.json();
    if (data.values) {
      categories = data.values.slice(1).map(row => ({
        name: row[0] || '',
        imageUrl: row[1] || ''
      }));
    }
  } catch (error) {
    console.error("Falha ao buscar Categorias:", error.message);
  }

  // --- BUSCAR E FILTRAR PRODUTOS ---
  const productsSheetName = 'Produtos';
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
  let featuredProducts = [];
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    if (data.values) {
      const allProducts = data.values.slice(1).map(row => ({
        id: row[0] || null, name: row[1] || '', description: row[2] || '',
        volume: row[3] || '', category: row[4] || '', imageUrl: row[5] || '',
        isFeatured: row[6] || 'NÃO', isActive: row[7] || 'NÃO'
      }));
      featuredProducts = allProducts.filter(product =>
        product.isActive === 'SIM' && product.isFeatured === 'SIM'
      );
    }
  } catch (error) {
    console.error("Falha ao buscar Produtos:", error.message);
  }

  return {
    props: {
      categories: categories,
      featuredProducts: featuredProducts,
    },
    revalidate: 60,
  };
}


export default function Home({ categories, featuredProducts }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <section className="w-full max-w-6xl py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Nossas Categorias</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col items-center justify-center p-4 rounded-lg text-center bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="h-24 w-24 mb-2 flex items-center justify-center">
                   <img 
                    src={category.imageUrl || '/images/placeholder.png'}
                    alt={category.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-md font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhuma categoria encontrada.</p>
        )}
      </section>

      <section className="w-full max-w-6xl py-12 px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Produtos em Destaque</h2>
        {featuredProducts.length > 0 ? (
          <EmblaCarousel products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-500">Nenhum produto em destaque no momento.</p>
        )}
      </section>
    </main>
  );
}