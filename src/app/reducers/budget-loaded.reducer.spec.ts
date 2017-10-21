// import { LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA_COMPLETE } from './../actions/actions';
// import { Loaded } from './../models/interfaces';
// /* tslint:disable */
// import { BudgetLoadedReducer } from './budget-loaded.reducer';


// describe('BudgetLoadedReducer', () => {

//   it('should handle null case', () => {
//     const state: Loaded = {
//       loadedBudgetInfo: false,
//       loadedBudgetIds: []
//     };

//     const actual = BudgetLoadedReducer(state, {
//       type: LOAD_BUDGET_COMPLETE
//     });

//     const expected: Loaded = {
//       loadedBudgetInfo: true,
//       loadedBudgetIds: []
//     };

//     expect(actual).toEqual(expected);
//   });

//   it('should handle single case', () => {
//     const state: Loaded = {
//       loadedBudgetInfo: true,
//       loadedBudgetIds: []
//     };

//     const actual = BudgetLoadedReducer(state, {
//       type: LOAD_BUDGET_DATA_COMPLETE,
//       payload: {
//         budgetId: '1'
//       }
//     });

//     const expected: Loaded = {
//       loadedBudgetInfo: true,
//       loadedBudgetIds: ['1']
//     };

//     expect(actual).toEqual(expected);
//   });

//   it('should handle multi case', () => {
//     const state: Loaded = {
//       loadedBudgetInfo: true,
//       loadedBudgetIds: ['1']
//     };

//     const actual = BudgetLoadedReducer(state, {
//       type: LOAD_BUDGET_DATA_COMPLETE,
//       payload: {
//         budgetId: '2'
//       }
//     });

//     const expected: Loaded = {
//       loadedBudgetInfo: true,
//       loadedBudgetIds: ['1', '2']
//     };

//     expect(actual).toEqual(expected);
//   });
// });
