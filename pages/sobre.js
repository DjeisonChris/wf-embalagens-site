// pages/sobre.js
import React from 'react';

// Criei este pequeno componente interno só para repetir as 4 caixas de valores
const ValueCard = ({ icon, title, text }) => (
  <div className="border rounded-lg p-6 text-center shadow-md bg-white h-full">
    <div className="text-5xl text-red-600 mb-4 inline-block">{icon}</div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

// Componente principal da Página Sobre
const SobrePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-gray-50">
      <div className="w-full max-w-6xl px-4 space-y-12">
        
        {/* Seção do Cabeçalho */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Sobre a WF Embalagens</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Distribuidora especializada em embalagens para microempresas, oferecendo qualidade, preço baixo e agilidade na entrega.
          </p>
        </section>

        {/* Seção de Informações (2 Colunas) */}
        <section className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Coluna 1: Nossa História */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2 border-red-200">Nossa História</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A WF Distribuidora de Embalagens LTDA nasceu com o propósito de atender as necessidades específicas das microempresas locais, oferecendo soluções em embalagens com qualidade e preço justo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Localizada em Rio Negro, nossa empresa se dedica a fornecer produtos selecionados que atendem desde padarias e mercados até restaurantes e frigoríficos, sempre com um atendimento personalizado. Nosso compromisso é ser o parceiro ideal para o crescimento do seu negócio.
              </p>
            </div>
            
            {/* Coluna 2: Informações da Empresa */}
            <div className="bg-gray-50 rounded-lg p-6 border">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Informações da Empresa</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Razão Social:</strong> WF Distribuidora de Embalagens LTDA</li>
                <li><strong>CNPJ:</strong> 40.988.060/0001-89</li>
                <li><strong>Endereço:</strong> R. Tijuco Preto, 570, Bairro Bom Jesus, Rio Negro - 83883254</li>
                <li><strong>Contato (WhatsApp):</strong> (47) 99288-6358</li>
                <li><strong>E-mail:</strong> wfembalagens@yahoo.com</li>
                <li className="pt-3 border-t mt-3"><strong>Segunda - Sexta:</strong> 08:00-12:00 | 13:30-18:00</li>
                <li><strong>Sábado:</strong> 08:00-12:00</li>
                <li><strong>Domingo:</strong> Fechado</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seção Nossos Valores */}
        <section>
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Nossos Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ValueCard icon="🎯" title="Foco no Cliente" text="Entendemos as necessidades das microempresas com dedicação." />
            <ValueCard icon="✅" title="Qualidade Garantida" text="Produtos selecionados e com procedência comprovada." />
            <ValueCard icon="🚚" title="Agilidade na Entrega" text="Entrega rápida para não impactar suas operações." />
            <ValueCard icon="👤" title="Atendimento Personalizado" text="Suporte próximo para auxiliar nas melhores escolhas." />
          </div>
        </section>

        {/* Seção Setores Atendidos */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Setores Atendidos</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Padarias', 'Mercados', 'Restaurantes', 'Açougues', 'Agropecuárias', 'Frigoríficos', 'Farmácias'].map(setor => (
              <span key={setor} className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-sm cursor-default">
                {setor}
              </span>
            ))}
          </div>
        </section>

        {/* Banner Nossa Missão */}
        <section className="bg-red-700 text-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            Fornecer embalagens de qualidade com preços acessíveis e entrega ágil, contribuindo para o sucesso e crescimento das microempresas brasileiras.
          </p>
        </section>

      </div>
    </main>
  );
};

export default SobrePage;