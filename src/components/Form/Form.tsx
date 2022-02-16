import Input from '../Input/Input'
import Button from '../Button/Button'
import cls from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_TEXT_TODO,
  ADD_TODO,
  ALERT,
  CHANGE_TODOS,
  GET_TEXT_CURRENT_TODO,
  ITodos,
} from '../../redux/toodList/types/types'

const Form = () => {
  const state = useSelector((state: ITodos) => state)

  const dispatch = useDispatch()

  const currentValue = () => {
    if (state.currentRedactTodoText) {
      return state.currentRedactTodoText
    }

    return state.textTodo
  }

  const newTodo = {
    id: Math.random().toString().substring(2),
    text: state.textTodo,
    complete: false,
    times: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    check: false,
    showTime: false,
  }

  const handleTodoText = (text: string) => {
    if (state.currentRedactTodoText) {
      dispatch({ type: GET_TEXT_CURRENT_TODO, text: text })
      return
    }
    dispatch({ type: ADD_TEXT_TODO, textTodo: text })
  }

  const addNewTodo = () => {
    if (state.currentRedactTodoText) {
      const redactTodo = state.todos.map((todo) =>
        todo.id === state.currentRedactTodoId
          ? { ...todo, text: state.currentRedactTodoText }
          : todo
      )
      dispatch({type: CHANGE_TODOS, todos: redactTodo})
      return 
    }

    if (state.textTodo) {
      dispatch({ type: ADD_TODO, todo: newTodo })
      dispatch({ type: ALERT, showAlert: false })
      return
    }
    dispatch({ type: ALERT, showAlert: true })
  }

  return (
    <div className={cls.form}>
      <Input
        value={currentValue()}
        onChange={(e) => handleTodoText(e.target.value)}
      />
      <Button buttonTodo={false} text='Добавить' onClick={addNewTodo} />
    </div>
  )
}

export default Form
