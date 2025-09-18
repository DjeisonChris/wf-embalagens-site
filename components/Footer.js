// components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/router'; // 1. Importamos o useRouter

const Footer = () => {
    const router = useRouter(); // 2. Usamos o hook
    const isActive = (pathname) => router.pathname === pathname;

    return (
        <footer className="bg-brand-footer text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna 1: Sobre a Empresa */}
          <div className="space-y-4">
            <Link href="/">
              <div className="cursor-pointer">
                {/* LOGO PADRONIZADO COM A TAG <img> */}
                <img 
                  src="/logo-wf.png" 
                  alt="WF Embalagens Logo" 
                  style={{ height: '48px' }} 
                />
              </div>
            </Link>
            <p className="text-sm">
              A WF Distribuidora de Embalagens LTDA oferece <br /> produtos de qualidade com preço baixo <br /> e agilidade na entrega.
            </p>
            <p className="text-sm">
              <strong>CNPJ:</strong> 40.988.060/0001-89
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className={isActive('/') ? 'text-white font-bold' : 'hover:text-white transition-colors'}>Início</Link></li>
                            <li><Link href="/produtos" className={isActive('/produtos') ? 'text-white font-bold' : 'hover:text-white transition-colors'}>Produtos</Link></li>
                            <li><Link href="/sobre" className={isActive('/sobre') ? 'text-white font-bold' : 'hover:text-white transition-colors'}>Sobre</Link></li>
                            <li><Link href="/blog" className={isActive('/blog') ? 'text-white font-bold' : 'hover:text-white transition-colors'}>Blog</Link></li>
                            <li><Link href="/contato" className={isActive('/contato') ? 'text-white font-bold' : 'hover:text-white transition-colors'}>Contato</Link></li>
                        </ul>
                    </div>

          {/* Coluna 3: Contato */}
          <div>
            {/* ...código da coluna de contato continua o mesmo... */}
            <h3 className="font-bold text-lg mb-4 text-white">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-red mt-1 flex-shrink-0" />
                <span>R. Tijuco Preto, 570, Bairro Bom Jesus, Rio Negro - 83883254</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-brand-red" />
                <a href="https://wa.me/5547992886358" target="_blank" rel="noopener noreferrer" className="hover:text-white">(47) 99288-6358</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-brand-red" />
                <a href="mailto:wfembalagens@yahoo.com" className="hover:text-white">wfembalagens@yahoo.com</a>
              </li>
              <li className="flex items-start gap-3 pt-3 mt-3 border-t border-gray-700">
                <FaClock className="text-brand-red mt-1 flex-shrink-0" />
                <div>
                  <p>Seg - Sex: 08:00-12:00 | 13h30-18:00</p>
                  <p>Sáb: 08:00-12:00</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Barra de Copyright */}
      <div className="bg-black py-4">
  <div className="container mx-auto px-6 text-sm text-gray-400 flex justify-between items-center">
    <span>© {new Date().getFullYear()} WF Embalagens. Todos os direitos reservados.</span>
    <a 
      href="https://wa.me/5547984876962" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="hover:text-white transition-colors"
    >
      Desenvolvido por Agência Folha
    </a>
  </div>
</div>
    </footer>
  );
};

export default Footer;