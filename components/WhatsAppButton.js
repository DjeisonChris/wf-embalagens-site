// components/WhatsAppButton.js
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '5547992886358'; // Seu número de WhatsApp
  const message = 'Olá! Gostaria de mais informações sobre os produtos.'; // Mensagem padrão
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-whatsapp text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
      aria-label="Fale Conosco pelo WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;