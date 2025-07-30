import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeStations() {
    const navigate=useNavigate()
    const table = [
        {
           id:1, stationName: "JED", passenger: 8, destination: "USA", view: "See more"
        },
        {
           id:2, stationName: "RUH", passenger: 21, destination: "Chicago", view: "See more"
        },
        {
            id:3,stationName: "DMM", passenger: 10, destination: "London", view: "See more"
        },
        {
           id:4, stationName: "MED", passenger: 5, destination: "Italy", view: "See more"
        },
        {
            id:5,stationName: "CAI", passenger: 20, destination: "Asia", view: "See more"
        },
    ]

    const Navigate=(value)=>{
        console.log(value)
        navigate(`/stationsdetail/${value.id}`,{state:value})
    }
    return (
        <div className=' px-3 py-6'>
            <h1 className='text-lg font-bold sm:text-3xl'>All Station Detail:</h1>
            <table className="w-full text-sm text-center border border-gray-300 rounded-lg shadow-md mt-3 sm:mt-6 overflow-x-auto">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="py-3 px-4 border border-gray-300">No</th>
                        <th className="py-3 px-4 border border-gray-300">Station</th>
                        <th className="py-3 px-4 border border-gray-300">Total Passenger</th>
                        <th className="py-3 px-4 border border-gray-300">Destination</th>
                        <th className="py-3 px-4 border border-gray-300">View</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {
                        table.map((value, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors">
                                <td className="py-2 px-4 border border-gray-200 font-medium">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-200">{value.stationName}</td>
                                <td className="py-2 px-4 border border-gray-200">{value.passenger}</td>
                                <td className="py-2 px-4 border border-gray-200">{value.destination}</td>
                                <td onClick={()=>Navigate(value)} className="py-2 px-4 border border-gray-200 text-blue-600 hover:underline cursor-pointer">
                                    {value.view}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>
    )
}
