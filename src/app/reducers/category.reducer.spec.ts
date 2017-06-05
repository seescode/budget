import { LOAD_BUDGET_COMPLETE, LOAD_BUDGET_DATA_COMPLETE, ADD_BUDGET_COMPLETE,
  UPDATE_BUDGET, ADD_CATEGORY_COMPLETE, UPDATE_CATEGORY, REMOVE_CATEGORY_COMPLETE } from './../actions/actions';
import { Loaded, Budget, Category } from './../models/interfaces';
/* tslint:disable */
import { CategoryReducer } from './category.reducer';


describe('CategoryReducer', () => {


  it('should add single category', () => {

    const state: Category[] = [];

    const actual = CategoryReducer(state, {
      type: ADD_CATEGORY_COMPLETE,
      payload: {
        name: 'a'
      }
    });

    expect(actual).toEqual([
      {
        name: 'a'
      }
    ]);
  });


  it('should add multi categories', () => {

    const state: Category[] = [
      {
        name: 'a'
      }
    ];

    const actual = CategoryReducer(state, {
      type: ADD_CATEGORY_COMPLETE,
      payload: {
        name: 'b'
      }
    });

    expect(actual).toEqual([
      {
        name: 'a'
      },
      {
        name: 'b'
      }
    ]);

  });

  it('should work for single when LOAD_BUDGET_DATA_COMPLETE', () => {

    const state: Category[] = [];

    const actual = CategoryReducer(state, {
      type: LOAD_BUDGET_DATA_COMPLETE,
      payload: {
        categories: [
          {
            name: 'a'
          }
        ]
      }
    });

    expect(actual).toEqual([
      {
        name: 'a'
      }
    ]);
  });

  it('should work for multiple when LOAD_BUDGET_DATA_COMPLETE', () => {

    const state: Category[] = [{
      name: 'a'
    }];

    const actual = CategoryReducer(state, {
      type: LOAD_BUDGET_DATA_COMPLETE,
      payload: {
        categories: [
          {
            name: 'b'
          },
          {
            name: 'c'
          }
        ]
      }
    });

    expect(actual).toEqual([
      {
        name: 'a'
      },
      {
        name: 'b'
      },
      {
        name: 'c'
      }
    ]);
  });

  it('should work for multiple when UPDATE_CATEGORY', () => {

    const state: Category[] = [
      {
        name: 'a',
        id: '1'
      },
      {
        name: 'b',
        id: '2'
      },
      {
        name: 'c',
        id: '3'
      }
    ];

    const actual = CategoryReducer(state, {
      type: UPDATE_CATEGORY,
      payload: {
        name: 'bbb',
        id: '2'
      }
    });

    expect(actual).toEqual([
      {
        name: 'a',
        id: '1'
      },
      {
        name: 'bbb',
        id: '2'
      },
      {
        name: 'c',
        id: '3'
      }
    ]);
  });

  it('should work for REMOVE_CATEGORY_COMPLETE', () => {

    const state: Category[] = [
      {
        name: 'a',
        id: '1'
      },
      {
        name: 'b',
        id: '2'
      },
      {
        name: 'c',
        id: '3'
      }
    ];

    const actual = CategoryReducer(state, {
      type: REMOVE_CATEGORY_COMPLETE,
      payload: '2'
    });

    expect(actual).toEqual([
      {
        name: 'a',
        id: '1'
      },
      {
        name: 'c',
        id: '3'
      }
    ]);
  });
  
});
