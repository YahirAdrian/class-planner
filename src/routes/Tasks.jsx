import { useState } from 'react';
import moment from 'moment';

import SubjectSelect from '../components/SubjectSelect'
import Task from '../components/objects/Task'
import ModalForm from '../components/ModalForm'
import TaskForm from '../components/forms/TaskForm';

import useAgenda from '../hooks/useContext';

export default function Tasks() {

  // States for modal
  const [newTaskModalShow, setNewTaskModalShow] = useState(false);
  const [editTaskModalShow, setEditTaskModalShow] = useState(false)

  // Get the tasks from the hook
  const {tasks, actions} = useAgenda()

  const nextTasks = getNextTasks(tasks)
  const remainingTasks = getRemainingTasks(tasks, nextTasks)

  // Task actions
  const addNewTask = ()=>{
    console.log("New Task")
  }
  
  const editTask = ()=>{
    console.log("Edit Task")
    
  }
  
  const removeTask = ()=>{
    confirm("Are you sure to delete this task?")

  }

  // Filter the tasks of today
  
  // Filter the tasks by subject

  return (
    <>
      <div className='heading-box d-flex justify-content-between mb-4 p-3'>
        <h2>Tasks</h2>
        <button type="button" className='btn btn-primary'
          onClick={()=> setNewTaskModalShow(true)}
        >+ New Task</button>
      </div>

      <section className='section-box'>
        <div className="heading-box">
          <h3>Next tasks</h3>
        </div>

        {tasks.length > 0 ?
          nextTasks.map(task =>(
            <Task 
              key={task.id}
              setEditTaskModalShow={setEditTaskModalShow}
              removeTask={removeTask}
              task={task}
            />
          ))
        :
          <div className="bg-gray-100 d-flex justify-content-center align-items-center p-5 rounded ">
            <p className="fw-bold fs-2">There are no tasks for the next 7 days. Hurray!</p>
          </div>
        }

        
        
      </section>

      <section className='section-box'>
        <div className="heading-box">
          <h3>All tasks</h3>
        </div>

        <div className='d-flex justify-content-end align-items-center  gap-3 mb-4'>
          <h4>Filters</h4>
          <div className='d-flex flex-column'>
            <label className='mb-2' htmlFor="order-by">Order by</label>
            <select id="order-by">
              <option value="1">Date</option>
              <option value="2">Subject</option>
              <option value="3">Importance</option>
              <option value="3">Progress</option>
            </select>
          </div>
          
          <SubjectSelect />
        </div>
        {remainingTasks.map(task=>(
          <Task 
            key={task.id}
            setEditTaskModalShow={setEditTaskModalShow}
            removeTask={removeTask}
            task={task}
            />

        ))}
        
      </section>

      <ModalForm 
        modalShow={newTaskModalShow}
        setModalShow={setNewTaskModalShow}
        heading="New task"
      >
        <TaskForm 
          action={actions.addTask}
        />
      </ModalForm>
      
      <ModalForm 
        modalShow={editTaskModalShow}
        setModalShow={setEditTaskModalShow}
        heading="Edit task"
        action={editTask}
      >
        <TaskForm />
      </ModalForm>
    </>
  )
}

function getNextTasks(tasks){
  // Get tasks for the next 7 days
  const nextTasks = []
  const today = moment()

  tasks.map(task=>{
    const taskDate = moment(task.deadline)
    const difference = moment.duration(taskDate.diff(today))._data.days
  
    if(difference > 0 && difference <=7){
      nextTasks.push(task)
    }
  })

  return nextTasks;
}

function getRemainingTasks(tasks, nextTasks){
  // Use a Set to store unique objects from array2
  const uniqueObjects = new Set(nextTasks.map(JSON.stringify));

  // Filter out objects from array1 that are present in the uniqueObjects set
  const resultArray = tasks.filter(obj => !uniqueObjects.has(JSON.stringify(obj)));


  return resultArray;
}