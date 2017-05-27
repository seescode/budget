import { ADD_TRANSACTION, LOAD_BUDGET_DATA, ADD_CATEGORY, ADD_BUDGET } from './actions';
import { Transaction, Category, Budget } from './../models/interfaces';
import { UUID } from 'angular2-uuid';
import { Injectable } from '@angular/core';


@Injectable()
export class ActionsCreatorService {

  constructor() { }

  getToday() {
    return new Date();
  }

  getUuid() {
    return UUID.UUID();
  }

  addTransaction(transaction: Transaction, budgetId: string, routeYear: number, routeMonth: number) {
    transaction.id = this.getUuid();
    transaction.budgetId = budgetId;

    const today = this.getToday();

    // if route matches current month and year then use new Date()
    if (today.getFullYear() === routeYear &&
      today.getMonth() === routeMonth - 1) {
      transaction.timestamp = today;
    } else {
      // if route does not match current month and year use the routes date and month
      transaction.timestamp = new Date(routeYear, routeMonth - 1);
    }

    return {
      type: ADD_TRANSACTION,
      payload: transaction
    };
  }

  loadBudgetData(budgetId: string) {
    return {
      type: LOAD_BUDGET_DATA,
      payload: budgetId
    };
  }

  addCategory(categoryName: string, budgetId: string) {
    const newCategory: Category = {
        name: categoryName,
        id: this.getUuid(),
        budgetId: budgetId
    };

    return {
      type: ADD_CATEGORY,
      payload: newCategory
    }
  }

  addBudget() {

    // build a mock budget object and then dispatch to the store with this information
    const newBudget: Budget = {
      id: this.getUuid(),
      name: 'budget 2',
      details: 'Standard',
      budgetAmount: 12000,
      startDate: new Date(2017, 0, 1),
      endDate: new Date(2017, 11, 12)
    };

    return {
      type: ADD_BUDGET,
      payload: newBudget
    }
  }
  
}
