// pages/contato.js
import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContatoPage = () => {
  // Estados para controlar os campos do formulário
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = () => {
    const phoneNumber = '5547992886358';
    let whatsappMessage = `*Contato via Site*\n\n`;
    whatsappMessage += `*Nome:* ${formData.name}\n`;
    if(formData.email) whatsappMessage += `*E-mail:* ${formData.email}\n`;
    if(formData.phone) whatsappMessage += `*Telefone:* ${formData.phone}\n`;
    if(formData.company) whatsappMessage += `*Empresa:* ${formData.company}\n`;
    whatsappMessage += `*Assunto:* ${formData.subject}\n\n`;
    whatsappMessage += `*Mensagem:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-16 bg-gray-100">
      <div className="w-full container mx-auto max-w-6xl px-4">
        
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender você. Entre em contato conosco para solicitar orçamentos ou dúvidas.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda: Formulário */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md border">
             <h2 className="text-3xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Nome *</label>
                    <input type="text" name="name" placeholder="Seu nome completo" className="w-full p-3 border rounded-md" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">E-mail</label>
                    <input type="email" name="email" placeholder="seu@email.com" className="w-full p-3 border rounded-md" value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Telefone</label>
                    <input type="tel" name="phone" placeholder="(47) 99999-9999" className="w-full p-3 border rounded-md" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Empresa</label>
                    <input type="text" name="company" placeholder="Nome da sua empresa" className="w-full p-3 border rounded-md" value={formData.company} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Assunto</label>
                  <input type="text" name="subject" placeholder="Assunto da sua mensagem" className="w-full p-3 border rounded-md" value={formData.subject} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Mensagem *</label>
                  <textarea name="message" placeholder="Digite sua mensagem aqui..." className="w-full p-3 border rounded-md" rows="5" value={formData.message} onChange={handleInputChange}></textarea>
                </div>
                <div>
                  <button type="button" onClick={handleWhatsAppSubmit} className="w-full bg-brand-red text-white py-3 rounded-md hover:bg-brand-red-dark transition-colors font-bold text-lg flex items-center justify-center gap-2">
                    <FaPaperPlane />
                    Enviar mensagem via WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 mt-2">* Campos obrigatórios</p>
                </div>
              </form>
          </div>

          {/* Coluna Direita: Informações */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Informações de Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><FaPhoneAlt className="text-brand-red mt-1" /><div><span className="font-semibold text-gray-700">Telefone</span><br/><a href="tel:47992886358" className="text-gray-600 hover:text-brand-red">Ligar agora</a></div></li>
                <li className="flex items-start gap-3"><FaEnvelope className="text-brand-red mt-1" /><div><span className="font-semibold text-gray-700">E-mail</span><br/><a href="mailto:wfembalagens@yahoo.com" className="text-gray-600 hover:text-brand-red">Enviar e-mail</a></div></li>
                <li className="flex items-start gap-3"><FaWhatsapp className="text-brand-red mt-1" /><div><span className="font-semibold text-gray-700">WhatsApp</span><br/><a href="https://wa.me/5547992886358" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-red">Conversar no WhatsApp</a></div></li>
                <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-brand-red mt-1" /><div><span className="font-semibold text-gray-700">Endereço</span><br/><span className="text-gray-600">R. Tijuco Preto, 570, Rio Negro - 83883254</span></div></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Horário de Funcionamento</h3>
              <ul className="text-gray-600 space-y-1">
                <li><strong>Segunda-feira:</strong> 08:00-12:00 | 13:30-18:00</li>
                {/* ... (outros dias) ... */}
                <li><strong>Sábado:</strong> 08:00-12:00</li>
                <li><strong>Domingo:</strong> <span className="font-bold text-red-600">Fechado</span></li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                    <a href="https://wa.me/5547992886358" target="_blank" rel="noopener noreferrer" className="bg-brand-red text-white w-full flex items-center justify-center gap-2 py-2 rounded-md hover:bg-brand-red-dark transition-colors">
                        <FaWhatsapp /> WhatsApp
                    </a>
                    <a href="tel:47992886358" className="bg-gray-200 text-gray-800 w-full flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-300 transition-colors">
                        <FaPhoneAlt /> Ligar
                    </a>
                    <a href="mailto:wfembalagens@yahoo.com" className="bg-gray-200 text-gray-800 w-full flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-300 transition-colors">
                        <FaEnvelope /> E-mail
                    </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContatoPage;