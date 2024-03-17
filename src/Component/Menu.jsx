import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import "./Dash.css"
import Modal from "react-bootstrap/Modal"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { BsThreeDotsVertical } from "react-icons/bs"
import { Dropdown } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai"
// import App from "../App"



function Menu(props) {



    const [effect, setEffect] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [Deltoggle, setDelToggle] = useState(false)
    const [post, setPost] = useState([])
    const [DeletePost, setDeletePost] = useState("")
    const [oldData, setOldData] = useState({})
    const [cartval, setCartval] = useState([])
    const {carts} = props
    const { setCarts } = carts
    setCarts(cartval.length)

    console.log(cartval)

    // using yup 

    const validate = yup.object().shape({
        Id: yup.mixed().oneOf(["Pizza", "Juice"], "Please select the option"),
        title: yup.string().required("Please give the Title"),
        price: yup.number()
            .typeError("Price must be a number").min(50, "must be Above ₹50")
            .required("Price is required")
        // option: yup.string().required("Option is required")
    })



    //  for useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validate)
    })


    //  DB links
    const postUrl = "http://localhost:6001/product/create"
    const getPostUrl = "http://localhost:6001/product/get"
    const DelPostUrl = "http://localhost:6001/product/deleted"
    const UpdatePostUrl = "http://localhost:6001/product/update/"




    //  onsubmit in modal
    const onSubmit = async (data) => {
        console.log(data.picture[0])
        const pic = data.picture[0]

        const artical = {
            Id: data.Id,
            Name: data.title,
            Price: data.price,
            Description: "desc",
            Image: pic !== undefined ? data.picture[0] : {},

        }
        if (artical.Image) {

            await axios.post(postUrl, artical, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(artical)
            setToggle(false)
            setEffect(effect + 1);
        }

        reset()
        fetchData()
        console.log(pic)

    }

    //  onsubmit 2 for  update

    const onSubmit2 = async (data) => {
        console.log(data)
        const pic = data.picture[0]

        if (pic !== undefined) {

            const artical = {
                uID: oldData._id,
                Id: data.Id,
                Name: data.title,
                Price: data.price,
                Description: "desc",
                Image: data.picture[0],
                a: "false"
            }


            await axios.put(UpdatePostUrl, artical, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        }

        else {
            const artical = {
                uID: oldData._id,
                Id: data.Id,
                Name: data.title,
                Price: data.price,
                Description: "desc",
                Image: oldData.Image,
                a: "true"
            }


            await axios.put(UpdatePostUrl, artical, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        }
        // console.log(artical)
        setToggle2(false)
        setEffect(effect + 1);
        reset()


    }



    useEffect(() => {
        fetchData();
    }, [effect])

    const fetchData = async () => {
        const response = await axios.get(getPostUrl);
        console.log(response.data.data)
        setPost(response.data.data)

    };

    // delete
    const DelBtn = (Del) => {
        console.log(Del)
        setDelToggle(true)

        setDeletePost(`${Del}`)
    }

    const Deldata = async () => {
        await axios.delete(`${DelPostUrl}/${DeletePost}`)
        setDelToggle(false)
        await fetchData()
    }


    //  for Pizza 
    const Pizza = post.filter((e) => {
        return e.Id === "Pizza"
    })


    //  for Juice 
    const Juice = post.filter((e) => {
        return e.Id === "Juice"
    })


    console.log(Pizza)
    console.log(Juice)

    return (
        <div className='main'>

            <div className='pt-5'>
                <h1 className=" mb-5 text-center text-light">The Menu</h1>


                <div className='container g-0'>


                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3 w-50 mx-auto"
                        fill
                        variant="pills"
                    >
                        <Tab eventKey="home" title="Home">
                            <div className='row  g-0 mt-5 ' style={{ rowGap: "40px" }}>


                                {post.map((e) => {


                                    return (

                                        <div className='col-lg-4  col-md-6 col-12 ' key={e._id} >
                                            <Card style={{ width: "17rem" }} className="mx-auto position-relative" >

                                                <Card.Img variant="top" style={{ height: "12rem" }} src={e.Image} alt='hello' />
                                                <Card.Body>
                                                    <Card.Title>{e.Name}</Card.Title>
                                                    <Card.Text>
                                                        {`₹ ${e.Price}`}
                                                    </Card.Text>
                                                    <button className='btn btn-primary' onClick={() => { setCartval([...cartval, e]) }}>Go somewhere</button>
                                                </Card.Body>
                                                <Dropdown className='dropdown dropstart' drop='start'
                                                    id="dropdown-drop-start"
                                                >
                                                    <Dropdown.Toggle as={BsThreeDotsVertical} id="dropdown-autoclose-true">
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            setOldData(e)
                                                            setToggle2(true)
                                                        }} >Update</Dropdown.Item>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            DelBtn(e._id);
                                                            setDelToggle(true)
                                                        }
                                                        } >Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#">Add to card</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Card>
                                        </div>

                                    )

                                })}



                            </div>
                            <div className='text-end my-5 mx-5'>
                                <button className='btn btn-danger' onClick={() => setToggle(!toggle)}>+ Add New</button>

                            </div>
                        </Tab>
                        <Tab eventKey="pizza" title="Pizza">
                            <div className='row  g-0 mt-5 ' style={{ rowGap: "40px" }}>


                                {Pizza?.map((e) => {


                                    return (

                                        <div className='col-lg-4  col-md-6 col-12 ' key={e._id} >
                                            <Card style={{ width: "17rem" }} className="mx-auto position-relative" >

                                                <Card.Img variant="top" style={{ height: "12rem" }} src={e.Image} alt='hello' />
                                                <Card.Body>
                                                    <Card.Title>{e.Name}</Card.Title>
                                                    <Card.Text>
                                                        {`₹ ${e.Price}`}
                                                    </Card.Text>
                                                    <button className='btn btn-primary'>Go somewhere</button>
                                                </Card.Body>
                                                <Dropdown className='dropdown dropstart' drop='start'
                                                    id="dropdown-drop-start"
                                                >
                                                    <Dropdown.Toggle as={BsThreeDotsVertical} id="dropdown-autoclose-true">
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            setOldData(e)
                                                            setToggle2(true)
                                                        }} >Update</Dropdown.Item>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            DelBtn(e._id);
                                                            setDelToggle(true)
                                                        }
                                                        } >Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#">Add to card</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Card>

                                        </div>

                                    )

                                })}



                            </div>

                        </Tab>
                        <Tab eventKey="juice" title="Juice">
                            <div className='row  g-0 mt-5 ' style={{ rowGap: "40px" }}>


                                {Juice?.map((e) => {


                                    return (

                                        <div className='col-lg-4  col-md-6 col-12 ' key={e._id} >
                                            <Card style={{ width: "17rem" }} className="mx-auto position-relative" >

                                                <Card.Img variant="top" style={{ height: "12rem" }} src={e.Image} alt='hello' />
                                                <Card.Body>
                                                    <Card.Title>{e.Name}</Card.Title>
                                                    <Card.Text>
                                                        {`₹ ${e.Price}`}
                                                    </Card.Text>
                                                    <button className='btn btn-primary'>Go somewhere</button>
                                                </Card.Body>
                                                <Dropdown className='dropdown dropstart' drop='start'
                                                    id="dropdown-drop-start"
                                                >
                                                    <Dropdown.Toggle as={BsThreeDotsVertical} id="dropdown-autoclose-true">
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            setOldData(e)
                                                            setToggle2(true)
                                                        }} >Update</Dropdown.Item>
                                                        <Dropdown.Item href="#" onClick={() => {
                                                            DelBtn(e._id);
                                                            setDelToggle(true)
                                                        }
                                                        } >Delete</Dropdown.Item>
                                                        <Dropdown.Item href="#">Add to card</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Card>
                                        </div>

                                    )

                                })}



                            </div>
                        </Tab>

                    </Tabs>




                </div>




                {/* onSubmit 1 , forPost*/}
                <Modal show={toggle} backdrop="static" keyboard={false}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="ps-3 pt-3">
                            <Modal.Title>Add Your Product</Modal.Title>
                        </div>

                        <Modal.Body>
                            <div>
                                <div className="mx-auto image">
                                    <input type="file"
                                        {...register("picture")}
                                        style={errors.picture ? { border: "2px dashed red" } : {}}
                                        className="form-control box" />

                                </div>
                                <div className="form-floating mb-3 my-3">
                                    <input
                                        type="text"

                                        className="form-control"
                                        {...register("title")}
                                        id="floatingInput"

                                        placeholder="Title"
                                    />
                                    <label htmlFor="floatingInput">Title</label>
                                    <p className='err'>{errors.title?.message}</p>
                                </div>
                                <div className="row g-0 ">
                                    <div className="form-floating pe-5  col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Description"
                                            {...register("price")}
                                        />
                                        <label htmlFor="floatingPassword">Price</label>
                                        <p className='err'>{errors.price?.message}</p>
                                    </div>
                                    <div className="form-floating pe-5 col-md-6">
                                        <select className="form-select" id="floatingSelect"{...register("Id")} aria-label="Floating label select example">
                                            <option selected>Open this select menu</option>
                                            <option value="Pizza">Pizza</option>
                                            <option value="Juice">Juice</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Select the list</label>

                                        <p className='err'>{errors.Id?.message}</p>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div className="ps-3  text-end">
                            <p
                                className="btn btn-primary me-3 mb-3"
                                onClick={() => {
                                    setToggle(!toggle)
                                    reset()
                                }}
                            >
                                Close
                            </p>
                            <button className="btn btn-primary me-3 mb-3" type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal>


                {/* onSubmit2, forUpdate */}
                <Modal show={toggle2} backdrop="static" keyboard={false}>
                    <form onSubmit={handleSubmit(onSubmit2)}>
                        <div className="ps-3 pt-3">
                            <Modal.Title>Edit Your Product</Modal.Title>
                        </div>

                        <Modal.Body>
                            <div>
                                <div className="mx-auto image">
                                    <input type="file"
                                        {...register("picture")}
                                        style={{
                                            backgroundImage: `url("${oldData.Image}")`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover"
                                        }}
                                        className="form-control box" />

                                </div>
                                <div className="form-floating mb-3 my-3">
                                    <input
                                        type="text"

                                        className="form-control"
                                        {...register("title")}
                                        id="floatingInput"

                                        placeholder={`${oldData.Name}`}
                                    />
                                    <label htmlFor="floatingInput">{oldData.Name}</label>
                                    <p className='err'>{errors.title?.message}</p>
                                </div>
                                <div className="row g-0 ">
                                    <div className="form-floating pe-5  col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder={`₹ ${oldData.Price}`}
                                            {...register("price")}
                                        />
                                        <label htmlFor="floatingPassword">₹ {oldData.Price}</label>
                                        <p className='err'>{errors.price?.message}</p>
                                    </div>
                                    <div className="form-floating pe-5 col-md-6">
                                        <select className="form-select" id="floatingSelect"{...register("Id")} aria-label="Floating label select example">
                                            <option selected>Open this select menu</option>
                                            <option value="Pizza">Pizza</option>
                                            <option value="Juice">Juice</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Select the list</label>

                                        <p className='err'>{errors.Id?.message}</p>

                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div className="ps-3  text-end">
                            <p
                                className="btn btn-primary me-3 mb-3"
                                onClick={() => {
                                    setToggle2(!toggle2)
                                    reset()
                                }}
                            >
                                Close
                            </p>
                            <button className="btn btn-primary me-3 mb-3" type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* ForDelete */}
                <Modal show={Deltoggle} backdrop="static" keyboard={false}
                >
                    <Modal.Header className='confirm'>
                        <Modal.Title>Confirm</Modal.Title>
                        <AiOutlineClose
                            style={{ fontSize: "x-large", cursor: "pointer" }}
                            onClick={() => setDelToggle(false)} />
                    </Modal.Header>

                    <Modal.Body className='text-center confirm'>
                        <span className='hed'><b>Are you Sure?</b></span><br />
                        <span className='hedcon'>You want to delete this post!</span>
                    </Modal.Body>

                    <Modal.Footer className='confirm'>
                        <button className='btn btn-dark' onClick={
                            Deldata
                        }>Delete</button>
                    </Modal.Footer>
                </Modal>
            </div>



        </div >

    )
}

export default Menu