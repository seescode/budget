import { Action } from '@ngrx/store';

export const ADD_TRANSACTION = '[Budget] ADD_TRANSACTION';
export const ADD_TRANSACTION_COMPLETE = '[Budget] ADD_TRANSACTION_COMPLETE';

export const REMOVE_TRANSACTION = '[Budget] REMOVE_TRANSACTION';
export const REMOVE_TRANSACTION_COMPLETE = '[Budget] REMOVE_TRANSACTION_COMPLETE';

export const LOAD_BUDGET = '[Budget] LOAD_BUDGET';
export const LOAD_BUDGET_COMPLETE = '[Budget] LOAD_BUDGET_COMPLETE';

export const LOAD_BUDGET_DATA = '[Budget] LOAD_BUDGET_DATA';
export const LOAD_BUDGET_DATA_COMPLETE = '[Budget] LOAD_BUDGET_DATA_COMPLETE';
export const LOAD_BUDGET_DATA_FROM_CACHE = '[Budget] LOAD_BUDGET_DATA_FROM_CACHE';

export const ADD_BUDGET = '[Budget] ADD_BUDGET';
export const ADD_BUDGET_COMPLETE = '[Budget] ADD_BUDGET_COMPLETE';

export const REMOVE_BUDGET = '[Budget] REMOVE_BUDGET';
export const REMOVE_BUDGET_COMPLETE = '[Budget] REMOVE_BUDGET_COMPLETE';

export const UPDATE_BUDGET = '[Budget] UPDATE_BUDGET';
export const UPDATE_TRANSACTION = '[Budget] UPDATE_TRANSACTION';

export const SELECT = '[Budget] SELECT';

export const PREVIOUS_MONTH = '[Budget] PREVIOUS_MONTH';
export const NEXT_MONTH = '[Budget] NEXT_MONTH';


// Our app has prebuilt categories. Maybe I can just hardcode the values into 
// the store as the default value.
// export const ADD_CATEGORY = 'ADD_CATEGORY';
// export const ADD_CATEGORY_COMPLETE = 'ADD_CATEGORY_COMPLETE';

// export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
// export const REMOVE_CATEGORY_COMPLETE = 'REMOVE_CATEGORY_COMPLETE';

// export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';




/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// export class LoadBudget implements Action {
//   readonly type = LOAD_BUDGET;

//   constructor(public payload: string) {}
// }

// /**
//  * Export a type alias of all actions in this action group
//  * so that reducers can easily compose action types
//  */
// export type Actions = LoadBudget | SearchComplete | Load | Select;
