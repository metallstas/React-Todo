import Input from '../Input/Input'
import Button from '../Button/Button'
import cls from'./Form.module.css'

interface IProps {
  todoText: string;
  setTodoText: (text: string) => void;
  addNewTodo: () => void;
}

const Form = ({todoText, setTodoText, addNewTodo}: IProps) => {
  return (
    <div className={cls.Form}>
      <Input value={todoText} onChange={(e) => {setTodoText(e.target.value)}} />
      <Button buttonTodo={false} text='Добавить' onClick={addNewTodo} />
    </div>
  )
}

export default Form
