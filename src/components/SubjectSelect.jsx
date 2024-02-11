
import useAgenda from "../hooks/useContext"
export default function SubjectSelect({currentSubject, currentSubjectId, setCurrentSubjectId}) {
  
  const {subjects} = useAgenda()

  return (
    <div className='d-flex flex-column'>
        <label className='mb-1' htmlFor="subject-filter">Subject</label>
        
        <select className={`px-2 text-subject-${currentSubject.colorId}`} id="subject-filter" value={currentSubjectId} onChange={e=>setCurrentSubjectId(e.target.value)}>
          {subjects.map((subject, i)=>(
            <option key={i} className={`text-subject-${subject.colorId}`} value={subject.id}>{subject.name}</option>
          ))}
        </select>
    </div>
  )
}
