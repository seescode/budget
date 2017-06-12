import { ADD_CATEGORY_COMPLETE, LOAD_BUDGET_DATA_COMPLETE, UPDATE_CATEGORY, 
  REMOVE_CATEGORY_COMPLETE, REMOVE_BUDGET_COMPLETE } from './../actions/actions';
import { Category } from './../models/interfaces';

export function CategoryReducer(state: Category[] = [], action: any) {
  switch (action.type) {
    case ADD_CATEGORY_COMPLETE:
      return [...state, action.payload];
    case LOAD_BUDGET_DATA_COMPLETE:
      return [...state, ...action.payload.categories];
    case UPDATE_CATEGORY:
      return state.map(category => {
        if (action.payload.id === category.id) {
          return { ...category, ...action.payload};
        }

        return category;
      });
    case REMOVE_CATEGORY_COMPLETE:
      return state.filter(cat => cat.id !== action.payload);
    case REMOVE_BUDGET_COMPLETE:
      return state.filter(cat => cat.budgetId !== action.payload);
    default:
      return state;
  }
}
