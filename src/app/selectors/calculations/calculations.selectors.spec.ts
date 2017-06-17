import { monthlyBudgetPieDataSelector, totalBudgetPieDataSelector, getSelectedBudgetName, 
  categoryTransactionsSelector, categoriesForCurrentBudget } from '../selectors';

import * as moment from 'moment';

import {
  calculatedBudgetAmountSelector, runningSurplusSelector,
  budgetPageRouteSelector, everyCategoryTotalSelector,
  totalBudgetInfoSelector, monthlyBudgetInfoSelector
} from '../selectors';


describe('totalBudgetInfoSelector', () => {

  it('should handle zero transactions', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' }
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 0,
      spent: 150
    });
  });

  it('should consider year and month', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1' }
      ]
    );

    expect(actual).toEqual({
      totalBudget: 100,
      unspent: 0,
      spent: 150
    });

  });

  it('should consider multiple budgets', () => {
    const actual = totalBudgetInfoSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 100, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat2', budgetId: 'budget2' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' }
      ],
      {
        rollingBudgetAmount: -1, // not applicable
        monthlyBudgetAmount: 100,
        budgetId: 'budget1'
      }
    );

    expect(actual).toEqual({
      unspent: 0,
      spent: 150
    });
  });

  it('should work for a 4 month long budget', () => {
    const actual = monthlyBudgetInfoSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 2, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 400, startDate: new Date(2017, 0), endDate: new Date(2017, 3) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '5', id: '5', amount: 50, timestamp: new Date(2017, 3), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 2, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1800, startDate: new Date(2017, 0), endDate: new Date(2018, 5) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '5', id: '5', amount: 50, timestamp: new Date(2017, 3), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 2, categoryId: '' },
      { name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200, startDate: new Date(2017, 0), endDate: new Date(2017, 11) },
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat2', budgetId: 'budget2' }
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

  it('should calculate monthly budget for a 2 month budget', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 2000,
        startDate: new Date(2017, 0), endDate: new Date(2017, 1)
      },
      moment([2017, 0])
    );

    expect(actual).toEqual({
      rollingBudgetAmount: 1000,
      monthlyBudgetAmount: 1000,
      budgetId: 'budget1'
    });
  });

  it('should calculate for when current month is startDates month', () => {

    const actual = calculatedBudgetAmountSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1300,
        startDate: new Date(2017, 0), endDate: new Date(2018, 0)
      },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)
      },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 0), endDate: new Date(2018, 11)
      },
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
      { budgetId: 'budget1', year: 2016, month: 11, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)
      },
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
      { budgetId: 'budget1', year: 2016, month: 0, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 0), endDate: new Date(2017, 11)
      },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 1), endDate: new Date(2017, 1)
      },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 1), endDate: new Date(2017, 2)
      },
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      {
        name: 'a', id: 'budget1', details: 'none', budgetAmount: 1200,
        startDate: new Date(2017, 1), endDate: new Date(2017, 2)
      },
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
        { name: '1', id: '1', amount: 100, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 100, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 100, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1' }
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
        { name: '1', id: '1', amount: 500, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 500, timestamp: new Date(2018, 1), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 500, timestamp: new Date(2017, 2), categoryId: 'cat1', budgetId: 'budget1' }
      ]
    )

    expect(actual).toEqual(0);
  });


});

describe('monthlyBudgetPieDataSelector', () => {

  it('should return all zeros', () => {
    const actual = monthlyBudgetPieDataSelector.resultFunc({
      unspent: 0,
      spent: 0
    }, 0);

    expect(actual).toEqual([
      { label: 'Spent', amount: 0 },
      { label: 'Remaining', amount: 0 },
      { label: 'Surplus', amount: 0 }
    ]);
  });

  it('should return for standard case', () => {
    const actual = monthlyBudgetPieDataSelector.resultFunc({
      unspent: 100,
      spent: 20
    }, 10);

    expect(actual).toEqual([
      { label: 'Spent', amount: 20 },
      { label: 'Remaining', amount: 100 },
      { label: 'Surplus', amount: 10 }
    ]);
  });

});



describe('totalBudgetPieDataSelector', () => {

  it('should return all zeros', () => {
    const actual = totalBudgetPieDataSelector.resultFunc({
      totalBudget: 0,
      unspent: 0,
      spent: 0
    });

    expect(actual).toEqual([
      { label: 'Spent', amount: 0 },
      { label: 'Remaining', amount: 0 }
    ]);
  });

  it('should return for standard case', () => {
    const actual = totalBudgetPieDataSelector.resultFunc({
      totalBudget: 30,
      unspent: 10,
      spent: 20
    });

    expect(actual).toEqual([
      { label: 'Spent', amount: 20 },
      { label: 'Remaining', amount: 10 }
    ]);
  });

});



