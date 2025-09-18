// pages/blog/index.js
import { useState } from 'react';
import BlogPostCard from '../../components/BlogPostCard';
import Link from 'next/link';

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
        tag: row[6] || null, // Corrigido
        content: row[7] || '', // Corrigido
      }));
    }
  } catch (error) {
    console.error("Falha ao buscar posts do Blog:", error.message);
  }
  
  const tags = [...new Set(allPosts.map(post => post.tag).filter(Boolean))];

  return {
    props: {
      posts: allPosts,
      tags: tags,
    },
    revalidate: 60,
  };
}


const BlogPage = ({ posts, tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Todos');

  const filteredPosts = posts
    .filter(post => {
      if (selectedTag === 'Todos') return true;
      return post.tag === selectedTag;
    })
    .filter(post => {
      return post.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <main className="flex min-h-screen flex-col items-center py-16 bg-white">
      <div className="w-full container mx-auto max-w-4xl px-4">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">Blog WF Embalagens</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dicas, tendências e informações sobre embalagens para ajudar seu negócio a crescer.
          </p>
        </section>

        <div className="mb-8 p-4 flex flex-col gap-4">
          <div className="flex items-center border rounded-md bg-white">
            <input 
              type="text"
              placeholder="Pesquisar artigos..."
              className="w-full p-3 border-none rounded-md focus:ring-0"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
             <button className="px-4 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setSelectedTag('Todos')}
              className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedTag === 'Todos' ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Todos
            </button>
            {tags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-md font-bold transition-colors ${selectedTag === tag ? 'bg-brand-red text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">Nenhum artigo encontrado com os filtros selecionados.</p>
          )}
        </div>

        <section className="mt-16 bg-brand-red-dark text-white rounded-lg shadow-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Tem alguma dúvida sobre embalagens?</h2>
            <p className="text-lg mb-8">Nossa equipe está pronta para ajudá-lo a escolher a melhor solução para seu negócio.</p>
            <Link href="/contato" className="bg-white text-brand-red-dark font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors">Entre em Contato</Link>
        </section>
      </div>
    </main>
  );
};

export default BlogPage;