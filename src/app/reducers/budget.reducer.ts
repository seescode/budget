import { Budget } from './../models/interfaces';

export function BudgetReducer(state: Budget[] = [], action: any) {
  switch (action.type) {
    case 'LOAD_BUDGET_COMPLETE':
      return action.payload;
    case 'ADD_BUDGET_COMPLETE':
      console.log('ADD_BUDGET_COMPLETE', action);
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
