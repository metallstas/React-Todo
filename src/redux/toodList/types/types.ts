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
export const ID_CURRENT_TODO = 'getIdTodo'
export const TEXT_CURRENT_TODO = 'getTextTodo'
export const COMPLETE_ALL_TODOS = 'completeAllTodos'
export const DELETE_ALL_TODOS = 'deleteAllTodos'
export const REDACT_TODO = 'redactTodo'
export const CHECK_TODO = 'checkTodo'
export const DELETE_TODO = 'deleteTodo'
export const COMPLETE_TODO = 'completeTodo'
export const SHOW_TODO_TIME = 'showTodoTime'
