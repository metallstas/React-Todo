import Button from '../../Button/Button'
import cls from './TodoListItem.module.css'
import { useState } from 'react'

interface IProps {
  text: string;
  onDelete: () => void;
  onComplete: () => void;
  complete: boolean;
  times: string;
  check: boolean;
  checkTodo: () => void;
  redactTodo: () => void;
}

export const TodoListItem = (props: IProps) => {
  const { text, onDelete, onComplete, complete, times, check, checkTodo, redactTodo } = props
  const completeTodo = complete ? cls.complete : cls.todoItem
  const [showTime, setShowTime] = useState<boolean>(false)

  const showTodo = () => {
    setShowTime(!showTime)
  }

  return (
    <div className={cls.todoItem}>
      <Button 
        buttonTodo={true} 
        text='&#10004;' 
        onClick={onComplete} 
      />
      <div>
        <p className={completeTodo} onClick={showTodo}>
          {text}
        </p>
        {showTime ? <p className={cls.time}>Создано: {times}</p> : null}
      </div>
      <Button 
        text='&#9998;'
        buttonTodo={true}
        onClick={redactTodo}  
      />
      <input type='checkbox' checked={check} onChange={checkTodo} />
      <Button 
        buttonTodo={true} 
        text='&#10005;' 
        onClick={onDelete} 
      />
    </div>
  )
}
