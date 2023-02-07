import React, { useState, useEffect } from 'react';
import BookingCard from '../BookingsCard';
import AllBooking from '../Bookings';
import NavBar from '../NavBar';

const AdminPage= ()=>{


    return(
        <div>
        
        <NavBar></NavBar>
        <div className="text-center text-green-700 font-bold mt-10 text-[20px]"></div>
       <div className=" m-auto p-3 mt-10 bg-gray-200 w-[450px]">
        <AllBooking></AllBooking>
       </div>
       </div>
    )
}


export default AdminPage;