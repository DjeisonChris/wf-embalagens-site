// pages/index.js (COMPLETO E ATUALIZADO)
import { EmblaCarousel } from '../components/Carousel';
import { HeroCarousel } from '../components/HeroCarousel';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { FaDollarSign, FaShippingFast, FaStar, FaHeadset } from 'react-icons/fa';
import Head from 'next/head';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  let banners = [];
  let featuredProducts = [];
  let featuredCategoriesWithProducts = [];

  try {
    const bannersSheetName = 'Banners_Home';
    const bannersUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${bannersSheetName}?key=${apiKey}`;
    const bannersRes = await fetch(bannersUrl);
    const bannersData = await bannersRes.json();
    if (bannersData.values) {
      banners = bannersData.values.slice(1).map(row => ({
        isActive: row[0] === 'SIM', title: row[1] || '', subtitle: row[2] || '',
        paragraph: row[3] || '', backgroundUrl: row[4] || null, button1Text: row[5] || null,
        button1Link: row[6] || null, button2Text: row[7] || null, button2Link: row[8] || null,
        bannerLinkUrl: row[9] || null, backgroundUrlMobile: row[10] || null,
      })).filter(b => b.isActive);
    }

    const productsSheetName = 'Produtos';
    const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${productsSheetName}?key=${apiKey}`;
    const productsRes = await fetch(productsUrl);
    const productsData = await productsRes.json();
    
    if (productsData.values) {
      const allProducts = productsData.values.slice(1).map(row => ({
        id: row[0] || null, name: row[1] || '', description: row[2] || '',
        volume: row[3] || '', brand: row[4] || null, // <-- MARCA ADICIONADA (ÍNDICE 4)
        category: row[5] || '', imageUrl: row[6] || '',
        isFeatured: row[7] || 'NÃO', isActive: row[8] || 'NÃO',
        slug: row[9] || null
      })).filter(p => p.isActive === 'SIM');

      featuredProducts = allProducts.filter(p => p.isFeatured === 'SIM');
      
      const categoriesSheetName = 'Categorias';
      const categoriesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${categoriesSheetName}?key=${apiKey}`;
      const categoriesRes = await fetch(categoriesUrl);
      const categoriesData = await categoriesRes.json();
      
      if (categoriesData.values) {
        const featuredCategoryNames = categoriesData.values.slice(1).filter(row => row[2] === 'SIM').map(row => row[0]);
        if (featuredCategoryNames.length > 0) {
          featuredCategoriesWithProducts = featuredCategoryNames.map(categoryName => ({
            category: categoryName,
            products: allProducts.filter(p => p.category === categoryName)
          }));
        }
      }
    }
  } catch (error) { console.error("Falha ao buscar dados para a Home:", error.message); }
  
  return {
    props: { banners, featuredProducts, featuredCategoriesWithProducts, },
    revalidate: 60,
  };
}

const FeatureCard = ({ icon, title, text }) => (
    <div className="bg-white p-1 rounded-lg shadow-md border border-gray-200 text-center h-full">
      <div className="text-brand-red text-4xl mb-2 inline-block">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );

export default function Home({ banners, featuredProducts, featuredCategoriesWithProducts }) {
  const features = [
      { icon: <FaDollarSign />, title: "Preços Competitivos", text: "Oferecemos os melhores preços do mercado para microempresas" },
      { icon: <FaShippingFast />, title: "Entrega Rápida", text: "Agilidade na entrega para atender suas necessidades" },
      { icon: <FaStar />, title: "Qualidade Garantida", text: "Produtos selecionados com qualidade comprovada" },
      { icon: <FaHeadset />, title: "Atendimento Ágil", text: "Suporte rápido e eficiente para seus pedidos" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100">
      
      <section className="w-full bg-brand-red-dark">
        <div className="container mx-auto">
            <HeroCarousel slides={banners} />
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="hidden md:block container mx-auto max-w-6xl py-10 px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Por que escolher a WF Embalagens?</h2>
            <p className="text-lg text-gray-600 mt-2">Nosso foco é atender microempresas com excelência e dedicação</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
        
        <div className="md:hidden container mx-auto py-5 px-4">
           <div className="text-center mb-1">
            <h2 className="text-3xl font-bold text-gray-800">Por que escolher a WF Embalagens?</h2>
          </div>
          <EmblaCarousel autoplay={true}>
            {features.map(feature => (
              <div className="embla__slide" key={feature.title}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </EmblaCarousel>
        </div>
      </section>

      <section className="w-full bg-gray-100">
        <div className="container mx-auto max-w-6xl py-5 px-4">
          <h2 className="text-4xl font-bold mb-5 text-center text-gray-800">Produtos em Destaque</h2>
          {featuredProducts.length > 0 ? (
            <EmblaCarousel autoplay={true}>
                {featuredProducts.map(product => (
                    <div className="embla__slide" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </EmblaCarousel>
          ) : (
            <p className="text-center text-gray-500">Nenhum produto em destaque no momento.</p>
          )}
        </div>
      </section>

      {featuredCategoriesWithProducts.map(({ category, products }) => (
        <section key={category} className="w-full bg-white">
          <div className="container mx-auto max-w-6xl py-10 px-1">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{category}</h2>
            {products.length > 0 ? (
              <EmblaCarousel autoplay={false}>
                {products.map(product => (
                    <div className="embla__slide" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
              </EmblaCarousel>
            ) : (
              <p className="text-center text-gray-500">Nenhum produto encontrado para esta categoria.</p>
            )}
             <div className="text-center mt-10">
                  <Link href="/produtos" className="bg-brand-red text-white font-bold py-3 px-10 rounded-md hover:bg-brand-red-dark transition-colors">
                      Ver todos os produtos
                  </Link>
             </div>
          </div>
        </section>
      ))}

      <section className="w-full bg-brand-red-dark text-white text-center py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Pronto para fazer seu pedido?</h2>
            <p className="text-lg mb-8">Entre em contato conosco e solicite seu orçamento personalizado</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contato" className="border-2 border-white text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-white hover:text-brand-red-dark transition-colors w-full sm:w-auto">
                    Falar Conosco
                </Link>
                <a href="tel:47992886358" className="bg-white text-brand-red-dark font-bold py-2 px-6 md:py-3 md:px-8 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto">
                    Ligar Agora
                </a>
            </div>
        </div>
      </section>
    </main>
  );
}