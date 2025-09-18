// pages/blog/[slug].js
import Image from 'next/image';

export async function getStaticPaths() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const blogSheetName = 'Blog';
  const blogUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${blogSheetName}?key=${apiKey}`;
  let paths = [];
  try {
    const res = await fetch(blogUrl);
    const data = await res.json();
    if (data.values) {
      paths = data.values.slice(1).map(row => ({ params: { slug: row[0] || '' } }));
    }
  } catch (error) { console.error("Falha ao buscar slugs para getStaticPaths:", error.message); }
  return { paths: paths, fallback: 'blocking' }; // Mudei para 'blocking' para mais flexibilidade
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const blogSheetName = 'Blog';
  const blogUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${blogSheetName}?key=${apiKey}`;
  let post = null;
  try {
    const res = await fetch(blogUrl);
    const data = await res.json();
    if (data.values) {
      const allPosts = data.values.slice(1).map(row => ({
        slug: row[0] || '', title: row[1] || '', summary: row[2] || '',
        imageUrl: row[3] || '', date: row[4] || '', author: row[5] || '',
        content: row[7] || '', // Corrigido para coluna H
        tag: row[6] || null,   // Corrigido para coluna G
      }));
      post = allPosts.find(p => p.slug === slug);
    }
  } catch (error) { console.error(`Falha ao buscar o post ${slug}:`, error.message); }
  
  if (!post) {
    return { notFound: true }; // Se não encontrar o post, retorna 404
  }

  return { props: { post: post }, revalidate: 60 };
}

const PostPage = ({ post }) => {
  // A verificação de !post não é mais necessária aqui por causa do notFound: true acima
  return (
    <main className="flex min-h-screen flex-col items-center py-16 bg-white">
      <article className="w-full container mx-auto max-w-3xl px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-lg text-gray-500">{post.date} • {post.author}</p>
        </header>
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={post.imageUrl || '/images/placeholder.png'} alt={post.title} fill className="object-cover" />
        </div>
        {/* Usando a classe 'prose' do Tailwind para uma formatação de texto bonita */}
        <div 
          className="prose lg:prose-xl max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
        />
      </article>
    </main>
  );
};
export default PostPage;