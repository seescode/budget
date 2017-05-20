import { Transaction } from './../models/interfaces';

export function TransactionReducer(state: Transaction[] = [], action: any) {
  switch (action.type) {
    case 'ADD_TRANSACTION_COMPLETE':
      return [...state, action.payload];
    case 'LOAD_BUDGET_DATA_COMPLETE':
      return [...state, ...action.payload.transactions];
    case 'UPDATE_TRANSACTION':
      return state.map(transaction => {
        if (action.payload.id === transaction.id) {
          return { ...transaction, ...action.payload};
        }

        return transaction;
      });

    default:
      return state;
  }
}
