import { useState, useEffect } from 'react'
import './App.css'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle complete status
  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Start editing
  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditValue(text)
  }

  // Save edit
  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditValue('')
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const activeTodos = todos.filter(todo => !todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              ✨ Todo App
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {activeTodos} {activeTodos === 1 ? 'task' : 'tasks'} remaining
            </p>
          </div>

          {/* Add Todo Form */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg">No tasks yet. Add one above! 📝</p>
              </div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${todo.completed
                      ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                    }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  />

                  {/* Todo Text or Edit Input */}
                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                        className="flex-1 px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-indigo-600"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`flex-1 ${todo.completed
                          ? 'line-through text-gray-500 dark:text-gray-400'
                          : 'text-gray-800 dark:text-white'
                        }`}
                    >
                      {todo.text}
                    </span>
                  )}

                  {/* Action Buttons */}
                  {editingId !== todo.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Clear Completed Button */}
          {todos.some(todo => todo.completed) && (
            <button
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              className="mt-6 w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Clear Completed Tasks
            </button>
          )}
        </div>
      </div>
    </div>
  )
}