import { Budget } from './../models/interfaces';

export function BudgetReducer(state: Budget[] = [], action: any) {
  switch (action.type) {
    case 'ADD_BUDGET':
      return [...state, action.payload];
    case 'UPDATE_BUDGET':
      return state.map(budget => {
        if (action.payload.id === budget.id) {
          return { ...budget, ...action.payload};
        }

        return budget;
      });
    default:
      return state;
  }
}
