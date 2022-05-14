import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router-dom'
import Task from './Task'
import FinishedTask from './FinishedTask'
import AddTask from './AddTask'
import Button from './Button'


const Tasks = ({ tasks, onDelete, onToggle, onFinish, onDragEnd, showAdd, onAdd, onAddTask }) => {
    
    const location = useLocation()

    const DragEnd = (result) => {
        const items = Array.from(tasks);
        const [reorderdItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderdItem);
        
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
            
            {location.pathname === '/' && (
                <Button 
                    classname={"btn btn-add"}
                    text={showAdd ? 'Cancel' : 'Add Task'}
                    onClick={onAdd}
                    showAdd={showAdd}
                />
            )}
            {showAdd && <AddTask onAddTask={onAddTask}/>}

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