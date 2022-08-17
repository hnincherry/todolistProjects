import React from 'react'
import { Provider } from "react-redux"
import { TodoApp } from "./features/todos/TodoApp"
import { TodoList } from "./features/todos/TodoList"
import {store} from './store'
export default App = () => {
  return(
    <Provider store={store}>
      <TodoApp/>
      <TodoList/>
    </Provider>
  )
}