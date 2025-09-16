// pages/produtos.js
import { useState } from 'react'; // Importamos o useState do React
import ProductCard from '../components/ProductCard';

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
  // 3. CRIAMOS OS ESTADOS (as "memórias" do componente)
  const [searchTerm, setSearchTerm] = useState(''); // Para guardar o texto da busca
  const [selectedCategory, setSelectedCategory] = useState('Todos'); // Para guardar a categoria selecionada

  // 4. LÓGICA DE FILTRO
  const filteredProducts = products
    .filter(product => {
      // Filtro de categoria
      if (selectedCategory === 'Todos') {
        return true; // Se 'Todos' está selecionado, mostra todos os produtos
      }
      return product.category === selectedCategory; // Senão, mostra apenas os da categoria selecionada
    })
    .filter(product => {
      // Filtro de busca (procura no nome do produto, ignorando maiúsculas/minúsculas)
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Nossos Produtos</h1>
        
        {/* 5. ÁREA DE BUSCA E FILTROS (agora funcional) */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
          <input 
            type="text"
            placeholder="Buscar pelo nome do produto..."
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado da busca a cada letra digitada
          />
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-md transition-colors ${selectedCategory === 'Todos' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button 
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-md transition-colors ${selectedCategory === category.name ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 6. GRID DE PRODUTOS (agora exibe a lista filtrada) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">Nenhum produto encontrado com os filtros selecionados.</p>
        )}
      </div>
    </main>
  );
};

export default ProdutosPage;