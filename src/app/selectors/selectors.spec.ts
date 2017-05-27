/* tslint:disable */

import * as moment from 'moment';

import { calculatedBudgetAmountSelector, runningSurplusSelector,
  budgetPageRouteSelector, everyCategoryTotalSelector, 
  totalBudgetInfoSelector, monthlyBudgetInfoSelector } from './selectors';

describe('getBudgetingPageRoute', () => {

  it('should return null for / page', () => {
    const actual = budgetPageRouteSelector.resultFunc({
      "path": "/"
    });

    expect(actual).toEqual(null);
  });

  it('should return null for /budget-list page', () => {
    const actual = budgetPageRouteSelector.resultFunc({
      "path": "/budget-list"
    });

    expect(actual).toEqual(null);
  });

  it('should return budgetId, year, and month correctly', () => {
    const actual = budgetPageRouteSelector.resultFunc({
      "path": "/budgeting/bf560523-702b-a61b-7499-08c2ae943689/2017/5"
    });

    expect(actual.budgetId).toEqual('bf560523-702b-a61b-7499-08c2ae943689');
    expect(actual.year).toEqual(2017);
    expect(actual.month).toEqual(5);    
  });
});


describe('everyCategoryTotalSelector', () => {

  it('should handle zero categories', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1}, [], []
    );

    expect(actual).toEqual([]);
  });

  it('should handle single category', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'cat1', budgetId: 'budget1'}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    );

    expect(actual).toEqual([
      {
        name: 'a',
        id: 'cat1',
        budgetId: 'budget1',
        amount: 100
      }
    ]);
  });

  it('should only calculate based on current date', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'cat1', budgetId: 'budget1'}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2016, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'}        
      ]
    );

    expect(actual).toEqual([
      {
        name: 'a',
        id: 'cat1',
        budgetId: 'budget1',
        amount: 100
      }
    ]);
  });


  it('should handle multiple categories', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1'},
        { name: 'b', id: 'cat2', budgetId: 'budget1'}      
      ], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'}        
      ]
    );

    expect(actual).toEqual([
      {
        name: 'a',
        id: 'cat1',
        budgetId: 'budget1',
        amount: 100
      },
      {
        name: 'b',
        id: 'cat2',
        budgetId: 'budget1',
        amount: 10
      },      
    ]);
  });

  it('should handle multiple budgets', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget2', year: 2017, month: 1},
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1'},
        { name: 'b', id: 'cat2', budgetId: 'budget1'},
        { name: 'a', id: 'cat3', budgetId: 'budget2'},
        { name: 'b', id: 'cat4', budgetId: 'budget2'},        
      ], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'},        
        { name: '5', id: '5', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2'},
        { name: '6', id: '6', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2'},
        { name: '7', id: '7', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2'},
        { name: '8', id: '8', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2'}        
      ]
    );

    expect(actual).toEqual([
      {
        name: 'a',
        id: 'cat3',
        budgetId: 'budget2',
        amount: 6
      },
      {
        name: 'b',
        id: 'cat4',
        budgetId: 'budget2',
        amount: 2
      },            
    ]);
  });

  it('should handle everything', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      {budgetId: 'budget2', year: 2017, month: 1},
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1'},
        { name: 'b', id: 'cat2', budgetId: 'budget1'},
        { name: 'a', id: 'cat3', budgetId: 'budget2'},
        { name: 'b', id: 'cat4', budgetId: 'budget2'},
        { name: 'c', id: 'cat5', budgetId: 'budget2'}  
      ], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1'},        
        { name: '5', id: '5', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2'},
        { name: '6', id: '6', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2'},
        { name: '7', id: '7', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2'},
        { name: '8', id: '8', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat4', budgetId: 'budget2'},
        { name: '9', id: '9', amount: 1000, timestamp: new Date(2017, 2), categoryId: 'cat5', budgetId: 'budget2'}        
      ]
    );

    expect(actual).toEqual([
      {
        name: 'a',
        id: 'cat3',
        budgetId: 'budget2',
        amount: 6
      },
      {
        name: 'b',
        id: 'cat4',
        budgetId: 'budget2',
        amount: 1
      }, 
      {
        name: 'c',
        id: 'cat5',
        budgetId: 'budget2',
        amount: 0
      }                 
    ]);
  });

});


describe('totalBudgetInfoSelector', () => {

  it('should handle zero transactions', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      []
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 100,
      spent: 0
    });
  });

  it('should spend half the budget', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 50,
      spent: 50
    });
  });

  it('should spend whole budget', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 0,
      spent: 100
    });
  });

  it('should spend over the budget', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: -50,
      spent: 150
    });
  });

  it('should consider year and month', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: -50,
      spent: 150
    });
    
  });

  it('should consider multiple budgets', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [
        { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11)},
        { name: 'b', id: 'budget2', details: 'none', budgetAmount: 1000, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}
      ], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat2', budgetId: 'budget2'}
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 0,
      spent: 100
    });
  });

});


describe('monthlyBudgetInfoSelector', () => {

  it('should handle zero tranactions', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }            
    );

    expect(actual).toEqual({
      unspent: 100,
      spent: 0
    });
  });

  it('should spend half the budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'}
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }      
    );

    expect(actual).toEqual({
      unspent: 50,
      spent: 50
    });
  });

  it('should spend whole budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'}
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }            
    );

    expect(actual).toEqual({
      unspent: 0,
      spent: 100
    });
  });

  it('should spend over the budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'}
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }            
    );

    expect(actual).toEqual({
      unspent: -50,
      spent: 150
    });
  });

  it('should work for a 4 month long budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 2},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 400, startDate: new Date(2017, 0), endDate: new Date(2017, 3)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '5', id: '5', amount: 50, timestamp: new Date(2017, 3), categoryId: 'cat1', budgetId: 'budget1'}        
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }            
    );

    expect(actual).toEqual({
      unspent: 99,
      spent: 1
    });
    
  });

  it('should work for a year and a half long budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 2},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1800, startDate: new Date(2017, 0), endDate: new Date(2018, 5)}], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '5', id: '5', amount: 50, timestamp: new Date(2017, 3), categoryId: 'cat1', budgetId: 'budget1'}        
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }            
    );

    expect(actual).toEqual({
      unspent: 99,
      spent: 1
    });
    
  });

  it('should consider multiple budgets', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 2},
      [
        { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11)},
        { name: 'b', id: 'budget2', details: 'none', budgetAmount: 1000, startDate: new Date(2017, 0), endDate: new Date(2017, 11)}
      ], 
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat2', budgetId: 'budget2'}
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }      
    );

    expect(actual).toEqual({
      unspent: 0,
      spent: 100
    });
  });

});

describe('calculatedBudgetAmountSelector', () => {

  it('should calculate for when current month is startDates month', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1300, 
        startDate: new Date(2017, 0), endDate: new Date(2018, 0)}],
      moment([2017, 0])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 100,
      monthlyBudgetAmount: 100,
      budgetId: 'budget1'
    });
  });

  it('should calculate for when current month is one month ahead', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)}],
      moment([2017, 1])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 200,
      monthlyBudgetAmount: 100,
      budgetId: 'budget1'
    });
  });

  it('should calculate for when current month is one year ahead', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 0), endDate: new Date(2018, 11)}],
      moment([2017, 11])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 600,
      monthlyBudgetAmount: 50,      
      budgetId: 'budget1'
    });
  });

  it('should return 0 when current month is one month before startDate', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2016, month: 11},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)}],
      moment([2016, 11])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 0,
      monthlyBudgetAmount: 100,      
      budgetId: 'budget1'
    });
  });

  it('should return 0 when current month is one year before startDate', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2016, month: 0},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)}],
      moment([2016, 0])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 0,
      monthlyBudgetAmount: 100,      
      budgetId: 'budget1'
    });
  });

  it('should return 100 when current month is on startDate and endDate', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 1), endDate: new Date(2017, 1)}],
      moment([2017, 1])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 1200,
      monthlyBudgetAmount: 1200,      
      budgetId: 'budget1'
    });
  });
  

  it('should return full budget amount when current date is past end date by one month', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 1), endDate: new Date(2017, 2)}],
      moment([2017, 3])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 1200,
      monthlyBudgetAmount: 600,
      budgetId: 'budget1'
    });
  });

  it('should return full budget amount when current date is past end date by one year', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      {budgetId: 'budget1', year: 2017, month: 1},
      [{ name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, 
        startDate: new Date(2017, 1), endDate: new Date(2017, 2)}],
      moment([2018, 2])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 1200,
      monthlyBudgetAmount: 600,
      budgetId: 'budget1'
    });
  });

});

describe('runningSurplusSelector', () => {

  it('should handle zero tranactions', () => {
    const actual = runningSurplusSelector.resultFunc(
      {
        rollingBudgetAmount: 1000,
        monthlyBudgetAmount: 100,
        budgetId: 10
      }, 
      []
    )

    expect(actual).toEqual(1000);
  });

  it('should return surplus', () => {
    const actual = runningSurplusSelector.resultFunc(
      {
        rollingBudgetAmount: 1000,
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }, 
      [
        { name: '1', id: '1', amount: 100, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 100, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 100, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    )

    expect(actual).toEqual(700);    
  });

  it('should return 0 when there is no surplus', () => {
    const actual = runningSurplusSelector.resultFunc(
      {
        rollingBudgetAmount: 1000,
        monthlyBudgetAmount: 100,        
        budgetId: 'budget1'
      }, 
      [
        { name: '1', id: '1', amount: 500, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '2', id: '2', amount: 500, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1'},
        { name: '3', id: '3', amount: 500, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1'}
      ]
    )

    expect(actual).toEqual(0);    
  });


});
