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
      <aside className='aside'>
        <Aside 
          handleClose={handleClose}
          show={show}
        />

      </aside>

      <div className="w-100">
        <Header 
          handleShow={handleShow}
        />

        <main className='main-content bg-paper p-md-5 p-1 p-md-2'>
          <Outlet />

        </main>

      </div>
    </div>
  )
}
