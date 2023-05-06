import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

let transactions = JSON.parse(localStorage.getItem('transactions'));
if (!transactions) {
  transactions = [];
}

// Define initial state
const initialState = {
  transactions
};

// Define context
export const GlobalContext = createContext(initialState);

// Define provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Define actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
    // Update local storage
    const updatedTransactions = state.transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
    // Update local storage
    const updatedTransactions = [transaction, ...state.transactions];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }

  // Store state in local storage
  React.useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      dispatch({
        type: 'SET_TRANSACTIONS',
        payload: storedTransactions
      });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
