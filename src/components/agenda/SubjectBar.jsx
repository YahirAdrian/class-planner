import SubjectTab from "../objects/SubjectTab"

export default function SubjectBar({subjects, currentSubjectId, setCurrentSubjectId}) {
  return (
      <aside className="position-sticky ">

        {
          subjects.length >0 ?
          subjects.map(subject =>(
            <SubjectTab
            key={subject.id}
              subject={subject}
              setCurrentSubjectId={setCurrentSubjectId}
            />
          ))
          :
          <div className="bg-gray-100 d-flex justify-content-center align-items-center p-5 rounded ">
            <p className="fw-bold fs-2">There aren't any notes yet. Start creating a new one.</p>
          </div>
        }
        

      </aside>
  )
}
