// pages/orcamento.js
import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import Image from 'next/image';

const OrcamentoPage = () => {
  const { items, removeFromBudget, updateItemQuantity } = useBudget();

  // --- 1. ESTADOS PARA O FORMULÁRIO ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [observations, setObservations] = useState('');

  // --- 2. FUNÇÃO PARA MONTAR E ENVIAR A MENSAGEM ---
  const handleSendWhatsApp = () => {
    const phoneNumber = '5547992886358'; // <-- COLOQUE O NÚMERO DA WF EMBALAGENS AQUI (com código do país e DDD)

    let message = `*Olá, gostaria de solicitar um orçamento!*\n\n`;
    message += `*Meus Dados:*\n`;
    message += `Nome: ${name}\n`;
    message += `E-mail: ${email}\n`;
    message += `Telefone: ${phone}\n`;
    message += `Empresa: ${company}\n\n`;
    
    message += `*Itens do Orçamento:*\n`;
    items.forEach(item => {
      message += `--------------------------\n`;
      message += `*Produto:* ${item.name}\n`;
      message += `*Quantidade:* ${item.quantity}\n`;
      message += `*Código:* ${item.id}\n`;
    });
    
    if (observations) {
      message += `\n*Observações:*\n${observations}`;
    }

    // Codifica a mensagem para ser usada em uma URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre o link do WhatsApp
    window.open(`https://wa.me/${5547992886358}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Minha Lista de Orçamento</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Sua lista de orçamento está vazia.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <Image src={item.imageUrl || '/images/placeholder.png'} alt={item.name} width={80} height={80} className="object-contain" />
                  <div className="flex-grow">
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.volume}</p>
                  </div>
                  <div>
                    <label className="text-sm">Qtd:</label>
                    <input type="number" value={item.quantity} min="1" className="w-16 p-1 border rounded-md text-center" onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))} />
                  </div>
                  <button onClick={() => removeFromBudget(item.id)} className="text-red-500 hover:text-red-700 font-semibold">Remover</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- 3. FORMULÁRIO AGORA É FUNCIONAL --- */}
        {items.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Seus Dados para Contato</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Seu nome completo *" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded-md w-full" />
              <input type="email" placeholder="Seu e-mail *" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded-md w-full" />
              <input type="tel" placeholder="Seu telefone *" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border rounded-md w-full" />
              <input type="text" placeholder="Nome da sua empresa" value={company} onChange={(e) => setCompany(e.target.value)} className="p-2 border rounded-md w-full" />
              <textarea placeholder="Observações..." value={observations} onChange={(e) => setObservations(e.target.value)} className="p-2 border rounded-md w-full md:col-span-2" rows="3"></textarea>
            </div>
            <button 
              onClick={handleSendWhatsApp}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors font-bold text-lg"
            >
              Enviar Solicitação via WhatsApp
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrcamentoPage;