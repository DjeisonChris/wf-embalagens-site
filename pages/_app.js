// pages/_app.js

import { BudgetProvider } from '../context/BudgetContext';
import Header from '../components/Header';
import '../styles/globals.css'; // A LINHA MAIS IMPORTANTE!

function MyApp({ Component, pageProps }) {
  return (
    <BudgetProvider>
      <Header />
      <Component {...pageProps} />
    </BudgetProvider>
  );
}

export default MyApp;