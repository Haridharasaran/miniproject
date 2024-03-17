import React from 'react'
import { Form, FloatingLabel, Card } from 'react-bootstrap';
import './Register.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

function Register(props) {
    const nav = useNavigate()
    const {boo} = props
    const {bool,setBool} = boo

    const Validate = yup.object().shape({
        name: yup.string().required("Enter the Valid Name"),
        email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email!").required("Invalid Email!"),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid Password").required(),
        phone: yup.string().oneOf([yup.ref("password"), null], "Password does not matches").required("Password does not matches")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Validate),
    })


    const postUrl = "http://localhost:6001/users/create"


    const onSubmit = (data) => {
        axios.post(postUrl, data)
        localStorage.setItem("user",data)
        setBool(true)
         

    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            nav('/Dash')
        }
    }, [bool])




    return (
        <div className='App'>
            <div className='w-50' >


                <Card className='color' >
                    <Card.Body>
                        <Card.Title className='text-center'>Register</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Create Account</Card.Subtitle>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FloatingLabel
                                controlId="floatingInputName"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control {...register("name")} type="text" placeholder="name@example.com" />
                                <small>{errors.name?.message}</small>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control {...register("email")} type="email" placeholder="name@example.com" />
                            <small>{errors.email?.message}</small>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                                <Form.Control {...register("password")} type="password" placeholder="Password" />
                            <small>{errors.password?.message}</small>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingConPassword" label="Conform Password">
                                <Form.Control {...register("phone")} type="password" placeholder="Password" />
                            <small>{errors.phone?.message}</small>
                            </FloatingLabel>
                            <div className='d-flex mt-2'> <button type="submit" className='btn mx-auto btn-dark'>Register</button>
                            </div>
                        </form><div className='text-end mt-2'>
                        <p>Already have Account?<Link className='ms-2' to="/Login" >Login</Link></p></div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Register