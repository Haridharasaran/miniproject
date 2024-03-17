import React, { useState } from 'react'
import "./Dash.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import Menu from './Menu';
import {FaCartShopping} from "react-icons/fa6"

// import About from './About';

// import 'bootstrap/dist/css/bootstrap.min.css';



function Dashboard(props) {
  const nav = useNavigate()
  const [pages, setPages] = useState("Home")

  const { boo } = props
  const { bool, setBool , carts ,setCarts } = boo
  const remove = () => {
    localStorage.removeItem("user")
    setBool(false)
  }
  

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      nav('/')
    }
  }, [bool])



  return (
    <>
      <div className='hai'>
        <nav className="navbar navbar-expand-lg bg-dark" style={{ position: "sticky", top: "0px" }} >
          <div className="container-fluid ">
            <h6 className="navbar-brand text-light" >React Web </h6>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <h6 className="nav-link btn active text-light" onClick={() => setPages("Home")} aria-current="page" >Home</h6>
                </li>
                <li className="nav-item">
                  <h6 className="nav-link btn text-light" onClick={() => setPages("Menu")} >Menu</h6>
                </li>
                <li className="nav-item">
                  <h6 className="nav-link btn text-light" onClick={() => setPages("About")} >About</h6>
                </li>
                <li className="nav-item">
                  <h6 className="nav-link btn text-light" onClick={() => setPages("Contact")} >Contact</h6>
                </li>
                <li className="nav-item">
                  <div  className="btn text-white position-relative">
                    <FaCartShopping style={{color:"white",fontSize:"x-large"}}/>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-danger">
                      {carts}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <h6 className="nav-link btn text-light" onClick={remove}>Logout</h6>
                </li>
              </ul>

            </div>
          </div>
        </nav>
        {pages === "Home" && <div style={{ minHeight: "100vh" }}><h1 >Hari</h1></div>}
        <Menu carts = {{setCarts}}/>
        
        {pages === "About" && <Task />}
        {pages === "Contact" && <Task />}
      </div>
    </>
  )
}

export default Dashboard