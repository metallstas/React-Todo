import { useState } from 'react'
import Form from '../Form/Form'
import { TodoListItem } from './TodoListItem/TodoListItem'
import cls from './TodoList.module.css'
import Alert from '../Alert/Alert'

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: '0',
      text: 'Написать список задач',
      completed: false,
    },
  ])

  const [todoText, setTodoText] = useState('')
  const [todoAlert, setTodoAlert] = useState(false)

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

  const addNewTodo = () => {
    setTodoText('')

    const newTodo = {
      id: Math.random().toString().substring(2),
      text: todoText,
      completed: false,
    }
    if (!newTodo.text) {
      return setTodoAlert(true)
    } else {
      setTodoAlert(false)
    }
    setTodos([...todos, newTodo])
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
          />
        )})}
      {todoAlert ? <Alert text={'Напишите задачу'} /> : null}
      {!todos.length ? <Alert text={'Нет задач'} /> : null}
    </div>
  )
}

export default TodoList
