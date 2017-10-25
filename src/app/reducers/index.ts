import { Budget, Transaction, Loaded, UserSelection, Category, Subcategory } from './../models/interfaces';
// import * as fromRouter from '@ngrx/router-store';
// import { environment } from '../../environments/environment';
import {BudgetReducer } from './budget.reducer';
import {TransactionReducer } from './transaction.reducer';
import { BudgetLoadedReducer } from './budget-loaded.reducer';
import * as fromRouter from '@ngrx/router-store';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CategoryReducer } from './category.reducer';
import { SubcategoryReducer } from './subcategory.reducer';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  budget: Budget[];
  transaction: Transaction[];
  budgetLoaded: Loaded;
  category: Category[]; 
  subcategory: Subcategory; 
  routerReducer: fromRouter.RouterReducerState<any>;
}


/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

// const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

// export function reducer(state: any, action: any) {

//   //TODO: FIX ME
//   return developmentReducer(state, action)

//   // if (environment.production) {
//   //   return productionReducer(state, action);
//   // } else {
//   //   return developmentReducer(state, action);
//   // }
// }


export const reducers: ActionReducerMap<AppState> = {
  budget: BudgetReducer,
  transaction: TransactionReducer,
  budgetLoaded: BudgetLoadedReducer,
  category: CategoryReducer,
  subcategory: SubcategoryReducer,
  routerReducer: fromRouter.routerReducer
};


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
var environment = {
  production: false
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
? [storeFreeze]
: [];
