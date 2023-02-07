import axios from 'axios';
// import AllBookings from './Bookings';
import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../NavBar';
import { ThreeCircles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';


const RescheduleBooking = () => {

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [isSearching, setIsSearching] = useState(false);
    const Navigate = useNavigate();

    const handleCheckInChange = (event) => {
        const data = event.target.value.replaceAll("/", "-")
        setCheckInDate(data)
        console.log(checkInDate)

    }

    const handleCheckOutChange = (event) => {
        var data = event.target.value.replaceAll("/", "-")
        setCheckOutDate(data)
        console.log(checkOutDate)
    }

    const reschedule = () => {
        const response = axios.post(
            "http://127.0.0.1:8080/api/v1/reschedule/" + localStorage.getItem("id"),
            {
                checkIn: checkInDate,
                checkOut: checkOutDate,
            }
            ,
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })
    }

    return (
        <div className="text-black">
            <NavBar></NavBar>




            <div className=" flex flex-col flex-nowrap  rounded-sm  h-[400px] overflow-y-auto m-auto mt-5 bg-gray-100 p-10 w-[500px]">
                <form>
                    <input
                        onChange={handleCheckInChange}
                        type="date"
                        className="form-control  mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="checkIn"
                        min="2023-02-02" max="2023-12-31"
                        placeholder="YYYY-MM-DD"
                    />

                    <input
                        onChange={handleCheckOutChange}
                        type="date"
                        className="form-control mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="checkOut"
                        min="2023-02-02" max="2023-12-31"
                        placeholder="YYYY-MM-DD"
                    />
                    <div className="m-auto flex justify-center m-3">
                        {isSearching?<ThreeCircles
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
                        /> :<></>}

                    </div>


                    <button type="submit" onClick={
                        async() => {

                            setIsSearching(true);
                            reschedule()
                        }

                    } className="bg-green-700 text-white  p-2 w-full"> Reschedule Booking</button>

                </form>
            </div>

        </div>
    )

}

export default RescheduleBooking;