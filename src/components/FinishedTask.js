import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'

const FinishedTask = ({ task, onDelete }) => {
  const [ishover, setIsHover] = useState(false);
  
  return (
    <div className="task finished">
        <h3>{task.text}
            <div onMouseEnter={() => (setIsHover(true))}
                 onMouseLeave={() => (setIsHover(false))}
            > 
                {ishover 
                  ? 
                  <FaTrashAlt style={{color: 'gray'}} onClick={() => onDelete(task.id)}/>
                  :   
                  <FaCheckCircle style={{color: '#ef579a'}} />
                }
            </div>
        </h3>
    </div>
  )
}

export default FinishedTask