import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from 'react-loader-spinner'



const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authenticated, setAuthenticated] = useState("")
    const Navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [status,setStatus]= useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        console.log(event.target.value)
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        console.log(event.target.value)
    }

    const login = async (event) => {


        setIsLoading(true)

        event.preventDefault()
        const response = await axios.post("http://127.0.0.1:8080/api/v1/auth/login", {
            email: email,
            password: password
        }).then(
            res=> {
                localStorage.setItem("Authorization", res.data)

                setAuthenticated(localStorage.getItem("Authorization")
                )

            }
        ).finally(()=>{
            if (authenticated.startsWith("Bearer")) {
                Navigate("/")
                console.log("Used it")
            }

            else{
                setStatus("Invalid Login Details")
            }
        })

      
    }

    return (
        <div className=" m-auto p-5 mt-10 shadow-lg bg-gray-50 w-[500px]">
            <div className="">
                <form onSubmit={login} className="text-center items-center flex flex-col  ">
                    <div className="mt-20">
                        <BsPersonCircle size={70}></BsPersonCircle>
                    </div>
                    <p className="mb-9">Sign In</p>
                    <button onClick={() => Navigate("/")}>Go to Dign</button>
                    <input
                        type="text"
                        className="form-control bg-white block w-full mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="email"
                        placeholder="enter email"
                        onChange={handleEmailChange}
                    />

                    <input
                        onChange={handlePasswordChange}
                        type="password"
                        className="form-control mb-3 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="enter password"
                    />

                    <p className="text-center text-red-700">{status}</p>

                    <button onClick={login} className="bg-green-700 p-2 rounded-sm text-white w-full" >Login</button>
                    <button onClick={() => {
                        Navigate("/Signup")
                    }} className="bg-green-700 m-3 p-2 rounded-sm text-white w-full" >Sign Up</button>


                    {isLoading?<ThreeCircles
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />: <></>}

                </form>
            </div>
        </div>
    );
}


export default LoginForm;