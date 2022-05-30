import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'

const FinishedTask = ({ task, onDelete }) => {
  const [ishover, setIsHover] = useState(false);
  
  return (
    <div className="task finished">
        <h3 style={{fontWeight: 'bold'}}>{task.text}
            <div onMouseEnter={() => (setIsHover(true))}
                 onMouseLeave={() => (setIsHover(false))}
            > 
                {ishover 
                  ? 
                  <FaTrashAlt style={{color: 'silver'}} onClick={() => onDelete(task)}/>
                  :   
                  <FaCheckCircle/>
                }
            </div>
        </h3>
    </div>
  )
}

export default FinishedTask