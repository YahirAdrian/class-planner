import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"

//Assets
import logo from '../assets/img/logo-white.svg'
import burguerMenu from '../assets/icons/burguer-menu.svg'
export default function Header({handleShow}) {
  return (
    <header className='bg-primary w-100 p-3 text-white d-flex justify-content-between '>
        <div className="logo-box">
            <Link to={'/'} className="text-decoration-none d-flex align-items-center">
                <Image src={logo} width={48} height={48} alt="Class planner logo" title="Home"/>
                <h1 className="text-white fs-2 d-inline ">Class planner</h1>
            </Link>    
        </div>

        <button type="button" title="Open menu" className="bg-transparent border-0 d-md-none" onClick={handleShow}>
            <Image src={burguerMenu} width={48} height={48} alt="Menu icon"/>
        </button>
    </header>
  )
}
