import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  ADD_TEXT_TODO,
  ADD_TODO,
  ALERT,
  ID_CURRENT_TODO,
  TEXT_CURRENT_TODO,
  ITodos,
  COMPLETE_ALL_TODOS,
  DELETE_ALL_TODOS,
  REDACT_TODO,
  CHECK_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  SHOW_TODO_TIME,
} from '../types/types'

const defaultState: ITodos = {
  todos: [],
  textTodo: '',
  showAlert: false,
  currentRedactTodoId: '',
  currentRedactTodoText: '',
}

const todoReducer = (state = defaultState, action: any) => {
  if (action.type === ADD_TODO) {
    return {
      ...state,
      todos: [...state.todos, action.todo],
      textTodo: '',
      currentRedactTodoId: '',
      currentRedactTodoText: '',
    }
  }

  if (action.type === ADD_TEXT_TODO) {
    return { ...state, textTodo: action.textTodo }
  }

  if (action.type === ALERT) {
    return { ...state, showAlert: action.showAlert }
  }

  if (action.type === ID_CURRENT_TODO) {
    return { ...state, currentRedactTodoId: action.id }
  }

  if (action.type === TEXT_CURRENT_TODO) {
    return { ...state, currentRedactTodoText: action.text }
  }

  if (action.type === COMPLETE_ALL_TODOS) {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.check ? { ...todo, complete: !todo.complete } : todo
      ),
    }
  }

  if (action.type === DELETE_ALL_TODOS) {
    return { ...state, todos: state.todos.filter((todo) => !todo.check) }
  }

  if (action.type === REDACT_TODO) {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === state.currentRedactTodoId
          ? { ...todo, text: state.currentRedactTodoText }
          : todo
      ),
      currentRedactTodoId: '',
      currentRedactTodoText: '',
    }
  }

  if (action.type === CHECK_TODO) {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        action.id === todo.id ? { ...todo, check: !todo.check } : todo
      ),
    }
  }

  if (action.type === DELETE_TODO) {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.id),
    }
  }

  if (action.type === COMPLETE_TODO) {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      ),
    }
  }

  if (action.type === SHOW_TODO_TIME) {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, showTime: !todo.showTime } : todo
      ),
    }
  }

  return state
}

export const store = createStore(todoReducer, composeWithDevTools())
