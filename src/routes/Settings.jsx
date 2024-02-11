import { Image, Form } from "react-bootstrap"

import profileIcon from "../assets/icons/mdi_user-primary.svg"
import infoIcon from "../assets/icons/about.svg"
import exportIcon from "../assets/icons/export.svg"
import importIcon from "../assets/icons/import.svg"
import logoutIcon from "../assets/icons/logout.svg"
import editIcon from "../assets/icons/edit.svg"

import '../styles/Settings.css'

import useAgenda from '../hooks/useContext'
import { useState } from "react"
import { getParsedLS, updateLS } from "../utils/functions"


export default function Settings() {

  const { userInfo, setUserInfo} = useAgenda()

  const [userName, setUserName] = useState(userInfo.userName)
  return (
    <>
      <div className="heading-box pt-5 ps-3">
        <h2>Settings</h2>
      </div>


      <div className="d-flex flex-column align-items-center">
        <Image src={profileIcon} width={128} height={128} alt="Profile icon" />
        
        <Form className="mb-4" onSubmit={e=> e.preventDefault()}>
            <Form.Group className="position-relative ">
              <Form.Label htmlFor="userName">
                <Image src={editIcon} width={32} className="input-icon" title="Edit username"/>
              </Form.Label>
              <Form.Control id="userName" type="text" value={userName} className="fw-bold fs-2 transparent-input"
                onChange={e=> setUserName(e.target.value)}
                onBlur={e => updateName(e.target.value)}
              />
            </Form.Group>
        </Form>

        <div className="d-flex flex-row  me-2 me-md-4 justify-content-center justify-content-md-end gap-2">
          <div className="d-flex flex-column ms-2 ms-sm-4">
            <button type="button" className="btn btn-primary border-0 bg-accent-2 " title="About this app">
              <Image src={infoIcon} width={24} height={24} alt="About icon"/>
            </button>
            <span className="text-gray-700 text-center">
              About
            </span>
          </div>

          <div className="d-flex flex-column ms-2 ms-sm-4 small ">
          <Form onSubmit={e=>e.preventDefault()}>
              <Form.Label htmlFor="import-data" aria-description="Import data button" className="d-flex flex-column ">
                <span type="button" className="btn btn-primary border-0 bg-success " title="Import data">
                  <Image src={importIcon} width={24} height={24} alt="Import icon"/>
                </span>
                <span className="text-gray-700 text-center">
                  Import data
                </span>
              </Form.Label>

              <input type="file" id="import-data" className="d-none" accept=".json"
                onChange={e => handleFileImported(e)}
              />
            </Form>
          </div>
          <div className="d-flex flex-column ms-2 ms-sm-4 small ">
            
            <button type="button" className="btn btn-primary border-0 bg-secondary-2 " title="Export data"
              onClick={()=> generateJSONFile()}
            >
              <Image src={exportIcon} width={24} height={24} alt="Export icon"/>
            </button>
            <span className="text-gray-700 text-center smal">
              Export data
            </span>
          </div>
          <div className="d-flex flex-column ms-2 ms-sm-4 small ">
            <button type="button" className="btn btn-primary border-0 bg-danger" title="Logout">
              <Image src={logoutIcon} width={24} height={24} alt="Logout icon"/>
            </button>
            <span className="text-gray-700 text-center">
              Logout
            </span>
          </div>
          
        </div>
      </div>

      <section className="section-box mt-4">
        <div className="heading-box d-flex justify-content-between mb-4">
          <h2>User preferences</h2>
        </div>

        <div>
          <Form>
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Select>
                <option value="EN">English</option>
                <option value="ES">Español</option>
                <option value="FR">Français</option>
              </Form.Select>
            </Form.Group>

            <button className="btn btn-primary mt-5" type="submit">Save changes</button>
          </Form>
        </div>
      </section>
    </>
  )

  function updateName(newName){
    userInfo.userName = newName

    updateLS('user-info', userInfo)
    setUserInfo(getParsedLS('user-info'))
  }

  function generateJSONFile(){
    // Get all the info from local storage
    const notes = getParsedLS('notes')
    const subjects = getParsedLS('subjects')
    const userInfo = getParsedLS('user-info')
    const tasks = getParsedLS('tasks')
    const schedule = getParsedLS('schedule')
    const events = getParsedLS('events')

    // Merge it in a object
    const data = {
      "user-info": userInfo,
      notes,
      subjects,
      tasks,
      schedule,
      events
    }

    const jsonstr = JSON.stringify(data)

    // Create link to download JSON
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", `data:application/json;charset=utf-8,${encodeURIComponent(jsonstr)}`);
    downloadAnchor.setAttribute("download", "mydata.json");

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

  }

  function handleFileImported(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonStr = e.target.result;
            const jsonData = JSON.parse(jsonStr);
            // Process the data and update localStorage

            updateLS('user-info', jsonData["user-info"])
            updateLS('notes', jsonData.notes)
            updateLS('subjects', jsonData.subjects)
            updateLS('tasks', jsonData.tasks)
            updateLS('schedule', jsonData.schedule)
            updateLS('events', jsonData.events)
            updateLS('notes', jsonData.notes)

            location.reload()
        };
        reader.readAsText(file);
    }
}
}