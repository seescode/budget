import { DBSchema } from '@ngrx/db';


/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'budget',
  stores: {
    budget: {
      autoIncrement: true,
      primaryKey: 'id'
    },
    category: {
      autoIncrement: true,
      primaryKey: 'id'
    },
    transaction: {
      autoIncrement: true,
      primaryKey: 'id'
    },

  }
};
