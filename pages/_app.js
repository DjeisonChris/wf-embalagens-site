// pages/_app.js
import { BudgetProvider } from '../context/BudgetContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Head from 'next/head';
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <BudgetProvider>
      <Head>
        <title>WF Embalagens - Qualidade e Agilidade</title>
        <meta name="description" content="Distribuidora especializada em embalagens para microempresas, oferecendo qualidade, preço baixo e agilidade na entrega." />
      </Head>
      
      <Header />
      <Component {...pageProps} />
      <Footer />
      <WhatsAppButton />

      <CookieConsent
        location="bottom"
        buttonText="Aceitar tudo"
        declineButtonText="Rejeitar"
        enableDeclineButton
        cookieName="wf-embalagens-cookie-consent"
        style={{ background: "#1A1A1A", fontSize: "14px", zIndex: 100 }}
        buttonStyle={{ backgroundColor: "#C81B1B", color: "white", fontSize: "14px", borderRadius: '5px' }}
        declineButtonStyle={{ backgroundColor: "#4A4A4A", fontSize: "14px", borderRadius: '5px' }}
        expires={150}
      >
        Este site usa cookies para melhorar a experiência do usuário. Ao clicar em "Aceitar tudo", você concorda com o armazenamento de cookies no seu dispositivo. Saiba mais em nossa{" "}
        <Link href="/politica-de-privacidade" className="text-brand-yellow underline hover:text-white">
          Política de Privacidade
        </Link>
        .
      </CookieConsent>
    </BudgetProvider>
  );
}

export default MyApp;