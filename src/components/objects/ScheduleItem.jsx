import React from 'react'


import { daysOfTheWeekEnglish } from '../../utils/constants'

export default function ScheduleItem({item, subject}) {
  return (
    <div className={`schedule-item bg-subject-${subject.id} mb-3 d-flex p-3 justify-content-between align-items-center`}>
      <p className="subject-name mb-0">{subject.name}</p>

      <div className='me-xl-5 d-flex flex-column flex-md-row '>
        <span>{daysOfTheWeekEnglish[item.day-1]}</span>
        <span className="bullet mx-2 d-none d-md-block">o</span>
        <span> {item.timeStart} - {item.timeEnd}</span>
      </div>
    </div>
  )
}
