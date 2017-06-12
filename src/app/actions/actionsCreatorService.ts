import { ADD_TRANSACTION, LOAD_BUDGET_DATA, ADD_CATEGORY, ADD_BUDGET, REMOVE_TRANSACTION, REMOVE_CATEGORY, REMOVE_CATEGORY_COMPLETE, REMOVE_BUDGET, REMOVE_BUDGET_COMPLETE } from './actions';
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

  removeTransaction(transaction: any) {
    return {
      type: REMOVE_TRANSACTION,
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
    };
  }

  removeCategory(categoryId: string) {
    return {
      type: REMOVE_CATEGORY,
      payload: categoryId
    };
  }

  removeCategoryComplete(categoryId: string) {
    return {
      type: REMOVE_CATEGORY_COMPLETE,
      payload: categoryId
    };
  }

  removeBudget(budgetId: string) {
    return {
      type: REMOVE_BUDGET,
      payload: budgetId
    };
  }

  removeBudgetComplete(budgetId: string) {
    return {
      type: REMOVE_BUDGET_COMPLETE,
      payload: budgetId
    };
  }

  addBudget(name: string, details: string, budgetAmount: number, startDate: Date, endDate: Date) {

    // build a mock budget object and then dispatch to the store with this information
    const newBudget: Budget = {
      id: this.getUuid(),
      name: name,
      details: details,
      budgetAmount: budgetAmount,
      startDate: startDate,
      endDate: endDate
    };

    return {
      type: ADD_BUDGET,
      payload: newBudget
    };
  }
}
