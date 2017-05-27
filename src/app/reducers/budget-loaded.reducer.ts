import { LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA_COMPLETE } from './../actions/actions';
import { Loaded } from '../models/interfaces';

const initialState: Loaded = {
  loadedBudgetInfo: false,
  loadedBudgetIds: []
}

/**
 * This keeps a list of budgetsIds for budgets that loaded into memory.
 * 
 * @export
 * @param {string[]} [state=[]] 
 * @param {*} action 
 * @returns 
 */
export function BudgetLoadedReducer(state: Loaded = initialState, action: any) {
  switch (action.type) {
    case LOAD_BUDGET_COMPLETE:
      return {
        loadedBudgetInfo: true,
        loadedBudgetIds: []
      };
    case LOAD_BUDGET_DATA_COMPLETE:
      return {
        loadedBudgetInfo: state.loadedBudgetInfo,
        loadedBudgetIds: [...state.loadedBudgetIds, action.payload.budgetId]
      };
    default:
      return state;
  }
}
