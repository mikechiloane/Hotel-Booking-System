import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseURL = "http://127.0.0.1:8080/api/v1/bookings"

const AllBookings = () => {

    const [bookings, setbookings] = useState([]);

    useEffect(
        ()=>{
            axios.get(baseURL,{
                headers:{
                    Authorization:localStorage.getItem("Authorization")
                }
            })
            .then(response=>setbookings(response.data))
        },
        []
    )

    return(
        <div className="text-black">
           {
            bookings.map(
                booking => (
                    <div className="bg-white py-3 px-6 mb-3 rounded-sm flex justify-between flex-row space-x-3 w-full">
                        <div className="">
                            <p className="font-mono text-[10px]">Client: Mike Chloane</p>
                            <p className="font-mono text-[10px]">Period: {booking.checkIn} - {booking.checkOut}</p>
                            <p className="font-mono text-[10px]">Room: {booking.room["roomName"]}</p>
                            <p className="font-mono text-[10px]">Amount: {booking.amount}</p>
            
            
                        </div>
                        <div className="w-[170px] flex flex-col justify-center space-y-1">
                           <button className="bg-green-700  text-white w-full rounded-sm text-[12px]">Cancel Booking</button>
                           <button className="bg-green-700  text-white w-full rounded-sm text-[12px]">Contact Client</button>
                           <button className="bg-green-700  text-white w-full rounded-sm text-[12px]">Rechedule Booking</button>
            
                        </div>
                    </div>
                )
            )
           }
           
        </div>
    )
}

export default AllBookings;
