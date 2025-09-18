// pages/blog.js
import BlogPostCard from '../../components/BlogPostCard';

export async function getStaticProps() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  const blogSheetName = 'Blog';
  const blogUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${blogSheetName}?key=${apiKey}`;
  
  let allPosts = [];
  try {
    const res = await fetch(blogUrl);
    const data = await res.json();
    
    if (data.values) {
      allPosts = data.values.slice(1).map(row => ({
        slug: row[0] || '',
        title: row[1] || '',
        summary: row[2] || '',
        imageUrl: row[3] || '',
        date: row[4] || '',
        author: row[5] || '',
        content: row[6] || '', // Já pegamos o conteúdo completo para a próxima etapa
      }));
    }
  } catch (error) {
    console.error("Falha ao buscar posts do Blog:", error.message);
  }
  
  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
}


const BlogPage = ({ posts }) => {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-gray-50">
      <div className="w-full max-w-4xl px-4">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Blog WF Embalagens</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dicas, tendências e informações sobre embalagens para ajudar seu negócio a crescer.
          </p>
        </section>

        {/* Futuro espaço para a busca e filtros */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <p className="text-center text-gray-500">Busca de Artigos (em breve)</p>
        </div>

        {/* Lista de Posts */}
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">Nenhum artigo publicado no momento.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;