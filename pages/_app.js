// pages/_app.js
import { BudgetProvider } from '../context/BudgetContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton'; // 1. Importar o botão
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <BudgetProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <WhatsAppButton /> {/* 2. Adicionar o botão aqui */}
    </BudgetProvider>
  );
}

export default MyApp;