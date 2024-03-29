import ScheduleAgenda from "../components/agenda/ScheduleAgenda"
import Notes from "../components/agenda/Notes"
import Tasks from "../components/agenda/Tasks"
import useAgenda from "../hooks/useContext"

export default function Panel() {

  const {userData, notes, subjects, tasks, event, schedule} = useAgenda()

  return (
    <>
      <div className='heading-box mb-4 mt-4 ms-3 ms-md-0 mt-md-0'>
        <h2>Today</h2>
      </div>

        <ScheduleAgenda 
          subjects={subjects}
          scheduleAgenda={schedule}
        />

        <Tasks 
          tasks = {tasks}
        />


        <Notes 
          linkToNotes={true}
          notes={notes}
        />
    </>
  )
}
