import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {TbBrandBooking} from 'react-icons/tb';

const NavBar = () => {


    const [profile, setProfile] = useState([]);
    const Navigate = useNavigate();

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
            <div className="bg-white shadow-md h-[70px]  flex flex-row justify-between px-[30px]">

                <h1 onClick={()=>{
                    Navigate("/")
                }} className="my-auto text-gray-700 text-[23px] ">O-DYSEYS</h1>
                <a href="/mybookings" className="my-auto text-green-700 text-[14px]"><div className=" flex flex-row justify-center "><TbBrandBooking size={'2em'}></TbBrandBooking>Bookings</div></a>
                
                <div onClick={()=>{
                    Navigate("/profile")
                }} className="h-[50px] my-auto w-[50px] bg-white rounded-full">
            <img className="rounded-full h-[50px] w-[50px]" alt="Room" src={"http://127.0.0.1:8080/api/v1/photo/download/" + profile.id + ".jpeg"} />

                </div>
            </div>
        </div>
    )


}

export default NavBar;