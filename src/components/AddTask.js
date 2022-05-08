import { useState } from 'react'
import { FaCalendarDay } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [date, setDate] = useState(new Date())
  const [info, setInfo] = useState('')
  const [reminder, setReminder] = useState(false)
  const [finished, setFinished] = useState(false)
  
  //const [showCalendar, setShowCalendar] = useState(false)
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }
    
    const tempDay = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
    const tempMonth = `${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}`
    const tempYear = `${date.getFullYear()}`

    const day = `${tempDay}.${tempMonth}.${tempYear}`
    onAdd({ text, day, info, reminder, finished })
    setText('')
    setDate(new Date())
    setInfo('')
    setReminder(false)
    setFinished(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        
        <div className="form-control">
            <label>Task</label>
            <input type='text' placeholder='Add Task'
              value={text} onChange={(e) => setText(e.target.value)} 
            />
        </div>

        <div className="form-control">
            <label> Day & Time
              <FaCalendarDay 
                style={{color: 'gray', paddingLeft: '5px', cursor: 'pointer'}}
                // onClick={() => setShowCalendar(!showCalendar)}
              />                
            </label>            
            <DatePicker 
              placeholderText='Add Day & Time'
              selected={date}
              onChange={date => { setDate(date) }}
              shouldCloseOnSelect={false}
              closeOnScroll={true}
              dateFormat='dd.MM.yyyy'
            />
            <label style={{marginTop: '10px'}} > Description / Info
              <input type='text' placeholder='Description/Info' style={{marginTop: '10px'}}
                     value={info}   onChange={(e) => setInfo(e.target.value)}
              />
            </label>
        </div>

        <div className="form-control form-control-check">
            <label>Reminder</label>
            <input 
              type='checkbox'
              checked={reminder}
              value={reminder} 
              onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type='submit' value='Save Task' 
         className="btn btn-block"
        />

    </form>
  )
}

export default AddTask