// import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from "@reduxjs/toolkit"
function Task() {
  const { handleSubmit, register } = useForm()
  const [img, setImg] = useState('')
  const id = nanoid()
  const onSubmit = (data) => {
    console.log(id)
    console.log(data.img[0])
    if (data.img) {
      setImg(URL.createObjectURL(data.img[0]))
    }
  }
  console.log(img)
  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-50'>
        <form onSubmit={handleSubmit(onSubmit)} >
          <input type="file" {...register("img")} onChange={(e) => e.target.files} />
          <button type='submit' >Upload</button>
        </form>

      </div>
      {img !== "" ? <img src={img} alt='Jpg' /> : null}

    </>
  )
}

export default Task