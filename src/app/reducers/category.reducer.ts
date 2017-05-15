import { Category } from './../models/interfaces';

export function CategoryReducer(state: Category[] = [], action: any) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.payload];
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
