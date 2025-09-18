// pages/produtos/[id].js
import { useBudget } from '@/context/BudgetContext';
import Image from 'next/image';

// Esta função busca todos os IDs e diz ao Next.js quais páginas precisam ser geradas.
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
      paths = data.values.slice(1).map(row => ({
        params: { id: row[0] || '' }, // O ID está na primeira coluna (índice 0)
      }));
    }
  } catch (error) {
    console.error("Falha ao buscar IDs para getStaticPaths:", error.message);
  }

  return {
    paths: paths.filter(p => p.params.id), // Filtra para garantir que não há IDs vazios
    fallback: 'blocking',
  };
}

// Esta função busca os dados de um produto específico, baseado no ID da URL.
export async function getStaticProps({ params }) {
  const { id } = params;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const productsSheetName = 'Produtos';
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
  
  let product = null;
  try {
    const res = await fetch(productsUrl);
    const data = await res.json();
    if (data.values) {
      const allProducts = data.values.slice(1).map(row => ({
        id: row[0] || null, name: row[1] || '', description: row[2] || '',
        volume: row[3] || '', category: row[4] || '', imageUrl: row[5] || '',
      }));
      product = allProducts.find(p => p.id === id);
    }
  } catch (error) {
    console.error(`Falha ao buscar o produto ${id}:`, error.message);
  }

  if (!product) {
    return { notFound: true }; // Se não encontrar o produto, retorna 404
  }

  return { props: { product }, revalidate: 60 };
}


// Componente da Página de Detalhe do Produto
const ProdutoDetalhePage = ({ product }) => {
  const { addToBudget } = useBudget();

  return (
    <main className="flex min-h-screen flex-col items-center py-16 bg-white">
      <div className="w-full container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Coluna da Imagem */}
          <div className="bg-white rounded-lg border shadow-md p-4 flex items-center justify-center">
            <div className="relative w-full h-96">
                <Image 
                    src={product.imageUrl || '/images/placeholder.png'} 
                    alt={product.name}
                    fill
                    className="object-contain"
                />
            </div>
          </div>

          {/* Coluna de Informações */}
          <div className="flex flex-col">
            <span className="bg-brand-red text-white text-sm font-bold px-3 py-1 rounded-full mb-3 self-start">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{product.volume}</p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="mt-auto">
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
  );
};

export default ProdutoDetalhePage;