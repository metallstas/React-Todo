import Button from '../../Button/Button'
import cls from './TodoListItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_TODOS, ITodos } from '../../../redux/toodList/types/types'

interface IProps {
  id: string;
  text: string;
  complete: boolean;
  times: string;
  check: boolean;
  showTime: boolean;
  redactTodo: () => void
}

export const TodoListItem = ({
  id,
  text,
  complete,
  times,
  check,
  redactTodo,
  showTime,
}: IProps) => {
  const completeTodo = complete ? cls.complete : cls.todoItem

  const state = useSelector((state: ITodos) => state)
  const dispatch = useDispatch()

  const checkTodo = (id: string) => {
    const isCheckboxTodo = state.todos.map((todo) =>
      id === todo.id ? { ...todo, check: !todo.check } : todo
    )
    dispatch({ type: CHANGE_TODOS, todos: isCheckboxTodo })
  }

  const onClickDeleteTodo = (id: string) => {
    const currentTodo = state.todos.filter((todo) => todo.id !== id)
    dispatch({ type: CHANGE_TODOS, todos: currentTodo })
  }

  const onClickCompleteTodo = (id: string) => {
    const completeTodo = state.todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    )
    dispatch({ type: CHANGE_TODOS, todos: completeTodo })
  }

  const showTodo = (id: string) => {
    const showTime = state.todos.map((todo) =>
      todo.id === id ? { ...todo, showTime: !todo.showTime } : todo
    )
    dispatch({ type: CHANGE_TODOS, todos: showTime })
  }

  return (
    <div className={cls.todoItem}>
      <Button
        buttonTodo={true}
        text='&#10004;'
        onClick={() => onClickCompleteTodo(id)}
      />
      <div>
        <p className={completeTodo} onClick={() => showTodo(id)}>
          {text}
        </p>
        {showTime ? <p className={cls.time}>Создано: {times}</p> : null}
      </div>
      <Button text='&#9998;' buttonTodo={true} onClick={redactTodo} />
      <input type='checkbox' checked={check} onChange={() => checkTodo(id)} />
      <Button
        buttonTodo={true}
        text='&#10005;'
        onClick={() => onClickDeleteTodo(id)}
      />
    </div>
  )
}
