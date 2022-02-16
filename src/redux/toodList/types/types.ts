export interface ITodo {
  id: string;
  text: string;
  complete: boolean;
  times: string;
  check: boolean;
  showTime: boolean;
}

export interface ITodos {
  todos: ITodo[];
  textTodo: string;
  showAlert: boolean;
  currentRedactTodoId: string;
  currentRedactTodoText: string;
}

export const ADD_TODO = 'addTodo'
export const ADD_TEXT_TODO = 'addTodoText'
export const ALERT = 'alert'
export const CHANGE_TODOS = 'changeTodos'
export const GET_ID_CURRENT_TODO = 'getIdTodo'
export const GET_TEXT_CURRENT_TODO = 'getTextTodo'