import Form from '../Form/Form'
import { TodoListItem } from './TodoListItem/TodoListItem'
import cls from './TodoList.module.css'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  ITodos,
  ID_CURRENT_TODO,
  TEXT_CURRENT_TODO,
  COMPLETE_ALL_TODOS,
  DELETE_ALL_TODOS,
} from '../../redux/toodList/types/types'

const TodoList = () => {
  const {todos, showAlert} = useSelector((state: ITodos) => state)
  const dispatch = useDispatch()

  const hasCheckedTodos = todos.some((todo) => todo.check)

  const completeAllMarkedTodos = () => {
    dispatch({ type: COMPLETE_ALL_TODOS})
  }

  const deleteAllMarkedTodos = () => {
    dispatch({ type: DELETE_ALL_TODOS })
  }

  const coutnCompleteTodo = () => {
    const completeTodos = todos.filter((todo) => todo.complete)
    return completeTodos.length
  }

  const redactTodo = (text: string, id: string) => {
    dispatch({ type: ID_CURRENT_TODO, id })
    dispatch({ type: TEXT_CURRENT_TODO, text })
  }

  return (
    <div className={cls.todoList}>
      <Form />
      {todos.map((todo) => {
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
      {showAlert ? <Alert text={'Напишите задачу'} /> : null}
      {!todos.length ? <Alert text={'Нет задач'} /> : null}
      {hasCheckedTodos ? (
        <div className={cls.blockButton}>
          <Button buttonTodo={false} onClick={completeAllMarkedTodos} text={'Завершить'} />
          <Button buttonTodo={false} onClick={deleteAllMarkedTodos} text={'Удалить'} />
        </div>
      ) : null}
      <p>Всего задач: {todos.length}</p>
      <p>Выполненых задач: {coutnCompleteTodo()}</p>
    </div>
  )
}

export default TodoList
