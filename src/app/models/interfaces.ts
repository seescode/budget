export interface Category {
  name: string;
  id?: string;
  budgetId?: string;
}

export interface Transaction {
  name: string;
  id?: string;
  amount: number;
  timestamp?: Date;
  categoryId?: string;
  budgetId?: string;
}

export interface Budget {
  id: string;
  name: string;
  details: string;
  budgetAmount: number;
  startDate: Date;
  endDate: Date;
}

export interface ActiveDate {
  month: number,
  year: number
}
