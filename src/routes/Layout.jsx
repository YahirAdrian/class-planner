import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'
import Header from '../components/Header'

export default function Layout() {

    const [show, setShow] = useState(true);
    const handleClose = ()=> setShow(false)
    const handleShow = ()=> setShow(true)

  return (
    <div className=' d-flex h-100 '>
      <aside className=''>
        <Aside 
          handleClose={handleClose}
          show={show}
        />

      </aside>

      <main className='w-100'>
        <Header 
          handleShow={handleShow}
        />
        <h1>Layout</h1>

      </main>
      <Outlet />
    </div>
  )
}
