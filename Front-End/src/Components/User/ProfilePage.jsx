import React, { useState, useEffect } from 'react';
import {HiOutlineMail} from 'react-icons/hi'
import NavBar from '../NavBar';
import axios from 'axios';
import {AiOutlinePhone,AiOutlineEdit} from "react-icons/ai";
import {GiPassport} from "react-icons/gi";

const ProfilePage = ()=>{

    const [profile, setProfile] = useState([]);


    useEffect(
        () => {

            const getProfile = async () => {

                const res = await axios.post("http://127.0.0.1:8080/api/v1/getUserInfo", {
                    token: localStorage.getItem("Authorization").slice(7)
                },
                    {
                        headers: {
                            Authorization: localStorage.getItem("Authorization")
                        }
                    }
                ).then(res => {
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem("user", res.data.id)
                    setProfile(res.data)
                })

            }

            getProfile()
        },
        []
    )


    return (
        <div>
            <NavBar></NavBar>
        <div className=" rounded-sm  h-[400px]  m-auto mt-5 bg-gray-100 p-10 w-[500px]">

        <div>
        <button onclick="buttonHandler()" title="Contact Sale"
        className="fixed z-90 ml-32 bg-green-700 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
            <AiOutlineEdit size={'0.5em'}></AiOutlineEdit></button>

            <div className="h-[150px] mx-auto w-[150px] bg-white rounded-full">
            <img className="rounded-full h-[150px] w-[150px]" alt="Room" src={"http://127.0.0.1:8080/api/v1/photo/download/" + profile.id + ".jpeg"} />

            </div>
            </div>
			<h1 class="text-3xl text-center font-bold pt-8 lg:pt-0">{profile.firstName +" "+profile.lastName}</h1>
            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-700 opacity-50">

            </div>
            <p class="pt-4 text-base flex items-center justify-center lg:justify-start">
                <HiOutlineMail className="mr-3 "></HiOutlineMail> {profile.email}
            </p>
            <p class="pt-2 text-base flex items-center justify-center lg:justify-start">
                <AiOutlinePhone className="mr-3 "></AiOutlinePhone> {profile.phone}
            </p>
            <p class="pt-2 text-base flex items-center justify-center lg:justify-start">
                <GiPassport className="mr-3 "></GiPassport> {profile.idNumber}
            </p>
        </div>
        </div>
    )
}

export default ProfilePage;