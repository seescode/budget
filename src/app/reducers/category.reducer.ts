import { Category } from './../models/interfaces';

export function CategoryReducer(state: Category[] = [], action: any) {
  switch (action.type) {
    case 'ADD_CATEGORY_COMPLETE':
      return [...state, action.payload];
    case 'LOAD_BUDGET_DATA_COMPLETE':
      return [...state, ...action.payload.categories];
    case 'UPDATE_CATEGORY':
      return state.map(category => {
        if (action.payload.id === category.id) {
          return { ...category, ...action.payload};
        }

        return category;
      });

    default:
      return state;
  }
}
