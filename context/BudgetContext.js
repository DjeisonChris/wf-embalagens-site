// context/BudgetContext.js
import { createContext, useContext, useState } from 'react';

// 1. Criamos o Contexto (a definição da nossa mochila)
const BudgetContext = createContext();

// 2. Criamos o "Provedor" do Contexto (o componente que é a mochila em si)
export const BudgetProvider = ({ children }) => {
  const [items, setItems] = useState([]); // A lista de produtos no orçamento

  const addToBudget = (productToAdd) => {
    // Verifica se o produto já está na lista
    const existingItem = items.find(item => item.id === productToAdd.id);

    if (existingItem) {
      // Se já existe, apenas aumenta a quantidade
      setItems(items.map(item =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Se não existe, adiciona com quantidade 1
      setItems([...items, { ...productToAdd, quantity: 1 }]);
    }
    console.log(`${productToAdd.name} adicionado ao orçamento!`);
  };
  const removeFromBudget = (productId) => {
    setItems(items.filter(item => item.id !== productId));
    console.log(`Produto ${productId} removido do orçamento!`);
  };

  const updateItemQuantity = (productId, newQuantity) => {
    const quantity = Math.max(1, newQuantity); // Garante que a quantidade seja pelo menos 1
    setItems(items.map(item =>
      item.id === productId
        ? { ...item, quantity: quantity }
        : item
    ));
  };
  // Futuramente, adicionaremos mais funções aqui (remover, atualizar quantidade, etc.)

    return (
        <BudgetContext.Provider value={{ items, addToBudget, removeFromBudget, updateItemQuantity }}>
         {children}
        </BudgetContext.Provider>
    );
};

// 3. Criamos um "Hook" customizado para facilitar o uso da mochila em outros componentes
export const useBudget = () => {
  return useContext(BudgetContext);
};