// import { REMOVE_TRANSACTION_COMPLETE, LOAD_BUDGET_DATA_COMPLETE, UPDATE_TRANSACTION, REMOVE_CATEGORY_COMPLETE } from './../actions/actions';
// /* tslint:disable */
// import { ADD_TRANSACTION_COMPLETE } from './../actions/actions';
// import { Loaded, Budget, Category, Transaction } from './../models/interfaces';
// import { TransactionReducer } from './transaction.reducer';

// describe('TransactionReducer', () => {
//   it('should add single transaction', () => {
//     const state: Transaction[] = [];

//     const actual = TransactionReducer(state, {
//       type: ADD_TRANSACTION_COMPLETE,
//       payload: {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       }
//     });

//     expect(actual).toEqual([
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       }
//     ]);
//   });

//   it('should append transactions', () => {
//     const state: Transaction[] = [
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       }
//     ];

//     const actual = TransactionReducer(state, {
//       type: ADD_TRANSACTION_COMPLETE,
//       payload: {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     });

//     expect(actual).toEqual([
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     ]);
//   });

//   it('should remove transactions', () => {
//     const state: Transaction[] = [
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     ];

//     const actual = TransactionReducer(state, {
//       type: REMOVE_TRANSACTION_COMPLETE,
//       payload: {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     });

//     expect(actual).toEqual([
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       }
//     ]);
//   });

//   it('should load multiple transactions when LOAD_BUDGET_DATA_COMPLETE', () => {
//     const state: Transaction[] = [
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     ];

//     const actual = TransactionReducer(state, {
//       type: LOAD_BUDGET_DATA_COMPLETE,
//       payload: {
//         transactions: [
//           {
//             name: 'c',
//             amount: 2,
//             id: 'c'
//           },
//           {
//             name: 'd',
//             amount: 2,
//             id: 'd'
//           }
//         ]
//       }
//     });

//     expect(actual).toEqual([
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       },
//       {
//         name: 'c',
//         amount: 2,
//         id: 'c'
//       },
//       {
//         name: 'd',
//         amount: 2,
//         id: 'd'
//       }
//     ]);
//   });

//   it('should update transactions', () => {
//     const state: Transaction[] = [
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b'
//       }
//     ];

//     const actual = TransactionReducer(state, {
//       type: UPDATE_TRANSACTION,
//       payload: {
//         name: 'b',
//         amount: 20,
//         id: 'b'
//       }
//     });

//     expect(actual).toEqual([
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a'
//       },
//       {
//         name: 'b',
//         amount: 20,
//         id: 'b'
//       }      
//     ]);
//   });  


//   it('should remove transactions based on categoryId', () => {
//     const state: Transaction[] = [
//       {
//         name: 'a',
//         amount: 1,
//         id: 'a',
//         categoryId: 'cat1'
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b',
//         categoryId: 'cat1'        
//       },
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b',
//         categoryId: 'cat2'        
//       }      
//     ];

//     const actual = TransactionReducer(state, {
//       type: REMOVE_CATEGORY_COMPLETE,
//       payload: 'cat1'
//     });

//     expect(actual).toEqual([
//       {
//         name: 'b',
//         amount: 2,
//         id: 'b',
//         categoryId: 'cat2'        
//       }   
//     ]);
//   });  
// });
