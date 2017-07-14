import { Action } from '@ngrx/store';
import { Budget } from './../models/interfaces';


export interface CustomObject {
  directoryName: string;
  brokenLinks: number;
}

export interface AppState {
  Main: CustomObject[];
};

export function MainReducer(state: CustomObject[] = [], action: Action) {

  switch (action.type) {
    case 'LOAD_CUSTOM_OBJECTS':
      return Object.assign({}, action.payload);
    default: {
      return state;
    }
  }
}

