import './App.css'
import TodoList from './components/TodoList/TodoList'
import { Provider } from 'react-redux'
import { store } from './redux/toodList/store/reducer'

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
