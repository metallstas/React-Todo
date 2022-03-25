import { DELETE_TODO } from './../../types/types';

export const deleteTodo = (id: string) => {
  return {
    type: DELETE_TODO,
    id,
  }
}
