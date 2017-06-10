import {
  monthlyBudgetPieDataSelector, totalBudgetPieDataSelector, getSelectedBudgetName,
  categoryTransactionsSelector, categoriesForCurrentBudget
} from '../selectors';

import * as moment from 'moment';

import {
  calculatedBudgetAmountSelector, runningSurplusSelector,
  budgetPageRouteSelector, everyCategoryTotalSelector,
  totalBudgetInfoSelector, monthlyBudgetInfoSelector
} from '../selectors';


describe('categoriesForCurrentBudget', () => {

  it('should handle zero categories', () => {
    const actual = categoriesForCurrentBudget.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' }, []
    );

    expect(actual).toEqual([]);
  });

  it('should handle single category', () => {
    const actual = categoriesForCurrentBudget.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      [{ name: 'a', id: 'cat1', budgetId: 'budget1' }]
    );

    expect(actual).toEqual([{ name: 'a', id: 'cat1', budgetId: 'budget1' }]);
  });


  it('should handle multiple categories', () => {
    const actual = categoriesForCurrentBudget.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      [{ name: 'a', id: 'cat1', budgetId: 'budget1' },
      { name: 'b', id: 'cat2', budgetId: 'budget1' }]
    );

    expect(actual).toEqual(
      [{ name: 'a', id: 'cat1', budgetId: 'budget1' },
      { name: 'b', id: 'cat2', budgetId: 'budget1' }]
    );
  });

  it('should handle multiple budgets', () => {
    const actual = categoriesForCurrentBudget.resultFunc(
      { budgetId: 'budget2', year: 2017, month: 1, categoryId: '' },
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1' },
        { name: 'b', id: 'cat2', budgetId: 'budget1' },
        { name: 'c', id: 'cat3', budgetId: 'budget2' },
        { name: 'd', id: 'cat4', budgetId: 'budget2' },
        { name: 'e', id: 'cat5', budgetId: 'budget3' },
        { name: 'f', id: 'cat6', budgetId: 'budget3' }
      ]
    );

    expect(actual).toEqual(
      [{ name: 'c', id: 'cat3', budgetId: 'budget2' },
      { name: 'd', id: 'cat4', budgetId: 'budget2' }]
    );
  });

});


describe('everyCategoryTotalSelector', () => {

  it('should handle zero categories', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' }, [], []
    );

    expect(actual).toEqual([]);
  });

  it('should handle single category', () => {
    const actual = everyCategoryTotalSelector.resultFunc(
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      [{ name: 'a', id: 'cat1', budgetId: 'budget1' }],
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      [{ name: 'a', id: 'cat1', budgetId: 'budget1' }],
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 50, timestamp: new Date(2016, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 50, timestamp: new Date(2017, 1), categoryId: 'cat1', budgetId: 'budget1' }
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
      { budgetId: 'budget1', year: 2017, month: 1, categoryId: '' },
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1' },
        { name: 'b', id: 'cat2', budgetId: 'budget1' }
      ],
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' }
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
      { budgetId: 'budget2', year: 2017, month: 1, categoryId: '' },
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1' },
        { name: 'b', id: 'cat2', budgetId: 'budget1' },
        { name: 'a', id: 'cat3', budgetId: 'budget2' },
        { name: 'b', id: 'cat4', budgetId: 'budget2' },
      ],
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' },
        { name: '5', id: '5', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2' },
        { name: '6', id: '6', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2' },
        { name: '7', id: '7', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2' },
        { name: '8', id: '8', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2' }
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
      { budgetId: 'budget2', year: 2017, month: 1, categoryId: '' },
      [
        { name: 'a', id: 'cat1', budgetId: 'budget1' },
        { name: 'b', id: 'cat2', budgetId: 'budget1' },
        { name: 'a', id: 'cat3', budgetId: 'budget2' },
        { name: 'b', id: 'cat4', budgetId: 'budget2' },
        { name: 'c', id: 'cat5', budgetId: 'budget2' }
      ],
      [
        { name: '1', id: '1', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '2', id: '2', amount: 50, timestamp: new Date(2017, 0), categoryId: 'cat1', budgetId: 'budget1' },
        { name: '3', id: '3', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' },
        { name: '4', id: '4', amount: 5, timestamp: new Date(2017, 0), categoryId: 'cat2', budgetId: 'budget1' },
        { name: '5', id: '5', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2' },
        { name: '6', id: '6', amount: 3, timestamp: new Date(2017, 0), categoryId: 'cat3', budgetId: 'budget2' },
        { name: '7', id: '7', amount: 1, timestamp: new Date(2017, 0), categoryId: 'cat4', budgetId: 'budget2' },
        { name: '8', id: '8', amount: 1, timestamp: new Date(2017, 1), categoryId: 'cat4', budgetId: 'budget2' },
        { name: '9', id: '9', amount: 1000, timestamp: new Date(2017, 2), categoryId: 'cat5', budgetId: 'budget2' }
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


describe('categoryTransactionsSelector', () => {

  it('should return [] when categoryId or transactions are null', () => {
    expect([]).toEqual(categoryTransactionsSelector.resultFunc(null, null));
  });

  it('should return transactions for selected categoryId and current month', () => {

    const actual = categoryTransactionsSelector.resultFunc('c',
      [
        {
          name: 'a',
          amount: 1,
          categoryId: '1'
        },
        {
          name: 'b',
          amount: 2,
          categoryId: 'b'
        },
        {
          name: 'c',
          amount: 3,
          categoryId: 'c'
        },
        {
          name: 'd',
          amount: 4,
          categoryId: 'c'
        }
      ]
    )

    const expected = [
      {
        name: 'c',
        amount: 3,
        categoryId: 'c'
      },
      {
        name: 'd',
        amount: 4,
        categoryId: 'c'
      }
    ];


    expect(actual).toEqual(expected);


  });
});

