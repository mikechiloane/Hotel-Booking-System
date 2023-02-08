import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar';

const SignUpForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authenticated, setAuthenticated] = useState("Bearer")
    const [firstName,setFName]= useState("")
    const [lastName,setLastName] = useState("")
    const [phone,setPhone] = useState("")
    const [idNumber,setID] = useState("")


    const Navigate = useNavigate()


    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        console.log(event.target.value)
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        console.log(event.target.value)
    }

    const handlePNChange = (event) => {
        setPhone(event.target.value)
        console.log(event.target.value)
    }
    const handleFNChange = (event) => {
        setFName(event.target.value)
        console.log(event.target.value)
    }
    const handleSNChange = (event) => {
        setLastName(event.target.value)
        console.log(event.target.value)
    }

    const handleIDChange = (event) => {
        setID(event.target.value)
        console.log(event.target.value)
    }


    const signUp = async (event) => {

        const data = {
            "firstName":firstName,
            "lastName": lastName,
            "phone":phone,
            "email":email,
            "idNumber":idNumber,
            "role":"USER",
            "password":password
        }

        event.preventDefault()
        const response = await axios.post("http://127.0.0.1:8080/api/v1/auth/register", data)

        // localStorage.setItem("Authorization", await response.data)
        //  setAuthenticated(        localStorage.getItem("Authorization")
        // )      


        Navigate("/login")

    }


    return (
        <div>
                        <NavBar></NavBar>

        <div className=" m-auto p-14 pt-2 mt-10 bg-gray-200 w-[500px]">
            <div className="">
                <form onSubmit={signUp} className="text-center items-center flex flex-col  ">
                    <div className="mt-20">
                        <BsPersonCircle size={70}></BsPersonCircle>
                    </div>
                    <p className="mb-9">Sign Up</p>

                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="firstName"
                        placeholder="Name"
                        onChange={handleFNChange}
                    />

                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="secondName"
                        placeholder="Surname"
                        onChange={handleSNChange}
                    />
                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="phone"
                        placeholder="Phone Number"
                        onChange={handlePNChange}
                    />

                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="id"
                        placeholder="ID number"
                        onChange={handleIDChange}
                    />


                    <input
                        onChange={handlePasswordChange}
                        type="password"
                        className="form-control mb-3 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="enter password"
                    />

                    <button className="bg-green-700 p-2 rounded-sm text-white w-full" >Submit</button>
                </form>
            </div>
        </div>
        </div>
    );
}


export default SignUpForm;