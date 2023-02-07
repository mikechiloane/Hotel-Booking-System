import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import BookingCard from '../BookingsCard';

const MyBookings = () => {
    const [myBooking, setbooking] = useState([]);

    useEffect(
        () => {
            axios.post("http://127.0.0.1:8080/api/v1/showAllUserBookings",
                { email: localStorage.getItem("email") },
                {
                    headers: {
                        Authorization: localStorage.getItem("Authorization")
                    }
                }
            ).then(res => setbooking(res.data))

        }
        , []

    )

    return (
        <div>
            <NavBar></NavBar>
            <div className=" flex flex-col flex-nowrap  rounded-sm  h-[400px] overflow-y-auto m-auto mt-5 bg-gray-100 p-10 w-[500px]">

                {
                    myBooking.map(
                        booking => <BookingCard name={booking.user["firstName"]} 
                        surname={booking.user["lastName"]} 
                        checkIn= {booking.checkIn}
                        checkOut={booking.checkOut}
                        amount={booking.amount}
                        id = {booking.id}
                        >

                        </BookingCard>
                    )
                }
            </div>
        </div>

    )
}

export default MyBookings;