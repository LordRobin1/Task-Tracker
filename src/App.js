import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'


function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])

  // Get Tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://192.168.178.20:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://192.168.178.20:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://192.168.178.20:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task) 
    })
    
    const data = await res.json()

    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://192.168.178.20:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://192.168.178.20:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)      
    })
    
    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder:
        data.reminder} : task
      )
    )
  }

  // Finish Task
  const finishTask = async (id) => {
    const taskToFinish = await fetchTask(id)
    const finishedTask = { ...taskToFinish, finished: !taskToFinish.finished}
    
    const res = await fetch(`http://192.168.178.20:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(finishedTask)
    })
    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, finished:
        data.finished} : task
      )
    )
  }

  //Save new Order after Drag
  const saveDrag = async (items) => {    
    setTasks(items)
  }
  
  return (
    <>
      <div>
          <p style={{ textAlign: 'center', fontSize: '100px',
                      fontWeight: 'bolder'}} 
          >Hello.</p>
      </div>
      <Router>
          <Routes>
              <Route 
                path='/'  
                element={
                  <div className='content'>
                      <div className='taskListSpacer'>
                          <div className="container">
                            <Header onAdd={() => setShowAddTask(!showAddTask)}
                            showAdd={showAddTask} />
                            {showAddTask && <AddTask onAdd={addTask}/>}
                            {tasks.length > 0 ? (
                            <Tasks tasks={tasks} onDragEnd={saveDrag} onDelete={deleteTask} onToggle={toggleReminder} onFinish={finishTask}/>
                            ) : (
                            "\nNo Tasks :D"
                            )}
                          </div>
                      </div>
                  </div>
                }
              />
          </Routes>
          <Routes> 
            <Route path='/about' element={<About />} />
          </Routes>
          <Footer />  
      </Router>
    </>  
  );
}

export default App;