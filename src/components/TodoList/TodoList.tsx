import { useState } from 'react'
import Form from '../Form/Form'
import { TodoListItem } from './TodoListItem/TodoListItem'
import cls from './TodoList.module.css'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'

interface IProps {
  id: string;
  text: string;
  complete: boolean;
  times: string;
  check: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<IProps[]>([])

  const [todoText, setTodoText] = useState<string>('')
  const [todoAlert, setTodoAlert] = useState<boolean>(false)
  const [redactTextId, setRedactTextId] = useState<string>('')
  const hasCheckedTodos = todos.some(todo => todo.check)

  const addNewTodo = () => {
    setTodoText('')

    if (redactTextId) {
      setTodos([
        ...todos.map(todo =>
          todo.id === redactTextId ? { ...todo, text: todoText } : todo
        ),
      ])

      return setRedactTextId('')
    }

    const newTodo = {
      id: Math.random().toString().substring(2),
      text: todoText,
      complete: false,
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
        id === todo.id ? { ...todo, check: !todo.check } : todo
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
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      ),
    ])
  }

  const completeAll = () => {
    setTodos([
      ...todos.map((todo) =>
        todo.check ? { ...todo, complete: !todo.complete } : todo
      ),
    ])
  }

  const deleteAll = () => {
    setTodos([...todos.filter((todo) => !todo.check)])
  }

  const coutnCompleteTodo = () => {
    const completeTodos = todos.filter((todo) => todo.complete)
    return completeTodos.length
  }

  const redactTodo = (text: string, id: string) => {
    setRedactTextId(id)
    setTodoText(text)
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
            complete={todo.complete}
            times={todo.times}
            check={todo.check}
            checkTodo={() => checkTodo(todo.id)}
            redactTodo={() => redactTodo(todo.text, todo.id)}
          />
        )
      })}
      {todoAlert ? <Alert text={'Напишите задачу'} /> : null}
      {!todos.length ? <Alert text={'Нет задач'} /> : null}
      {hasCheckedTodos ? (
        <div className={cls.blockButton}>
          <Button
            buttonTodo={false}
            onClick={completeAll}
            text={'Завершить'}
          />
          <Button 
            buttonTodo={false} 
            onClick={deleteAll} 
            text={'Удалить'} 
          />
        </div>
      ) : null}
      <p>Всего задач: {todos.length}</p>
      <p>Выполненых задач: {coutnCompleteTodo()}</p>
    </div>
  )
}

export default TodoList
