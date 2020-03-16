import { Action } from "@ngrx/store";

export enum UIActionTypes {
  SHOW_MESSAGE = "[UI] Show Message"
}

export class ShowMessage implements Action {
  readonly type = UIActionTypes.SHOW_MESSAGE;
  constructor(public readonly message: string) {}
}
