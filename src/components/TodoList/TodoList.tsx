import { useState } from 'react'
import Form from '../Form/Form'
import { TodoListItem } from './TodoListItem/TodoListItem'
import cls from './TodoList.module.css'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'

interface IProps {
  id: string;
  text: string;
  completed: boolean;
  times: string;
  check: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<IProps[]>([])

  const [todoText, setTodoText] = useState<string>('')
  const [todoAlert, setTodoAlert] = useState<boolean>(false)
  const check = todos.some((todo) => (todo.check ? true : false))

  const addNewTodo = () => {
    setTodoText('')

    const newTodo = {
      id: Math.random().toString().substring(2),
      text: todoText,
      completed: false,
      times: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      check: false,
    }

    if (!newTodo.text) {
      return setTodoAlert(true)
    } else {
      setTodoAlert(false)
    }
    setTodos([...todos, newTodo])
  }

  const checkTodo = (id: string) => {
    setTodos([
      ...todos.map((todo) =>
        id === todo.id ? { ...todo, check: !todo.check } : { ...todo }
      ),
    ])
  }

  const onClickDelete = (id: string) => {
    const currentTodo = todos.filter((todo) => todo.id !== id)
    setTodos(currentTodo)
  }

  const onClickComplete = (id: string) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ])
  }

  const completedAll = () => {
    setTodos([
      ...todos.map((todo) =>
        todo.check ? { ...todo, completed: !todo.completed } : { ...todo }
      ),
    ])
  }

  const deletedAll = () => {
    setTodos([...todos.filter((todo) => !todo.check)])
  }

  const coutnCompletedTodo = () => {
    const completedTodos = todos.filter((todo) => todo.completed)
    return completedTodos.length
  }

  return (
    <div className={cls.todoList}>
      <Form
        todoText={todoText}
        setTodoText={setTodoText}
        addNewTodo={addNewTodo}
      />
      {todos.map((todo) => {
        return (
          <TodoListItem
            text={todo.text}
            onDelete={() => onClickDelete(todo.id)}
            onComplete={() => onClickComplete(todo.id)}
            key={todo.id}
            completed={todo.completed}
            times={todo.times}
            check={todo.check}
            checkTodo={() => checkTodo(todo.id)}
          />
        )
      })}
      {todoAlert ? <Alert text={'Напишите задачу'} /> : null}
      {!todos.length ? <Alert text={'Нет задач'} /> : null}
      {check ? (
        <div className={cls.blockButton}>
          <Button
            buttonTodo={false}
            onClick={completedAll}
            text={'Завершить'}
          />
          <Button 
            buttonTodo={false} 
            onClick={deletedAll} 
            text={'Удалить'} 
          />
        </div>
      ) : null}
      <p>Всего задач: {todos.length}</p>
      <p>Выполненых задач: {coutnCompletedTodo()}</p>     
    </div>
  )
}

export default TodoList
