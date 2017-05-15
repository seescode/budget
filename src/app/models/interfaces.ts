export interface Category {
  name: string;
  id?: number;
  budgetId: number;
}

export interface Transaction {
  name: string;
  id?: string;
  amount: number;
  timestamp?: Date;
  categoryId: number;
  budgetId: number;
}

export interface Budget {
  id: number;
  name: string;
  details: string;
  budgetAmount: number;
}

export interface ActiveDate {
  month: number,
  year: number
}
