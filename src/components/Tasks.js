import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Task from './Task'
import FinishedTask from './FinishedTask'


const Tasks = ({ tasks, onDelete, onToggle, onFinish, onDragEnd }) => {
    
    const DragEnd = (result) => {
        const items = Array.from(tasks);
        const [reorderdItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderdItem)
        
        if (result.destination == null) {
            return;
        }
        onDragEnd(items)
    }
    return (
           
        <div className='tasks'>
            {/* unfinished Tasks */}  
            <DragDropContext
                onDragEnd={DragEnd}
            >    
                <p><b>Tasks</b></p>                
                <Droppable droppableId='droppable-1'>              
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ listStyle: 'none'}}
                        >
                            {tasks.map((task, index) => {
                            return (
                                !task.finished &&
                                <Draggable  draggableId={`${task.id}`}
                                            key={task.id}
                                            index={index}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Task
                                                key={task.id}
                                                task={task}
                                                tasks={tasks}
                                                onDelete={onDelete}
                                                onToggle={onToggle}
                                                onFinish={onFinish}
                                            />
                                        </li>
                                    )}                                
                                </Draggable>
                            );
                            })}                            
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            
            {/* finished Tasks */}
            <div className='finishedTasks'>
                <p><b>Finished Tasks</b></p>
                <> 
                {tasks.map((task) => (
                    task.finished && 
                    <FinishedTask
                        key={task.id} 
                        task={task} 
                        onDelete={onDelete}
                    />     
                ))}
                </>             
            </div>
        </div>
    )
}

export default Tasks