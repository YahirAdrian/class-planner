import { useState } from 'react';

import SubjectSelect from '../components/SubjectSelect'
import Task from '../components/objects/Task'
import ModalForm from '../components/ModalForm'
import NewTaskForm from '../components/forms/NewTaskForm';

export default function Tasks() {
  const [newTaskModalShow, setNewTaskModalShow] = useState(false);
  const [editTaskModalShow, setEditTaskModalShow] = useState(false)

  const addNewTask = ()=>{
    console.log("New Task")
  }
  
  const editTask = ()=>{
    console.log("Edit Task")
    
  }
  
  const removeTask = ()=>{
    confirm("Are you sure to delete this task?")

  }

  return (
    <>
      <div className='heading-box d-flex justify-content-between mb-4'>
        <h2>Tasks</h2>
        <button type="button" className='btn btn-primary'
          onClick={()=> setNewTaskModalShow(true)}
        >+ New Task</button>
      </div>

      <section className='section-box'>
        <div className="heading-box">
          <h3>Today</h3>
        </div>

        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
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
        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
        <Task 
          setEditTaskModalShow={setEditTaskModalShow}
          removeTask={removeTask}
          />
      </section>

      <ModalForm 
        modalShow={newTaskModalShow}
        setModalShow={setNewTaskModalShow}
        heading="New task"
        action={addNewTask}
      >
        <NewTaskForm />
      </ModalForm>
      
      <ModalForm 
        modalShow={editTaskModalShow}
        setModalShow={setEditTaskModalShow}
        heading="Edit task"
        action={editTask}
      >
        <NewTaskForm />
      </ModalForm>
    </>
  )
}
