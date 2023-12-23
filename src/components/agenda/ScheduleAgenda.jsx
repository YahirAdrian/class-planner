import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import ScheduleItem from "../objects/ScheduleItem"

import settingsIcon from '../../assets/icons/settings-primary.svg'
import { daysOfTheWeekEnglish } from "../../utils/constants"

export default function ScheduleAgenda({subject, subjects}) {

  let schedule, todaySchedule;
  if(subject != undefined){
    schedule = subject.schedule
  }else{
    todaySchedule = getScheduleforToday(subjects)
  }
  return (
    <section className="section-box mx-0">
      <div className="heading-box d-flex justify-content-between mb-4">
        <h3>Schedule</h3>
        <Link to='/schedule'>
          <button type='button' className='btn-link' title='Edit schedule'>
            <Image width={24} height={24} src={settingsIcon} alt="Settings icon"/>
            Edit schedule
          </button>
        </Link>
      </div>

      <div className="schedule-box">
        {
          (schedule !== undefined && schedule.length >0 )?
          schedule.map((item, i) =>(

            <ScheduleItem
              key={i}
              subject={subject}
              item={item}
            />
          ))
          :
            (todaySchedule !== undefined && todaySchedule.length >0)?
            todaySchedule.map((today, i)=>(
              <ScheduleItem
                key={i}
                subject={today.subject}
                item={today}
              />
            ))
            :
            <div className="bg-gray-100 d-flex align-items-center justify-content-center ">
              <p className="fw-bold">No classes or events scheduled for today</p>
            </div>
        }
        
      </div>
    </section>
  )
}

function getScheduleforToday(subjects){

  // Get all the schedule from all subjects
  const schedules = []
  subjects.forEach(subject =>{
    subject.schedule.forEach(item=>{
      const scheduleItem = {
        subject: subject,
        day: item.day,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd
      }

      schedules.push(scheduleItem)

    })
  })

  // Filter the schedule only for the ones of this day

  const dayOfTheWeek = new Date().getDay()
  const scheduleToday = []

  schedules.forEach(schedule=>{
    if(schedule.day === dayOfTheWeek){
      scheduleToday.push(schedule)
    }
  })




  return scheduleToday
}
