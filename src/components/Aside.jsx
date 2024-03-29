import { useState } from 'react'
import { Offcanvas, Button, Image, Nav } from 'react-bootstrap'
import { Link, useLocation} from 'react-router-dom'
import '../styles/aside.css'

//Images
import profilePicture from '../assets/icons/mdi_user.svg'
import homeIcon from '../assets/icons/home.svg'
import settingsIcon from '../assets/icons/settings.svg'
import logoutIcon from '../assets/icons/logout.svg'
import infoIcon from '../assets/icons/about.svg'

import useAgenda from '../hooks/useContext'

export default function Aside({show, handleClose}) {

    const {pathname} = useLocation()
    const {userInfo} = useAgenda()
  return (
    <>
        <div className="box-canvas d-none d-lg-block"></div>
        <Offcanvas show={show} onHide={handleClose} responsive='lg' className='text-white bg-secondary h-100'>
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>Actions</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className='p-0 flex-md-column justify-content-between'>
                <div>
                    <div className="user-info  pt-3">
                        <Link to='/settings' className='text-white text-decoration-none d-flex flex-column  align-items-center' onClick={()=> handleClose()}>
                            <Image src={profilePicture} width={128} height={128} alt='Profile picture icon'/>
                            <p className="fs-5 ">Welcome</p>
                            <p className="fs-6">{userInfo.userName}</p>

                        </Link>
                    </div>

                    <div className="actions-box bg-secondary-2 p-3 d-flex gap-3 mt-2 mb-3">
                        <Link to={'/'} title='Go to panel' onClick={()=> handleClose()}>
                            <Image src={homeIcon} width={24} height={24} alt='Home icon'/>
                        </Link>
                        {/* <Image src={notificationsIcon} width={24} height={24} alt='Notifications icon'/> */}
                    </div>

                    <nav className="navigation">
                        <ul 
                            className={`mb-0 p-3 border-secondary border ${pathname === '/agenda' ? 'bg-secondary-3' : 'bg-secondary-2'}`}
                        >
                            <Link to={'/agenda'} className='text-white text-decoration-none fw-bold fs-4' onClick={()=> handleClose()}>Agenda</Link>
                        </ul>
                        <ul 
                            className={`mb-0 p-3 border-secondary border ${pathname === '/tasks' ? 'bg-secondary-3' : 'bg-secondary-2'}`}
                        >
                            <Link to={'/tasks'} className='text-white text-decoration-none fw-bold fs-4' onClick={()=> handleClose()}>Tasks</Link>
                        </ul>
                        <ul 
                            className={`mb-0 p-3 border-secondary border ${pathname === '/notes' ? 'bg-secondary-3' : 'bg-secondary-2'}`}
                        >
                            <Link to={'/notes'} className='text-white text-decoration-none fw-bold fs-4' onClick={()=> handleClose()}>Notes</Link>
                        </ul>
                        <ul 
                            className={`mb-0 p-3 border-secondary border ${pathname === '/schedule' ? 'bg-secondary-3' : 'bg-secondary-2'}`}
                        >
                            <Link to={'/schedule'} className='text-white text-decoration-none fw-bold fs-4' onClick={()=> handleClose()}>Schedule</Link>
                        </ul>
                    </nav>
                </div>




            </Offcanvas.Body>

            <div className="aside-footer d-flex gap-3 bg-secondary p-2 align-items-center ">
                <Link to={'/settings'} title='Settings' onClick={()=> handleClose()}>
                    <Image src={settingsIcon} width={32} height={32} alt='Settings icon'></Image>
                </Link>
                <Link to={'/about'} title='About' onClick={()=> handleClose()}>
                    <Image src={infoIcon} width={32} height={32} alt='About info icon'></Image>
                </Link>
                <Link to={'/logout'} title='Logout' onClick={()=> handleClose()}>
                    <Image src={logoutIcon} width={32} height={24} alt='Logut icon'></Image>
                </Link>
            </div>
        </Offcanvas>
    </>
  )
}
