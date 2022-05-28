import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import About from './components/About'
import Button from './components/Button'
import AddTask from './components/AddTask'


function App() {
  const [showAddTask, setShowAddTask] = useState (false)
  const [tasks, setTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])

  // Get Tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      const tempfinished = []
      const tempunfinished = []

      for (const item of tasksFromServer) {
        if(item.finished){
          tempfinished.push(item)
        } else {
          tempunfinished.push(item)
        }
      }
      setTasks(tempunfinished)
      setFinishedTasks(tempfinished)

      console.log("Fetched Tasks successfully ✅ \n")
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const data = []
    const res1 = await fetch('http://192.168.178.20:5000/tasks')
    const res2 = await fetch('http://192.168.178.20:5000/finishedTasks')
    const data1 = await res1.json()
    const data2 = await res2.json()
      
    for (const item of data1) {
        data.push(item);
    }      
    for(const item of data2) {
      data.push(item);
    }
    return data
  }

  // Fetch Task
  const fetchTask = async (task) => {
    const id = task.id
    let res
    if(task.finished) {
      res = await fetch(`http://192.168.178.20:5000/finishedTasks/${id}`)
    } else {
      res = await fetch(`http://192.168.178.20:5000/tasks/${id}`)
    }
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
  }

  // Finish Task
  const finishTask = async (task) => {
    const taskToFinish = await fetchTask(task)
    const finishedTask = { ...taskToFinish, finished: !taskToFinish.finished,
                           id: finishedTasks.indexOf(finishedTasks.length - 1) + 1}

    await fetch(`http://192.168.178.20:5000/finishedTasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(finishedTask)
    });
    
    await deleteTask(task)

    setFinishedTasks([...finishedTasks, finishedTask])
  }

  // Delete Task
  const deleteTask = async (task) => {
    const id = task.id

    if (task.finished) {
      await fetch(`http://192.168.178.20:5000/finishedTasks/${id}`, {
        method: 'DELETE'
      }) 
      setFinishedTasks(finishedTasks.filter((task) => task.id !== id))
    } 
    else {
      await fetch(`http://192.168.178.20:5000/tasks/${id}`, {
        method: 'DELETE'
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  // Toggle Reminder
  const toggleReminder = async (task) => {
    const id = task.id
    const taskToToggle = await fetchTask(task)
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


  // Function fires after Drop
  const saveDrag = async(items) => {

    for await (const task of tasks) {
      fetch(`http://192.168.178.20:5000/tasks/${task.id}`, {
        method: 'DELETE'
      })
    }

    for await (const item of items) {
      fetch('http://192.168.178.20:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      body: JSON.stringify(item)
      })
    }
    setTasks(items)
  }
  
  useEffect(() => {
    console.log("📝 Tasks was changed \n")
  }, [tasks])

  return (
    <>
      <div>
          <p style={{ textAlign: 'center', fontSize:'20vh',
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
                      {/* is planned to include multiple tasklists 
                          Tasklist will be separate component*/}
                          <div className="container">
                            
                            <Header/>

                            {tasks.length > 0 || finishedTasks.length > 0 ? (
                              <Tasks  
                                tasks={tasks} finishedTasks={finishedTasks}
                                onDragEnd={saveDrag} onDelete={deleteTask} 
                                onToggle={toggleReminder} onFinish={finishTask}
                                onAdd={() => setShowAddTask(!showAddTask)}
                                showAdd={showAddTask} onAddTask={(task) => {addTask(task); setShowAddTask(!showAddTask)}}
                                >
                              </Tasks>
                              ) : (
                              <>  
                                <p style={{marginBottom: '5px'}}>No Tasks :p</p>
                                <Button 
                                  classname={"btn btn-add"}
                                  text={showAddTask ? 'Cancel' : 'Add Task'}
                                  onClick={() => setShowAddTask(!showAddTask)}
                                  showAdd={showAddTask}
                                />
                                {showAddTask && <AddTask onAddTask={(task) => {addTask(task); setShowAddTask(!showAddTask)}} 
                                                  showAdd={showAddTask}/>}
                              </>  	
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