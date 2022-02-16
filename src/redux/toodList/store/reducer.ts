import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  ADD_TEXT_TODO,
  ADD_TODO,
  ALERT,
  CHANGE_TODOS,
  GET_ID_CURRENT_TODO,
  GET_TEXT_CURRENT_TODO,
  ITodos,
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

  if (action.type === CHANGE_TODOS) {
    return {
      ...state,
      todos: action.todos,
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

  if (action.type === GET_ID_CURRENT_TODO) {
    return { ...state, currentRedactTodoId: action.id }
  }

  if (action.type === GET_TEXT_CURRENT_TODO) {
    return { ...state, currentRedactTodoText: action.text }
  }

  return state
}

export const store = createStore(todoReducer, composeWithDevTools())
