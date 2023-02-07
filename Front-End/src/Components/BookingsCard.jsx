import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const BookingCard = (prop) => {

    const Navigate = useNavigate();

    const cancelBooking = (id) => {
        axios.get("http://127.0.0.1:8080/api/v1/booking/cancel/" + id,
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            }
        )
    }


    return (
        <div className="bg-white py-3 px-6 m-2 rounded-sm flex justify-between flex-row space-x-3 w-full">
            <div className="">
                <p className="font-mono text-[10px]">Client: {prop.name} {prop.surname}</p>
                <p className="font-mono text-[10px]">Check-In: {prop.checkIn}</p>
                <p className="font-mono text-[10px]">Check-Out: {prop.checkOut}</p>
                <p className="font-mono text-[10px]">Amount: R{prop.amount}.00</p>


            </div>
            <div className="w-[170px] flex flex-col justify-center space-y-1">

                <button onClick={() => { cancelBooking(prop.id) }} className="bg-green-700  text-white w-full rounded-sm text-[12px]">Cancel Booking</button>
                <button onClick={() => {
                    localStorage.setItem("id", prop.id)
                    Navigate("/reschedule")
                }
                } className="bg-green-700  text-white w-full rounded-sm text-[12px]">Rechedule Booking</button>

            </div>
        </div>
    )
}

export default BookingCard;