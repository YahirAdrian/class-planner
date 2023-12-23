import React from 'react'

export default function SubjectTab({subject, setCurrentSubjectId}) {

  return (
    <div className={`subject bg-subject-${subject.colorId}`} key={subject.id} onClick={()=> setCurrentSubjectId(subject.id)}>
        <h4 className="fs-6">{subject.name}</h4>
    </div>
  )
}
