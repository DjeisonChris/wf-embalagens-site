// pages/produto/[category]/[slug].js
import { useBudget } from '@/context/BudgetContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import Head from 'next/head';

const slugify = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

export async function getStaticPaths() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const productsSheetName = 'Produtos';
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
  let paths = [];
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    if (data.values) {
      paths = data.values.slice(1).filter(row => row[5] && row[9]).map(row => ({
        params: { 
          category: slugify(row[5]),
          slug: row[9]
        },
      }));
    }
  } catch (error) { console.error("Falha ao buscar paths:", error.message); }
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const productsSheetName = 'Produtos';
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
  let product = null;
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    if (data.values) {
      const allProducts = data.values.slice(1).filter(row => row[9]).map(row => ({
          id: row[0] || null, name: row[1] || '', description: row[2] || '',
          volume: row[3] || '', brand: row[4] || null, category: row[5] || '', 
          imageUrl: row[6] || '', slug: row[9] || null,
        }));
      product = allProducts.find(p => p.slug === slug);
    }
  } catch (error) { console.error(`Falha ao buscar o produto ${slug}:`, error.message); }
  if (!product) { return { notFound: true }; }
  return { props: { product }, revalidate: 60 };
}

const ProdutoDetalhePage = ({ product }) => {
  const { addToBudget } = useBudget();
  const router = useRouter();
  return (
    <>
      <Head>
          <title>{`${product.name} | WF Embalagens`}</title>
          <meta name="description" content={product.description} />
      </Head>
      <main className="flex min-h-screen flex-col items-center py-16 bg-white">
        <div className="w-full container mx-auto max-w-5xl px-4">
          <div className="mb-8">
              <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 text-gray-600 hover:text-brand-red font-semibold transition-colors"
              >
                  <FaArrowLeft />
                  Voltar para a lista
              </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-lg border shadow-md p-4 flex items-center justify-center">
              <div className="relative w-full h-96">
                  <Image src={product.imageUrl || '/images/placeholder.png'} alt={product.name} fill className="object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              {product.brand && (
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand}</p>
              )}
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
              <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full mb-3 self-start">
                {product.category}
              </span>
              <p className="text-lg text-gray-500 mb-4">{product.volume}</p>
              <div className="prose">
                <p>{product.description}</p>
              </div>
              <div className="mt-6">
                <button 
                  onClick={() => addToBudget(product)}
                  className="w-full bg-brand-red text-white py-3 rounded-md hover:bg-brand-red-dark transition-colors font-bold text-lg"
                >
                  Adicionar ao Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default ProdutoDetalhePage;