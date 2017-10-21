import { toPayload } from '@ngrx/effects';
import { UPDATE_TRANSACTION, LOAD_BUDGET_DATA_COMPLETE, ADD_TRANSACTION_COMPLETE, 
  REMOVE_TRANSACTION_COMPLETE, REMOVE_BUDGET_COMPLETE } from './../actions/actions';
import { Transaction } from './../models/interfaces';

export function TransactionReducer(state: Transaction[] = [], action: any) {
  switch (action.type) {
    case ADD_TRANSACTION_COMPLETE:
      return [...state, action.payload];
    case REMOVE_TRANSACTION_COMPLETE:
      return state.filter(transaction => transaction.id !== action.payload.id);
    case LOAD_BUDGET_DATA_COMPLETE:
      return [...state, ...action.payload.transactions];
    case UPDATE_TRANSACTION:
      return state.map(transaction => {
        if (action.payload.id === transaction.id) {
          return { ...transaction, ...action.payload};
        }

        return transaction;
      });
    case REMOVE_BUDGET_COMPLETE:
      return state.filter(transaction => transaction.budgetId !== action.payload);
    default:
      return state;
  }
}
