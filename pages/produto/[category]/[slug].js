// pages/produto/[category]/[slug].js
import { useBudget } from '@/context/BudgetContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import Head from 'next/head';

// Função para transformar texto em slug
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
      paths = data.values
        .slice(1)
        // ADICIONAMOS ESTE FILTRO PARA IGNORAR LINHAS INCOMPLETAS
        .filter(row => row[4] && row[8]) // Garante que a Categoria (coluna E) e o Slug (coluna I) existam
        .map(row => ({
          params: { 
            category: slugify(row[4]),
            slug: row[8]
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
          volume: row[3] || '', brand: row[4] || null, // <-- MARCA ADICIONADA (ÍNDICE 4)
          category: row[5] || '', imageUrl: row[6] || '',
          slug: row[9] || null,
        }));
      product = allProducts.find(p => p.slug === slug);
    }
  } catch (error) { console.error(`Falha ao buscar o produto ${slug}:`, error.message); }

  if (!product) { return { notFound: true }; }
  return { props: { product }, revalidate: 60 };
}

// Dentro de pages/produto/[category]/[slug].js, substitua o componente
const ProdutoDetalhePage = ({ product }) => {
  const { addToBudget } = useBudget();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{product.name} | WF Embalagens</title>
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
              {/* CAMPO DA MARCA ADICIONADO AQUI */}
              {product.brand && (
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">{product.brand}</p>
              )}
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
              {/* ... (resto do componente) ... */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProdutoDetalhePage;