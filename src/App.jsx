import { useState, useEffect } from 'react'
import './App.css'

const FREQUENCIES = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [repeating, setRepeating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [editFrequency, setEditFrequency] = useState('daily')
  const [editRepeating, setEditRepeating] = useState(false)
  const [filter, setFilter] = useState('all')
  const [freqFilter, setFreqFilter] = useState('all')
  const [repeatFilter, setRepeatFilter] = useState('all')

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
      frequency,
      repeating,
      createdAt: new Date().toLocaleString(),
      history: [],
      lastCompletedAt: null,
    }

    setTodos([newTodo, ...todos])
    setInput('')
    setFrequency('daily')
    setRepeating(false)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      const now = new Date().toLocaleString()
      const completed = !todo.completed
      if (completed) {
        const history = Array.isArray(todo.history) ? [...todo.history, now] : [now]
        return { ...todo, completed: true, history, lastCompletedAt: now }
      }
      // if unchecking, keep history but flip completed flag
      return { ...todo, completed: false }
    }))
  }

  const startEdit = (id, text, freq, isRepeating) => {
    setEditingId(id)
    setEditText(text)
    setEditFrequency(freq || 'daily')
    setEditRepeating(Boolean(isRepeating))
  }

  const saveEdit = (id) => {
    if (editText.trim() === '') {
      deleteTodo(id)
      return
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText, frequency: editFrequency, repeating: editRepeating } : todo
    ))
    setEditingId(null)
    setEditText('')
    setEditRepeating(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
    setEditFrequency('daily')
  }

  // Filter todos based on selected completion, frequency and repeating filters
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false
    if (filter === 'completed' && !todo.completed) return false
    if (freqFilter !== 'all' && todo.frequency !== freqFilter) return false
    if (repeatFilter === 'repeating' && !todo.repeating) return false
    if (repeatFilter === 'non-repeating' && todo.repeating) return false
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  // counts per frequency
  const freqCounts = FREQUENCIES.reduce((acc, f) => {
    acc[f] = todos.filter(t => t.frequency === f).length
    return acc
  }, {})

  const repeatingCount = todos.filter(t => t.repeating).length

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
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="freq-select"
            aria-label="Select frequency"
          >
            {FREQUENCIES.map(f => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>
          <label className="repeat-label">
            <input
              type="checkbox"
              checked={repeating}
              onChange={(e) => setRepeating(e.target.checked)}
            />
            <span>Repeats</span>
          </label>
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

        <div className="filters-row">
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

          <div className="freq-filters">
            <button
              className={`filter-btn ${freqFilter === 'all' ? 'active' : ''}`}
              onClick={() => setFreqFilter('all')}
            >
              All
            </button>
            {FREQUENCIES.map(f => (
              <button
                key={f}
                className={`filter-btn ${freqFilter === f ? 'active' : ''}`}
                onClick={() => setFreqFilter(f)}
                title={`${f.charAt(0).toUpperCase() + f.slice(1)} (${freqCounts[f] || 0})`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <div className="repeat-filters">
              <button
                className={`filter-btn ${repeatFilter === 'all' ? 'active' : ''}`}
                onClick={() => setRepeatFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${repeatFilter === 'repeating' ? 'active' : ''}`}
                onClick={() => setRepeatFilter('repeating')}
                title={`Repeating (${repeatingCount})`}
              >
                Repeating
              </button>
              <button
                className={`filter-btn ${repeatFilter === 'non-repeating' ? 'active' : ''}`}
                onClick={() => setRepeatFilter('non-repeating')}
                title={`Non-repeating (${todos.length - repeatingCount})`}
              >
                Non-repeating
              </button>
            </div>
          </div>
        </div>

        <div className="todos-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>
                {todos.length === 0
                  ? '✨ No tasks yet. Add one to get started!'
                  : `📭 No matching tasks`}
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
                    <div className="edit-row">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                        autoFocus
                      />
                      <select
                        value={editFrequency}
                        onChange={(e) => setEditFrequency(e.target.value)}
                        className="freq-select"
                        aria-label="Edit frequency"
                      >
                        {FREQUENCIES.map(f => (
                          <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                        ))}
                      </select>
                      <label className="repeat-label edit-repeat">
                        <input
                          type="checkbox"
                          checked={editRepeating}
                          onChange={(e) => setEditRepeating(e.target.checked)}
                        />
                        <span>Repeats</span>
                      </label>
                    </div>
                  ) : (
                    <div className="todo-text-wrapper">
                      <div className="text-and-badge">
                        <span className="todo-text">{todo.text}</span>
                        <span className={`freq-badge freq-${todo.frequency}`}>{todo.frequency.charAt(0).toUpperCase() + todo.frequency.slice(1)}</span>
                        {todo.repeating ? <span className="repeat-badge">Repeats</span> : null}
                      </div>
                      <span className="todo-time">{todo.createdAt}</span>
                      {todo.history && todo.history.length > 0 ? (
                        <span className="todo-complete-info">Completed {todo.history.length} time{todo.history.length>1? 's':''} • {todo.lastCompletedAt}</span>
                      ) : null}
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
                        onClick={() => startEdit(todo.id, todo.text, todo.frequency)}
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
          <p>💡 Tip: Use frequency filters to focus on Daily, Weekly, Monthly, Quarterly or Yearly tasks.</p>
        </div>
      </div>
    </div>
  )
}

export default App
