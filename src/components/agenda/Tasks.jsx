import Task from "../objects/Task"

export default function Tasks() {
  return (
    <section className='mt-4 border-top pt-4'>
      <div className="heading-box d-flex justify-content-between">
        <h3>Tasks</h3>
        <button type='button' className='btn-link'>+ New Task</button>
      </div>

      <div className="tasks-box mt-3  ">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </section>
  )
}
