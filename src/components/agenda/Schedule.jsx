import { Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import ScheduleItem from "../objects/ScheduleItem"

import settingsIcon from '../../assets/icons/settings-primary.svg'

export default function Schedule() {
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
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </div>
    </section>
  )
}
