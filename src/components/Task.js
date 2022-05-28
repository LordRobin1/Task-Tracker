import { useState } from 'react'
import { FaTrashAlt, FaCheck, FaCalendarDay, FaInfoCircle } from 'react-icons/fa'

const Task = ({task, onDelete, onToggle, onFinish }) => {
  const [scale1, setScale1] = useState('1.3')
  const [scale2, setScale2] = useState('1.3')

  return (
      <div
            className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={() => onToggle(task)}
      >     
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>

            {/* taskcontent */}
            <div>
                <h3>{task.text}</h3>

                <div style={{ display: 'flex', margin: '5px 0'}}>
                    <div>
                        <FaCalendarDay className='icon'/>
                    </div>
                    <div style={{ marginLeft: '3px'}}>
                        {task.day}
                    </div>
                </div>

                <div style={{ display: 'flex'}}>
                    <div style={{ verticalAlign: 'top', marginTop: '2px'}}>
                      <FaInfoCircle className='icon'/>
                    </div>                        
                    <div style={{ marginLeft: '3px', maxWidth: '320px'}}>
                      {task.info}
                    </div>
                </div>
            </div>

            {/* taskicons */}
            <div style={{ width: '7%', marginLeft: '10px'}}> 
                <FaCheck
                  onMouseEnter={() => setScale1('1.425')}
                  onMouseLeave={() => setScale1('1.3')}
                  
                  style={{ scale: scale1, margin: '10px auto' }}
                  className='icon'
                  onClick={() => onFinish(task)}
                />
                <FaTrashAlt
                  onMouseEnter={() => setScale2('1.4')}
                  onMouseLeave={() => setScale2('1.3')}

                  style={{  scale: scale2, margin: '10px auto' }}
                  className='icon'
                  onClick={() => onDelete(task)}
                />
            </div>
        </div>
      </div>
  )
}

export default Task