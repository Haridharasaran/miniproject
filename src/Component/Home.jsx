import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect } from 'react';
function Home(props) {
const nav = useNavigate()
const {boo} = props 
const {bool} = boo
    useEffect(() => {
        if (localStorage.getItem("user")) {
            nav('/Dash')
        }
    },[bool])

    return (

        <div className='w-100 welcom d-flex '>
            <div className='text-center mx-auto my-auto'>
                <h1><b>Interactive Games <br />For Everyone </b></h1>
                <button className='btn btn-primary mt-2 rounded-pill hi'><Link className='text-light' to='/register'>Register</Link></button>
            </div>
        </div>
    )



}

export default Home