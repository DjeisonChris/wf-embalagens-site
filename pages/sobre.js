// pages/sobre.js
import React from 'react';
// Importamos novos ícones que combinam mais com o novo design
import { FaBullseye, FaShieldAlt, FaShippingFast, FaUserCheck } from 'react-icons/fa';

// Componente para os cards de valores, agora com o novo layout
const ValueCard = ({ icon, title, text }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center gap-4 h-full">
    <div className="text-brand-red text-4xl">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-1 text-left">{title}</h3>
      <p className="text-gray-600 text-left">{text}</p>
    </div>
  </div>
);

// Componente principal da Página Sobre
const SobrePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center py-16 bg-white">
      <div className="w-full container mx-auto max-w-6xl px-4 space-y-16">
        
        {/* Seção do Cabeçalho */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">Sobre a WF Embalagens</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Distribuidora especializada em embalagens para microempresas, oferecendo qualidade, preço baixo e agilidade na entrega.
          </p>
        </section>

        {/* Seção de Informações (2 Colunas) */}
        <section className="bg-white rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Coluna 1: Nossa História */}
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa História</h2>
              <p className="text-gray-700 leading-relaxed">
                A WF Distribuidora de Embalagens LTDA nasceu com o propósito de atender as necessidades específicas das microempresas brasileiras, oferecendo soluções em embalagens com qualidade superior e um preço justo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Localizada em Rio Negro, nossa empresa se dedica a fornecer produtos selecionados que atendem diversos setores comerciais, sempre priorizando a agilidade na entrega e o atendimento personalizado.
              </p>
               <p className="text-gray-700 leading-relaxed">
                Nosso compromisso é ser o parceiro ideal para o crescimento do seu negócio, oferecendo embalagens que protegem seus produtos e valorizam sua marca.
              </p>
            </div>
            
            {/* Coluna 2: Informações da Empresa */}
            <div className="bg-gray-50 rounded-lg p-6 border">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Informações da Empresa</h3>
              <div className="space-y-4 text-gray-700">
                <div><strong className="block">Razão Social</strong><span>WF Distribuidora de Embalagens LTDA</span></div>
                <div><strong className="block">CNPJ</strong><span>40.988.060/0001-89</span></div>
                <div><strong className="block">Endereço</strong><span>R. Tijuco Preto, 570, Bairro Bom Jesus, Rio Negro - 83883254</span></div>
                <div><strong className="block">Horário de Funcionamento</strong><span>Segunda à Sexta: 08h00 - 12h00 | 13h30 - 18h00</span><br/><span>Sábado e Domingo: Fechado</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Nossos Valores */}
        <section>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Nossos Valores</h2>
            <p className="text-lg text-gray-600 mb-8">Os princípios que norteiam nosso trabalho e relacionamento com os clientes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ValueCard icon={<FaBullseye />} title="Foco no Cliente" text="Nosso objetivo é atender principalmente microempresas com dedicação e excelência." />
            <ValueCard icon={<FaShieldAlt />} title="Qualidade Garantida" text="Produtos selecionados com qualidade comprovada para diversos setores." />
            <ValueCard icon={<FaShippingFast />} title="Agilidade na Entrega" text="Entrega rápida e eficiente para atender suas necessidades comerciais." />
            <ValueCard icon={<FaUserCheck />} title="Atendimento Personalizado" text="Suporte detalhado e orçamentos personalizados para cada cliente." />
          </div>
        </section>

        {/* Seção Setores Atendidos */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Setores Atendidos</h2>
          <p className="text-lg text-gray-600 mb-8">Nossos produtos são selecionados para atender diversos setores comerciais</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Padarias', 'Mercados', 'Restaurantes', 'Açougues', 'Agropecuárias', 'Frigoríficos', 'Farmácias'].map(setor => (
              <span key={setor} className="bg-brand-brown text-white px-5 py-2 rounded-md font-semibold cursor-default">
                {setor}
              </span>
            ))}
             <span className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-semibold cursor-default">
                E muitos outros...
              </span>
          </div>
        </section>

        {/* Banner Nossa Missão */}
        <section className="bg-brand-red-dark text-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Fornecer embalagens de qualidade com preços acessíveis e entrega ágil, contribuindo para o sucesso e o crescimento das microempresas brasileiras.
          </p>
        </section>

      </div>
    </main>
  );
};

export default SobrePage;