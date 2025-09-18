// components/BlogPostCard.js
import Link from 'next/link';
import Image from 'next/image';

const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Imagem */}
      <div className="relative w-full md:w-1/3 h-48 rounded-md overflow-hidden">
        <Image
          src={post.imageUrl || '/images/placeholder.png'}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="w-full md:w-2/3">
        {/* TAG ADICIONADA AQUI */}
        {post.tag && (
            <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                {post.tag}
            </span>
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-500 mb-3">{post.date} • {post.author}</p>
        <p className="text-gray-600 mb-4">
          {post.summary}
        </p>
        <Link href={`/blog/${post.slug}`} className="font-bold text-brand-red hover:text-brand-red-dark transition-colors">
          Ler mais →
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;