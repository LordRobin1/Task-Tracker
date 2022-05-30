import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router-dom'
import Task from './Task'
import FinishedTask from './FinishedTask'
import AddTask from './AddTask'
import Button from './Button'


const Tasks = ({ tasks, finishedTasks, onDelete, onToggle, onFinish, onDragEnd, showAdd, onAdd, onAddTask }) => {
    
    const location = useLocation();

    const DragEnd = (result) => {
        const items = Array.from(tasks);
        const [reorderdItem] = items.splice(result.source.index, 1);
        
        try {
            items.splice(result.destination.index, 0, reorderdItem);
        }
        catch (TypeError) {
            console.warn("TypeError: result.destination null \n\nMake sure to drag the taskelement into another list");
            return;
        }
        // items.forEach(item => {
        //     item.id = items.indexOf(item) + 1;
        // });
        onDragEnd(items);
    }

    return (
           
        <div className='tasks'>
            {/* unfinished Tasks */}  
            <DragDropContext
                onDragEnd={DragEnd}
            >    
                <p style={{fontStyle: 'italic', fontSize: '1.3rem'}}
                >Tasks</p>
                <Droppable droppableId='droppable-1'>
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={tasks.length > 0 ? { listStyle: 'none' } : { margin: '5px 0' }}
                        >
                            {tasks.length > 0 ? 
                                (tasks.map((task, index) => {
                                return (
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
                                                    onDelete={onDelete}
                                                    onToggle={onToggle}
                                                    onFinish={onFinish}
                                                />
                                            </li>
                                        )}                                
                                    </Draggable>
                                );
                                })) : ''}
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
            {showAdd && <AddTask onAddTask={onAddTask} showAdd={showAdd}/>}

            {/* finished Tasks */}
            <div className='finishedTasks'>
                <p style={{fontStyle: 'italic', fontSize: '1.3rem'}}
                >Finished Tasks</p>
                <> 
                {finishedTasks.map((task) => (
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