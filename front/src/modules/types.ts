import { Reducer } from "redux";
import { ActionsService } from './actionsService';

export interface Services {
  [key: string]: any
}

export interface Types {
  [key: string]: string
}

export interface Action {
  type: string;
  payload?: any;
}

export interface Module {
  actions: ActionsService;
  reducer: Reducer,
  types: Types,
  [key: string]: any,
}
