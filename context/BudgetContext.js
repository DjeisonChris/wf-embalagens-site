// context/BudgetContext.js
import { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false); // NOVO ESTADO

  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  const addToBudget = (productToAdd) => {
    const existingItem = items.find(item => item.id === productToAdd.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setItems([...items, { ...productToAdd, quantity: 1 }]);
    }
    openMiniCart(); // Abre o mini-carrinho ao adicionar um item
  };

  const removeFromBudget = (productId) => {
    setItems(items.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    const quantity = Math.max(1, newQuantity);
    setItems(items.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ));
  };
  
  return (
    <BudgetContext.Provider value={{ items, addToBudget, removeFromBudget, updateItemQuantity, isMiniCartOpen, openMiniCart, closeMiniCart }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  return useContext(BudgetContext);
};