// pages/contato.js
import React from 'react';

const ContatoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 bg-gray-50">
      <div className="w-full max-w-6xl px-4">
        
        {/* Cabeçalho da Página */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender você. Entre em contato conosco para solicitar orçamentos ou dúvidas.
          </p>
        </section>

        {/* Conteúdo Principal (2 Colunas) */}
        <section className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Coluna 1: Formulário (Ainda não funcional, apenas visual) */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Nome *</label>
                    <input type="text" placeholder="Seu nome completo" className="w-full p-3 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">E-mail *</label>
                    <input type="email" placeholder="seu@email.com" className="w-full p-3 border rounded-md" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Telefone</label>
                    <input type="tel" placeholder="(47) 99999-9999" className="w-full p-3 border rounded-md" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Empresa</label>
                    <input type="text" placeholder="Nome da sua empresa" className="w-full p-3 border rounded-md" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assunto</label>
                  <input type="text" placeholder="Resposta da sua mensagem" className="w-full p-3 border rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Mensagem *</label>
                  <textarea placeholder="Digite sua mensagem aqui..." className="w-full p-3 border rounded-md" rows="5"></textarea>
                </div>
                <div>
                  <button type="button" className="w-full bg-brand-red text-white py-3 rounded-md hover:bg-brand-red-dark transition-colors font-bold text-lg">
                    Enviar mensagem via WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 mt-2">* Campos obrigatórios</p>
                </div>
              </form>
            </div>
            
            {/* Coluna 2: Informações de Contato */}
            <div className="space-y-8">
              {/* Informações de Contato */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Informações de Contato</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-brand-red text-2xl">📞</span>
                    <div>
                      <span className="font-semibold">Telefone</span><br/>
                      <a href="tel:47992886358" className="hover:text-brand-red">(47) 99288-6358</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-brand-red text-2xl">✉️</span>
                    <div>
                      <span className="font-semibold">E-mail</span><br/>
                      <a href="mailto:wfembalagens@yahoo.com" className="hover:text-brand-red">wfembalagens@yahoo.com</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-brand-red text-2xl">📱</span>
                    <div>
                      <span className="font-semibold">WhatsApp</span><br/>
                      <a href="https://wa.me/5547992886358" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">Conversar no WhatsApp</a>
                    </div>
                  </li>
                   <li className="flex items-center gap-3">
                    <span className="text-brand-red text-2xl">📍</span>
                    <div>
                      <span className="font-semibold">Endereço</span><br/>
                      R. Tijuco Preto, 570, Bairro Bom Jesus<br/>Rio Negro - 83883254
                    </div>
                  </li>
                </ul>
              </div>

              {/* Horário de Funcionamento */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Horário de Funcionamento</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Segunda-feira:</strong> 08:00 - 12:00 | 13:30 - 18:00</li>
                  <li><strong>Terça-feira:</strong> 08:00 - 12:00 | 13:30 - 18:00</li>
                  <li><strong>Quarta-feira:</strong> 08:00 - 12:00 | 13:30 - 18:00</li>
                  <li><strong>Quinta-feira:</strong> 08:00 - 12:00 | 13:30 - 18:00</li>
                  <li><strong>Sexta-feira:</strong> 08:00 - 12:00 | 13:30 - 18:00</li>
                  <li><strong>Sábado:</strong> 08:00 - 12:00</li>
                  <li><strong>Domingo:</strong> <span className="font-bold text-red-600">Fechado</span></li>
                </ul>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ContatoPage;