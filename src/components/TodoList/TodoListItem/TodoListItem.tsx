import Button from '../../Button/Button'
import cls from './TodoListItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  CHECK_TODO,
  COMPLETE_TODO,
  SHOW_TODO_TIME,
} from '../../../redux/toodList/types/types'
import { deleteTodo } from '../../../redux/toodList/store/actions/todosActions'

interface IProps {
  id: string;
  text: string;
  complete: boolean;
  times: string;
  check: boolean;
  showTime: boolean;
  redactTodo: () => void;
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

  const dispatch = useDispatch()

  const checkTodo = (id: string) => {
    dispatch({ type: CHECK_TODO, id })
  }

  const onClickDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const onClickCompleteTodo = (id: string) => {
    dispatch({ type: COMPLETE_TODO, id })
  }

  const showTodoTime = (id: string) => {
    dispatch({ type: SHOW_TODO_TIME, id })
  }

  return (
    <div className={cls.todoItem}>
      <Button
        buttonTodo={true}
        text='&#10004;'
        onClick={() => onClickCompleteTodo(id)}
      />
      <div>
        <p className={completeTodo} onClick={() => showTodoTime(id)}>
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
