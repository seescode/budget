export interface Category {
  name: string;
  id: number;
}

export interface Transaction {
  name: string;
  _id?: string;
  amount: number;
  timestamp: Date;
  categoryId: number;
}

export interface Budget {
  id: number;
  name: string;
  details: string;
  budgetAmount: number;
  transactions: Array<Transaction>;
  categories: Array<Category>; 
}

export interface ActiveDate {
  month: number,
  year: number
}
