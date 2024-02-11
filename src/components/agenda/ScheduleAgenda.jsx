import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import ScheduleItem from "../objects/ScheduleItem"

import settingsIcon from '../../assets/icons/settings-primary.svg'
import editIcon from '../../assets/icons/edit.svg'

import { daysOfTheWeekEnglish } from "../../utils/constants"
import useAgenda from "../../hooks/useContext"

export default function ScheduleAgenda({subject, subjects, setModalScheduleShow, scheduleAgenda}) {
  const {subjects : subjectList} = useAgenda()

  let schedule, todaySchedule;
  if(subject != undefined){
    // If it comes from schedule page (/schedule)
    const scheduleForSubject = scheduleAgenda
    schedule = scheduleAgenda.filter(item => (item.subjectId === subject.id))
  }else{
    todaySchedule = getScheduleforToday(scheduleAgenda)
  }
  return (
    <section className="section-box mx-0">
      <div className="heading-box d-flex justify-content-between mb-4">
        <h3>Schedule</h3>
        <Link to='/schedule'>

            {setModalScheduleShow === undefined ? 
              <button type='button' className='btn-link' title='Edit schedule'>
                <Image width={24} height={24} src={settingsIcon} alt="Settings icon"/>
                Edit schedule
              </button>
              :
              <button type="button" className='btn-link bg-transparent  ' title='Edit schedule for subject 1' onClick={()=> setModalScheduleShow(true)}>
                <Image width={24} height={24} src={editIcon} alt='Edit icon' />
              </button>
            }
        </Link>
      </div>

      <div className="schedule-box">
        {
          (schedule != undefined && schedule.length >0 )?
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
            <p className="fw-bold fs-3 p-5">No schedule defined for today</p>
          </div>
        }
        
      </div>
    </section>
  )

  function getScheduleforToday(schedule){

    
  
    // Get all the schedule from all subjects
    const scheduleItems = []
    schedule.forEach(item=>{
      const scheduleItem = {
        id: item.id,
        subject: subjectList.filter(subject =>(item.subjectId === subject.id))[0],
        dayOfWeek: item.dayOfWeek,
        timeStart: item.timeStart,
        timeEnd: item.timeEnd
      }
  
      scheduleItems.push(scheduleItem)
  
    })
  
    // Filter the schedule only for the ones of this day
  
    const dayOfTheWeek = new Date().getDay()-1
    const scheduleToday = scheduleItems.filter(item=> (item.dayOfWeek == dayOfTheWeek))
    return scheduleToday
  }
}

