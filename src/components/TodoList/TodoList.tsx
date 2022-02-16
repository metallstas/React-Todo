import Form from '../Form/Form'
import { TodoListItem } from './TodoListItem/TodoListItem'
import cls from './TodoList.module.css'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  CHANGE_TODOS,
  ITodos,
  GET_ID_CURRENT_TODO,
  GET_TEXT_CURRENT_TODO,
} from '../../redux/toodList/types/types'

const TodoList = () => {
  const state = useSelector((state: ITodos) => state)
  const dispatch = useDispatch()

  const hasCheckedTodos = state.todos.some((todo) => todo.check)

  const completeAll = () => {
    const complete = state.todos.map((todo) =>
      todo.check ? { ...todo, complete: !todo.complete } : todo
    )
    dispatch({ type: CHANGE_TODOS, todos: complete })
  }

  const deleteAll = () => {
    const deleteAll = state.todos.filter((todo) => !todo.check)
    dispatch({ type: CHANGE_TODOS, todos: deleteAll })
  }

  const coutnCompleteTodo = () => {
    const completeTodos = state.todos.filter((todo) => todo.complete)
    return completeTodos.length
  }

  const redactTodo = (text: string, id: string) => {
    dispatch({ type: GET_ID_CURRENT_TODO, id })
    dispatch({ type: GET_TEXT_CURRENT_TODO, text })
  }

  return (
    <div className={cls.todoList}>
      <Form />
      {state.todos.map((todo) => {
        return (
          <TodoListItem
            text={todo.text}
            id={todo.id}
            key={todo.id}
            showTime={todo.showTime}
            complete={todo.complete}
            times={todo.times}
            check={todo.check}
            redactTodo={() => redactTodo(todo.text, todo.id)}
          />
        )
      })}
      {state.showAlert ? <Alert text={'Напишите задачу'} /> : null}
      {!state.todos.length ? <Alert text={'Нет задач'} /> : null}
      {hasCheckedTodos ? (
        <div className={cls.blockButton}>
          <Button buttonTodo={false} onClick={completeAll} text={'Завершить'} />
          <Button buttonTodo={false} onClick={deleteAll} text={'Удалить'} />
        </div>
      ) : null}
      <p>Всего задач: {state.todos.length}</p>
      <p>Выполненых задач: {coutnCompleteTodo()}</p>
    </div>
  )
}

export default TodoList
