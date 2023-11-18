import { Image, Form } from "react-bootstrap"

import profileIcon from "../assets/icons/mdi_user-primary.svg"
import infoIcon from "../assets/icons/about.svg"
import exportIcon from "../assets/icons/export.svg"
import importIcon from "../assets/icons/import.svg"
import logoutIcon from "../assets/icons/logout.svg"
import editIcon from "../assets/icons/edit.svg"

export default function Settings() {
  return (
    <>
      <div className="heading-box">
        <h2>Settings</h2>
      </div>


      <div className="d-flex flex-column align-items-center">
        <Image src={profileIcon} width={128} height={128} alt="Profile icon" />
        
        <p className="fw-bold fs-2">Yahir Adrian</p>

        <div className="d-flex flex-row align-self-sm-end me-2 me-md-4">
          <div className="d-flex flex-column ms-2 ms-sm-4">
            <button type="button" className="btn btn-primary border-0 bg-accent-2 " title="About this app">
              <Image src={infoIcon} width={24} height={24} alt="About icon"/>
            </button>
            <span className="text-gray-700 text-center">
              About
            </span>
          </div>

          <div className="d-flex flex-column ms-2 ms-sm-4 small ">
            <button type="button" className="btn btn-primary border-0 bg-success " title="Import data">
              <Image src={importIcon} width={24} height={24} alt="About icon"/>
            </button>
            <span className="text-gray-700 text-center">
              Import data
            </span>
          </div>
          <div className="d-flex flex-column ms-2 ms-sm-4 small ">
            <button type="button" className="btn btn-primary border-0 bg-secondary-2 " title="Export data">
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
}
