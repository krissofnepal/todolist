import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('all')

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

  const addTodo = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString()
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = (id) => {
    if (editText.trim() === '') {
      deleteTodo(id)
      return
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="app-container">
      <div className="todo-app">
        <div className="header">
          <h1>📝 My Tasks</h1>
          <p className="subtitle">Stay organized and productive</p>
        </div>

        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
            autoFocus
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <div className="stats">
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">{todos.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Active</span>
            <span className="stat-value">{activeCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="todos-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>
                {todos.length === 0
                  ? '✨ No tasks yet. Add one to get started!'
                  : `📭 No ${filter} tasks`}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="todo-checkbox"
                  />
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                  ) : (
                    <div className="todo-text-wrapper">
                      <span className="todo-text">{todo.text}</span>
                      <span className="todo-time">{todo.createdAt}</span>
                    </div>
                  )}
                </div>
                <div className="todo-actions">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="btn-save"
                        title="Save"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="btn-cancel"
                        title="Cancel"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="btn-edit"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="btn-delete"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <p>💡 Tip: Your tasks are saved automatically!</p>
        </div>
      </div>
    </div>
  )
}

export default App
