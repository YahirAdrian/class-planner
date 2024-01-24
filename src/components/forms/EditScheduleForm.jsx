import { Form } from "react-bootstrap"
import { daysOfTheWeekEnglish } from "../../utils/constants"
import { useState } from "react"

export default function EditScheduleForm({currentSubject}) {

  const {schedule} = currentSubject
  const arrangedSchedule = arrangeScheduleByDay(schedule)
  let currentDay = 0

  const [formLines, setFormLines] = useState([])
  return (
    <Form> 
      {
        formLines.map(line => {

          if(Object.keys(line).length === 0){
            // If the new line is empty
            return(
              <Form.Group>
                  <Form.Select>
                    
                  </Form.Select>
                  <div className='d-flex align-items-center gap-2'>
                  <Form.Control type="time"/>
                  <span>-</span>
                  <Form.Control type="time"/>
                  </div>
              </Form.Group>
            )
          }

        })
      }


        <div className="d-flex justify-content-end mt-3">
            <button className='btn btn-link me-2' type='button' onClick={()=> setFormLines( [...formLines, {}] )}>Add schedule day</button>
            <button type="button" className="btn btn-danger text-white btn-sm me-2">Clear schedule</button>
        </div>
    </Form>
  )

  function arrangeScheduleByDay(schedule){
    schedule.sort((a,b)=>{
      return a.day - b.day
    })

    return schedule
  }
}
