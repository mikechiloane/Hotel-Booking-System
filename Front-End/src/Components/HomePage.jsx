import axios from 'axios';
// import AllBookings from './Bookings';
import React, { useState, useEffect, useRef } from 'react';
import SockJsClient from 'react-stomp';


import NavBar from './NavBar';
import { ThreeCircles } from 'react-loader-spinner';

const HomePage = () => {



    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [isSearching, setIsSearching] = useState(false)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');


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

    const checkAvailableRooms = async (event) => {
        event.preventDefault()

        const data = {
            checkIn: checkInDate,
            checkOut: checkOutDate
        }



        setIsLoading(true)

        const response = await axios.post("http://127.0.0.1:8080/api/v1/availableRooms",
            data, {
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        }
        ).then(
            res => {
                setData(res.data)
                setIsLoading(false)
                setIsSearching(true)
                    (console.log(res))
            }
        )


    }


    const makeBooking = async (roomName) => {


        await axios.post("http://127.0.0.1:8080/api/v1/book/" + localStorage.getItem('id') + "/" + localStorage.getItem("user"),
            {
                "checkIn": checkInDate,
                "checkOut": checkOutDate,
                "roomName": localStorage.getItem("roomName"),
                "email": localStorage.getItem("email")
            },
            {
                headers: {
                    Authorization: localStorage.getItem("Authorization")
                }
            })

            
    }

    const onMessageReceived = (msg) => {
        setMessage(msg.message);
      }


    return (
        <div>
            <NavBar></NavBar>

            <SockJsClient  url='http://localhost:8080/websocket-chat/'
                topics={['/topic/message']}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
                onConnect={() => {
                    console.log("connected");
                }}
                onDisconnect={() => {
                    console.log("Disconnected");
                }}
                
                
            />

            <div className="mt-3 text-center m-auto">{message}</div>


            <div className=" flex flex-col flex-nowrap  rounded-sm  h-[400px] overflow-y-auto m-auto mt-5 bg-gray-100 p-10 w-[500px]">
                <form onSubmit={checkAvailableRooms}>

                    <p className="m-1 opacity-50">Select Checkout Date</p>
                    <input
                        onChange={handleCheckInChange}
                        type="date"
                        className="form-control  mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white 
                        bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
                         focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="checkIn"
                        min="2023-02-02" max="2023-12-31"
                        placeholder="YYYY-MM-DD"
                    />
                   


                    <p className="m-1 opacity-50">Select Checkout Date</p>

                    <input
                        onChange={handleCheckOutChange}
                        type="date"
                        className="form-control mb-2 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border 
                        border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600
                         focus:outline-none"
                        id="checkOut"
                        min="2023-02-02" max="2023-12-31"
                        placeholder="YYYY-MM-DD"
                    />

                    <button type="submit" className="bg-green-700 text-white  p-2 w-full"> Check Availability</button>
                    <div className="flex justify-center m-3">
                        {isLoading ? <ThreeCircles
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
                        /> : <></>}
                    </div>

                </form>
                <div className="">
                    <p className="text-center mb-3  mt-6">Available Rooms</p>
                    {isSearching ? <div className="text-black">
                        {
                            data.map(
                                room => <div className="shadow-lg mb-3 rounded-sm bg-white px-2  space-x-3 items-center flex flex-row h-28">
                                    <div className="bg-green-700 h-24 w-24">
                                        <img className="h-24 w-[270px]" alt="Room" src={"http://127.0.0.1:8080/api/v1/photo/download/" + room.roomName + ".jpeg"} />
                                    </div>
                                    <div className="flex mb-2  flex-col">
                                        <p className="text-[20px] font-medium">{room.roomName} <h1 className="text-[12px] text-green-700">
                                            R120 per night</h1></p>
                                        <p className="text-gray-500 text-[14px]">Includes no Breakfast <br /></p>
                                        <button onClick={() => {
                                            localStorage.setItem("id", room.id)
                                            localStorage.setItem("roomName", room.roomName)
                                            makeBooking()
                                        }} className="px-10 rounded-sm bg-green-700 "><p className="text-white font-semibold">Book Now</p></button>
                                    </div>
                                </div>
                            )
                        }

                    </div> : <></>}
                </div>


            </div>
            <div>

            </div>



        </div>
    );


}




export default HomePage;