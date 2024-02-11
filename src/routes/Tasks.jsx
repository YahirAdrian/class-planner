import { useEffect, useState } from 'react';
import moment from 'moment';

import SubjectSelect from '../components/SubjectSelect'
import Task from '../components/objects/Task'
import ModalForm from '../components/ModalForm'
import TaskForm from '../components/forms/TaskForm';

import useAgenda from '../hooks/useContext';

import { getParsedLS } from '../utils/functions';

import {default as TaskModel} from '../models/Task';

export default function Tasks() {
  
  const {tasks, setTasks, subjects} = useAgenda()
  // States for modal
  const [newTaskModalShow, setNewTaskModalShow] = useState(false);
  const [editTaskModalShow, setEditTaskModalShow] = useState(false)

  const allSubjects = {id:'0', colorId: '0'}
  const[taskToEdit, setTaskToEdit] = useState({})
  


  // Get the tasks from the hook

  const nextTasks = getNextTasks(tasks)
  const remainingTasks = getRemainingTasks(tasks, nextTasks)

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
              setTaskToEdit={setTaskToEdit}
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

        
        {remainingTasks.map(task=>(
          <Task 
            key={task.id}
            setEditTaskModalShow={setEditTaskModalShow}
            removeTask={removeTask}
            setTaskToEdit={setTaskToEdit}
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
          action={createTask}
          formType="create"
          />
      </ModalForm>
      
      <ModalForm 
        modalShow={editTaskModalShow}
        setModalShow={setEditTaskModalShow}
        heading="Edit task"
        >
        <TaskForm
          formType="edit"
          action={editTask}
          task={taskToEdit}
          subjectId={taskToEdit.subjectId}
         />
      </ModalForm>
    </>
  )

  // Task actions CRUD ACTIONS
  function createTask(e){
    e.preventDefault()
  
    const subjectId = e.target[0].value
    const taskName = e.target[1].value
    const deadline = e.target[2].value
    const important = e.target[3].value === 'true' ? true : false //Convert from string to boolean
  
   new TaskModel(taskName, subjectId, deadline, important).create()
  
   setTasks(getParsedLS('tasks'))
   setNewTaskModalShow(false)
   
  }
  
  function editTask(e){
    e.preventDefault()
    const subjectId = e.target[0].value
    const taskName = e.target[1].value
    const taskDue = e.target[2].value
    const taskImportance = e.target[3].value === 'true' ? true : false
    const taskId = e.target[4].value
  
    const result = TaskModel.edit(taskId, subjectId, taskName, taskDue, taskImportance)
  
    if(result){
      setTasks(getParsedLS('tasks'))
      setEditTaskModalShow(false)
    }else{
      alert(result)
    }
  }
  
  function removeTask(id){
    if(confirm('Are you sure to remove this task? This action cannot be undone')){
      const message = TaskModel.remove(id)
      if(message !== true){
        alert(message)
      }
    
      // Update list
      setTasks(getParsedLS('tasks'))
    }
  }
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

