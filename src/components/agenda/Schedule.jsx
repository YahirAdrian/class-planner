import { Image } from "react-bootstrap"

import ScheduleItem from "../objects/ScheduleItem"

import settingsIcon from '../../assets/icons/settings-primary.svg'

export default function Schedule() {
  return (
    <section className="mt-4 border-top pt-4">
      <div className="heading-box d-flex justify-content-between mb-4">
        <h3>Schedule</h3>
        <button type='button' className='btn-link' title='Edit schedule'>
          <Image width={24} height={24} src={settingsIcon} alt="Settings icon"/>
          Edit schedule
        </button>
      </div>

      <div className="schedule-box">
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </div>
    </section>
  )
}
