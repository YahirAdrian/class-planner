import React from 'react'

export default function ScheduleItem() {
  return (
    <div className='schedule-item bg-subject-1 mb-3 d-flex p-3 justify-content-between align-items-center'>
      <p className="subject-name mb-0">Subject 1</p>

      <div className='me-xl-5 d-flex flex-column flex-md-row '>
        <span>Monday</span>
        <span className="bullet mx-2 d-none d-md-block">o</span>
        <span> 7:00 - 9:00</span>
      </div>
    </div>
  )
}
