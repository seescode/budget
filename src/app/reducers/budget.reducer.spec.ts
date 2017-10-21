// import { LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA_COMPLETE, ADD_BUDGET_COMPLETE, UPDATE_BUDGET } from './../actions/actions';
// import { Loaded, Budget } from './../models/interfaces';
// /* tslint:disable */
// import { BudgetReducer } from './budget.reducer';


// describe('BudgetReducer', () => {

//   it('should handle null case', () => {

//     const actual = BudgetReducer([], {
//       type: LOAD_BUDGET_COMPLETE,
//       payload: '3'
//     });

//     expect(actual).toEqual('3');
//   });

//   it('should handle single case', () => {
//     const state: Budget[] = [];

//     const actual = BudgetReducer(state, {
//       type: ADD_BUDGET_COMPLETE,
//       payload: {
//         id: '3',
//         name: 'b',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       }
//     });

//     expect(actual).toEqual([
//       {
//         id: '3',
//         name: 'b',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       }
//     ]);
//   });

//   it('should handle multi case', () => {
//     const state: Budget[] = [{
//       id: '1',
//       name: 'a',
//       details: '',
//       budgetAmount: 0,
//       startDate: null,
//       endDate: null
//     }];

//     const actual = BudgetReducer(state, {
//       type: ADD_BUDGET_COMPLETE,
//       payload: {
//         id: '2',
//         name: 'b',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       }
//     });

//     expect(actual).toEqual([
//       {
//         id: '1',
//         name: 'a',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       },
//       {
//         id: '2',
//         name: 'b',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       }
//     ]);
//   });

//   it('should handle updating a budget', () => {
//     const state: Budget[] = [{
//       id: '1',
//       name: 'a',
//       details: '',
//       budgetAmount: 0,
//       startDate: null,
//       endDate: null
//     },
//     {
//       id: '2',
//       name: 'b',
//       details: '',
//       budgetAmount: 0,
//       startDate: null,
//       endDate: null
//     }];

//     const actual = BudgetReducer(state, {
//       type: UPDATE_BUDGET,
//       payload: {
//         id: '2',
//         name: 'b',
//         details: '',
//         budgetAmount: 100,
//         startDate: null,
//         endDate: null
//       }
//     });

//     expect(actual).toEqual([
//       {
//         id: '1',
//         name: 'a',
//         details: '',
//         budgetAmount: 0,
//         startDate: null,
//         endDate: null
//       },
//       {
//         id: '2',
//         name: 'b',
//         details: '',
//         budgetAmount: 100,
//         startDate: null,
//         endDate: null
//       }
//     ]);
//   });  
// });
