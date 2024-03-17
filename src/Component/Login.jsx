import React, { useEffect, useState } from 'react'
import { Card, Form, FloatingLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { type } from '@testing-library/user-event/dist/type';
// import img from "./img/UI_UX Shot.png"

function Login(props) {
    const { boo } = props
    const { bool, setBool } = boo
    const nav = useNavigate()

    const [exer, setExer] = useState(false)
    const [pass, setPass] = useState(false)
    const [text, setText] = useState("password")


    const PassChange =  () => {
        setPass(!pass)     
        
    }
// console.log(pass)

useEffect(()=>{
    if (pass === true) {
        setText("text")
    }
    else if (pass === false){
        setText("password")
    }
},[pass])



    const { register, handleSubmit } = useForm()

    const getUrl = "http://localhost:6001/users/view"
    const onSubmit = async (data) => {

        await axios.get(getUrl).then((res) => {
            const each = res.data.data;

            const check = each.filter((e) => {
                if (e.name === data.name && e.password === data.password) {
                    return e
                }
                else {
                    setExer(!exer)
                }
                return null
            })
            if (check.length > 0) {
                localStorage.setItem("user", JSON.stringify(check))
                setBool(true)
            }
            if (localStorage.getItem("user")) {
                nav('/Dash')
            }
        })
    }

    // useEffect(() => {
    //     if (localStorage.getItem("user")) {
    //         nav('/Dash')
    //     }
    // },[bool])
  
    return (
        <div className='App'>
            <div className='w-50 ' >
                <Card className='color' >
                    <Card.Body>
                        <Card.Title className='text-center'>Login</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">User Detail</Card.Subtitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FloatingLabel
                                controlId="floatingInputName"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control {...register("name")} type="text" placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                                <Form.Control {...register("password")} type={text} placeholder="Password" />
                               
                            </FloatingLabel>
                            <small className='btn mx-auto btn-light ' onClick={PassChange} > 👁‍🗨show password</small>
                            {exer && <p style={{color:"red"}}>Invalid User name or Password</p>}
                            <div className='d-flex'> <button className='btn mx-auto mt-2 btn-dark'>Login</button></div>

                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Login