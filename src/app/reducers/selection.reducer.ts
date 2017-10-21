import { UserSelection } from './../models/interfaces';
import { toPayload } from '@ngrx/effects';
import {
  UPDATE_TRANSACTION, LOAD_BUDGET_DATA_COMPLETE, ADD_TRANSACTION_COMPLETE,
  REMOVE_TRANSACTION_COMPLETE, REMOVE_BUDGET_COMPLETE, SELECT, PREVIOUS_MONTH, NEXT_MONTH
} from './../actions/actions';

const defaultState = {
  budgetId: null,
  year: null,
  month: null,
  categoryId: null
}

export function SelectionReducer(state: UserSelection = defaultState, action: any) {
  let month;
  let year;

  switch (action.type) {
    case SELECT:

      return {
        budgetId: action.payload.budgetId,
        year: action.payload.year,
        month: action.payload.month,
        categoryId: action.payload.categoryId
      };
    case PREVIOUS_MONTH:

      month = state.month - 1;
      year = state.year;

      if (month === 0) {
        year--;
        month = 12;
      }

      return {
        budgetId: state.budgetId,
        year: year,
        month: month,
        categoryId: state.categoryId
      };
    case NEXT_MONTH:
      month = state.month + 1;
      year = state.year;

      if (month > 12) {
        year++;
        month = 1;
      }

      return {
        budgetId: state.budgetId,
        year: year,
        month: month,
        categoryId: state.categoryId
      };

    default:
      return state;
  }
}


