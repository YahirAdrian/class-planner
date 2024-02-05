import { useState } from "react"

import { Form } from "react-bootstrap"
import { daysOfTheWeekEnglish } from "../../utils/constants"

import useAgenda from "../../hooks/useContext"


export default function EditScheduleForm({currentSubject}) {

  const {schedule} = useAgenda()
  const scheduleOfSubject = schedule.filter(item => item.subjectId === currentSubject.id)

  const arrangedSchedule = arrangeScheduleByDay(scheduleOfSubject)
  let currentDay = 0
  const initialLine = [[{
    scheduleId: "",
    subjectId: "1",
    dayOfWeek: 0,
    timeStart: "7:00",
    timeEnd: "9:00"
  }],
  [], [], [], [], [], []]

  const initialState = [[{
    scheduleId: '',
    dayOfWeek: '0',
    timeStart: '00:00',
    timeEnd: '00:00'
  }],
  [], [], [], [], [], []];

  const scheduleLines = getScheduleLines(arrangedSchedule)
  const [formLines, setFormLines] = useState(isScheduleEmpty(scheduleLines) ? initialLine : scheduleLines)
  const [color, setColor] = useState('red')
  // TODO: Create a dynamic states for the form like I did with the form lines
  return (
    <Form> 
      {
        formLines.map((lineDay, day)=>{
          // Get the lines from each day
          if(lineDay.length >=1){
            // If there's at least one element in that day
            const content = lineDay.map((scheduleItem, itemIndex)=>{
              return(
                <Form.Group key={scheduleItem.scheduleId} className="pb-3 border-bottom border-2">
                  <Form.Select value={formLines[day][itemIndex].dayOfWeek} onChange={(e)=> handleChange('dayOfWeek', e.target.value, day, itemIndex)}>
                    {
                      daysOfTheWeekEnglish.map((day,i)=>(
                        <option key={i} value={i}>{day}</option>
                      ))
                    }
                  </Form.Select>
                  <div className='d-flex align-items-center gap-2 mt-3'>
                    <Form.Control type="time" value={formLines[day][itemIndex].timeStart} onChange={(e)=> handleChange('timeStart', e.target.value, day, itemIndex)}/>
                    <span>-</span>
                    <Form.Control type="time" value={formLines[day][itemIndex].timeEnd} onChange={(e)=> handleChange('timeEnd', e.target.value, day, itemIndex)}/>
                    <input type="hidden" value={formLines[day][itemIndex].scheduleId} readOnly/>
                  </div>
                  <textarea value={color} readOnly cols={30} rows={10}></textarea>
              </Form.Group>
              )
            })
            return content
          }
        })
      }
  
      <div className="d-flex justify-content-end mt-3">
          <button className='btn btn-link me-2' type='button' onClick={()=> setFormLines( [...formLines, {}] )}>Add schedule day</button>
          <button type="button" className="btn btn-danger text-white btn-sm me-2">Clear schedule</button>
      </div>
    </Form>
  )

  function handleChange(formElement, value, day, itemIndex){
    const newState = formLines
    newState[day][itemIndex][formElement] = value
    setFormLines(newState)
    setColor('blue')
    console.log('Evento ', formLines)
  }

  function arrangeScheduleByDay(schedule){
    schedule.sort((a,b)=>{
      return a.day - b.day
    })

    return schedule
  }

  function getScheduleLines(schedule){
    let lines = [];
    const scheduleDay = sortEventsByDay(schedule)
    scheduleDay.forEach(item =>{
      // Create an object for form lines
      if(item.length <=0){
        lines.push([])
      }else{
        let scheduleOfDay = []
        // Iterate the array bidemensionally if there are elements of that day
        const dayLines = item.map(line=> {
          scheduleOfDay.push({
            scheduleId: line.id,
            subjectId: line.subjectId,
            dayOfWeek: line.dayOfWeek,
            timeStart: line.timeStart,
            timeEnd: line.timeEnd
          })
        })

        lines.push(scheduleOfDay)
      }
    })
    return lines
  }
  
  function sortEventsByDay(schedule){
    // Order by day the array will end in arrays by days e.g. [ [{monday}, {monday}], [{tuesday}], [{wednesday}]]
    // Initialize an array to store events for each day
    const sortedEvents = [[], [], [], [], [], [], []];

    // Loop through the events and distribute them into the corresponding day arrays
    schedule.forEach(event => {
        const day = event.dayOfWeek;
        sortedEvents[day].push(event);
    });

    return sortedEvents;
  }

  function isScheduleEmpty(schedule){
    let events = 0;
    schedule.forEach(day=>{
      if(day.length >= 1){
        events+= day.length
      }
    })

    // Returns true if the schedule is empty
    return events <=0 ? true : false
  }
}
