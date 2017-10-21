export interface TotalBudgetInfo {
  totalBudget: number;
  unspent: number;
  spent: number;
}

export interface Transaction {
  name: string;
  categoryName: string;
  id?: string;
  amount: number;
  timestamp?: Date;
  budgetId?: string;
}

export interface Budget {
  id?: string;
  name: string;
  details: string;
  budgetAmount: number;
  startDate: Date;
  endDate: Date;
}

// export interface ActiveDate {
//   month: number;
//   year: number;
//   fullMonth?: string;
// }

export interface Loaded {
  loadedBudgetInfo: boolean;
  loadedBudgetIds: string[];
}

export interface UserSelection {
  budgetId: string;
  month: number;
  year: number;
  categoryId: string;
}

export interface ActiveDate {
  month: number;
  year: number;
  fullMonth?: string;
}

export interface Category {
  icon: string;
  name: string;
}

export interface Subcategory {

  education: string[];
  food: string[];
  fun: string[];
  home: string[];
  medical: string[];
  stuff: string[];
  transportation: string[];
  utilities: string[];

}
