import { useEffect, useState } from "react"

import { Form } from "react-bootstrap"
import { daysOfTheWeekEnglish } from "../../utils/constants"

import useAgenda from "../../hooks/useContext"
import { generateId, getParsedLS, updateLS } from "../../utils/functions"
import Schedule from "../../models/Schedule"


export default function EditScheduleForm({currentSubject, setModalShow}) {

  const {schedule, setSchedule} = useAgenda()
  const scheduleOfSubject = schedule.filter(item => item.subjectId === currentSubject.id)

  const arrangedSchedule = arrangeScheduleByDay(scheduleOfSubject)
  let currentDay = 0
  const initialLine = [[{
    id: generateId('subject'),
    subjectId: currentSubject.id,
    dayOfWeek: "0",
    timeStart: "",
    timeEnd: ""
  }],
  [], [], [], [], [], []]

  
  const scheduleLines = getScheduleLines(arrangedSchedule)
  const [generatedLines, setGeneratedLines] = useState(0)
  const [formLines, setFormLines] = useState(isScheduleEmpty(scheduleLines) ? initialLine : scheduleLines)

  return (
    <Form> 
      {
        formLines.map((lineDay, day)=>{
          // Get the lines from each day
          if(lineDay.length >=1){
            // If there's at least one element in that day
            const content = lineDay.map((scheduleItem, itemIndex)=>{
              return(
                <Form.Group key={scheduleItem.id} className="pb-3 border-bottom border-2 mt-3">
                  <Form.Select key={'day_' + scheduleItem.id} value={formLines[day][itemIndex].dayOfWeek} onChange={(e)=> handleChange('dayOfWeek', e.target.value, day, itemIndex)}>
                    {
                      daysOfTheWeekEnglish.map((day,i)=>(
                        <option key={i} value={i}>{day}</option>
                      ))
                    }
                  </Form.Select>
                  <div className='d-flex align-items-center gap-2 mt-3'>
                    <Form.Control key={'timeStart_' + scheduleItem.id} type="time" value={formLines[day][itemIndex].timeStart} onChange={(e)=> handleChange('timeStart', e.target.value, day, itemIndex)}/>
                    
                    <span>-</span>
                    <Form.Control key={'timeEnd_' + scheduleItem.id} type="time" value={formLines[day][itemIndex].timeEnd} onChange={(e)=> handleChange('timeEnd', e.target.value, day, itemIndex)}/>
                    <input type="hidden" value={formLines[day][itemIndex].id} readOnly/>
                  </div>
              </Form.Group>
              )
            })
            return content
          }
        })
      }
  
      <div className="d-flex justify-content-lg-between align-items-center">
        <div className="mt-3">
            <button type="button" className="btn btn-danger text-white me-2" onClick={()=> clearSchedule()}>Clear schedule</button>
            <button className='btn btn-link me-2' type='button' onClick={()=> addScheduleLine()}>Add day</button>
        </div>

        <div className="mt-3">
            <button className='btn btn-success me-2' type='button' onClick={()=> handleSave()}>Save</button>
        </div>
      </div>
    </Form>
  )

  function handleChange(formElement, value, day, itemIndex){
    const newState = [...formLines]
    newState[day][itemIndex][formElement] = value
    setFormLines(newState)
  }

  function addScheduleLine(){
    setGeneratedLines(generatedLines+1)
    const newState = [...formLines]
    newState[0].push({
      id: String(generatedLines),
      subjectId: currentSubject.id,
      dayOfWeek: "0",
      timeStart: "",
      timeEnd: ""
    })
    setFormLines(newState)
  }

  function clearSchedule(){
    setFormLines([[], [], [], [],[], [], []])
  }

  function handleSave(){
    const events = []
    // Iterate for schedule in the formLine state
    formLines.forEach(day=>{
      if(day.length >=1){
        day.forEach(item=>{
          // Validate before adding to the array
          if(Schedule.validateSchedule(item)){
            events.push(item)
          }
        })
      }
    })

    // Update the schedule: Remove the old schedule for this subject and then adds the new schedule
    const scheduleWithoutSubject = schedule.filter(item => (item.subjectId !== currentSubject.id))
    const newSchedule = [...events, ...scheduleWithoutSubject]
    updateLS('schedule', newSchedule)
    setSchedule(getParsedLS('schedule'))
    setModalShow(false)
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
            id: line.id,
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
