import Button from "../../Button/Button"
import cls from './TodoListItem.module.css'

interface IProps {
  text: string;
  onDelete: () => void;
  onComplete: () => void;
  completed: boolean;
}

export const TodoListItem = ({text, onDelete, onComplete, completed}: IProps) => {
  const completedTodo = completed ? cls.completed : cls.todoItem
  return (
    <div className={cls.todoItem}>
      <Button buttonTodo={true} text='&#10004;' onClick={onComplete} />
      <p className={completedTodo}>{text}</p>
      <Button buttonTodo={true} text='&#10005;' onClick={onDelete} />
    </div>
  )
}
