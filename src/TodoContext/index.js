import React from 'react'
import { useLocalStorage } from './useLocalStorage'

const TodoContext = React.createContext()

function  TodoProvider(props) {

    const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', [])
  
    const [search, setSearch] = React.useState('')
  
    const completedTodos = todos.filter( todo => todo.completed === true).length
    const totalTodos = todos.length
    
    let searchedTodos = []
    // const searchedTodos = todos.map( todo => todo.text.includes(search) )
  
    if (!search.length >= 1) {
      searchedTodos = todos
    }else{
      searchedTodos = todos.filter( todo => {
        const todoText = todo.text.toLowerCase()
        const searchText = search.toLowerCase()
        return todoText.includes(searchText)
      })
    }
  
    const completeTodo = (text) => {
      const todoIndex = todos.findIndex( todo => todo.text === text)
      const newTodos = [...todos]
      newTodos[todoIndex].completed = true
      saveTodos(newTodos) 
    }
  
    const deleteTodo = (text) => {
      const todoIndex = todos.findIndex( todo => todo.text === text)
      const newTodos = [...todos]
      newTodos.splice(todoIndex, 1)
      saveTodos(newTodos) 
    }

    return (
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            search,
            setSearch,
            searchedTodos,
            completeTodo,
            deleteTodo
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }