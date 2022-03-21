import Input from '../Input/Input'
import Button from '../Button/Button'
import cls from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_TEXT_TODO,
  ADD_TODO,
  ALERT,
  TEXT_CURRENT_TODO,
  ITodos,
  REDACT_TODO,
} from '../../redux/toodList/types/types'

const Form = () => {
  const { textTodo, currentRedactTodoText} = useSelector((state: ITodos) => state)

  const dispatch = useDispatch()

  const newTodo = {
    id: Math.random().toString().substring(2),
    text: textTodo,
    complete: false,
    times: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    check: false,
    showTime: false,
  }

  const handleTodoText = (text: string) => {
    if (currentRedactTodoText) {
      dispatch({ type: TEXT_CURRENT_TODO, text })
      return
    }
    dispatch({ type: ADD_TEXT_TODO, textTodo: text })
  }

  const addNewTodo = () => {
    if (currentRedactTodoText) {
      dispatch({type: REDACT_TODO})
      return 
    }

    if (textTodo) {
      dispatch({ type: ADD_TODO, textTodo })
      dispatch({ type: ALERT, showAlert: false })
      return
    }
    dispatch({ type: ALERT, showAlert: true })
  }

  return (
    <div className={cls.form}>
      <Input
        value={currentRedactTodoText || textTodo}
        onChange={(e) => handleTodoText(e.target.value)}
      />
      <Button buttonTodo={false} text='Добавить' onClick={addNewTodo} />
    </div>
  )
}

export default Form
