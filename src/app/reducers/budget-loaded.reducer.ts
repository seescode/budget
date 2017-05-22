

/**
 * This keeps a list of budgetsIds for budgets that loaded into memory.
 * 
 * @export
 * @param {string[]} [state=[]] 
 * @param {*} action 
 * @returns 
 */
export function BudgetLoadedReducer(state: string[] = [], action: any) {
  switch (action.type) {
    case 'LOAD_BUDGET_DATA_COMPLETE':
      return [...state, action.payload.budgetId];
    default:
      return state;
  }
}
