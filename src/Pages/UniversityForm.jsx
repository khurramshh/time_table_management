import React, { useEffect, useRef, useState } from 'react';
import UniversityFormImg from '../assets/UniversityFormImg.png'
import UniversityImg from '../assets/UniversityImg.jpg'
import ClipLoader from "react-spinners/ClipLoader";
import Teachers from "./Table"
import Table from './Table';

const UniversityForm = ({ data, setData }) => {
    const [teachers, setTeachers] = useState('');
    const [lectures, setLectures] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [classrooms, setClassrooms] = useState('');
    const [workingDays, setWorkingDays] = useState('');
    const [displayMessage , setDisplayMessage] = useState(false)
    const [loader, setLoader] = useState(false)
    const [displayTableScetion, setDisplayTableSection] = useState(false)

    const buttonRef = useRef(null);


    const handleTeachers = (event) => {
        setTeachers(event.target.value);
    };
    const handleLectures = (event) => {
        setLectures(event.target.value);
    };
    const handleTimeSlot = (event) => {
        setTimeSlot(event.target.value);
    };
    const handleclassrooms = (event) => {
        setClassrooms(event.target.value);
    };
    const handleWorkingDays = (event) => {
        setWorkingDays(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisplayTableSection(true)
        setLoader(true)

        // Prepare the data to be sent
        const formData = {
            teachers,
            lectures,
            timeSlot,
            classrooms,
            workingDays
        };

        try {
            // Send the POST request
            const response = await axios.post('https://your-api-endpoint.com/endpoint', formData);

            // Handle the response if needed
            console.log(response.data);
            
        } catch (error) {
            // Handle the error
            console.error('There was an error sending the data!', error);
        }
        finally {
            // Hide loader and show message
            setTimeout(() => {
                setLoader(false);
                setDisplayMessage(true);
                
                // Hide message after 2 seconds
                setTimeout(() => {
                    setDisplayMessage(false);
                }, 500);
            }, 500); // Loader will be visible for 1 second
        }
    };

    useEffect(() => {
        if (!displayMessage) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [displayMessage]);

    return (
        <div>
            <div className='relative bg-cover bg-center' style={{ backgroundImage: `url(${UniversityImg})` }}>
            {/* <div className='absolute -z-10 w-11/12'>
                <img src={SchoolImg} alt="SchoolImg" className='' />
            </div> */}
            {/* Parent Div */}
            <div className='bg-slate-100 backdrop-blur bg-opacity-35 p-5 shadow-xl'>
                <div className='flex justify-center items-center'>
                    <p className='text-4xl font-bold'>University Form</p>
                </div>


                {/* Parent of TimeTable Img & Form */}
                <div className='2xl:flex xl:flex xl:flex-wrap lg:flex lg:flex-wrap md:flex md:flex-wrap sm:block block justify-around items-center'>


                    {/* University Form Image */}
                    <div className='2xl:w-6/12 xl:w-6/12 lg:w-6/12 md:w-6/12 sm:w-full w-full flex justify-center items-center'>

                        <div>
                            <div className='flex justify-center items-center h-full'>
                                <img src={UniversityFormImg} alt="Scholl Time Table" className='w-96 h-auto' />
                            </div>

                            <div className='flex justify-center w-11/12'>
                                <p className='text-lg text-center'>Seamlessly design your tailored university timetable with our advanced form. Enter your details, and we'll produce a customized schedule that enhances your academic experience and helps you efficiently manage your university obligations.</p>
                            </div>
                        </div>

                    </div>


                    {/* Input Fields */}
                    <div className='2xl:w-4/12 xl:w-4/12 md:w-4/12 sm:w-full w-full'>
                        {/* Parent Input Field */}
                        <div className=''>
                            <div className='mt-4'>
                                <label className='block text-lg mb-2 font-semibold'>Numbers of Teachers:</label>
                                <input
                                    type="number"
                                    value={teachers}
                                    onChange={handleTeachers}
                                    className='border-none focus:outline-none rounded-xl p-2 w-full'
                                    placeholder='numbers of teachers'
                                />
                            </div>

                            {/* ************************************************** */}

                            <div className='mt-4'>
                                <label className='block text-lg mb-2 font-semibold'>Number of lectures per day:</label>
                                <input
                                    type="number"
                                    value={lectures}
                                    onChange={handleLectures}
                                    className='border-none focus:outline-none rounded-xl p-2 w-full'
                                    placeholder='lectures per day'
                                />
                            </div>
                        </div>

                        {/* Parent Input Field */}
                        <div className=''>
                            <div className='mt-4'>
                                <label className='block text-lg mb-2 font-semibold'>Time slot:</label>
                                <input
                                    type="text"
                                    value={timeSlot}
                                    onChange={handleTimeSlot}
                                    className='border-none focus:outline-none rounded-xl p-2 w-full'
                                    placeholder='time slot'
                                />
                            </div>

                            {/* ************************************************** */}

                            <div className='mt-4'>
                                <label className='block text-lg mb-2 font-semibold'>Number of classrooms:</label>
                                <input
                                    type="number"
                                    value={classrooms}
                                    onChange={handleclassrooms}
                                    className='border-none focus:outline-none rounded-xl p-2 w-full'
                                    placeholder='number of classrooms'
                                />
                            </div>
                        </div>

                        {/* Parent Input Field */}
                        <div className=''>
                            <div className='mt-4'>
                                <label className='block text-lg mb-2 font-semibold'>Working Days:</label>
                                <input
                                    type="text"
                                    value={workingDays}
                                    onChange={handleWorkingDays}
                                    className='border-none focus:outline-none rounded-xl p-2 w-full'
                                    placeholder='working days'
                                />
                            </div>

                            {/* ************************************************** */}

                            {/* <div className='mt-4'>
        <label className='block text-lg mb-2'>Number of classrooms:</label>
        <input
            type="number"
            value={classrooms}
            onChange={handleclassrooms}
            className='border-2 border-black rounded-xl p-2 w-full'
        />
    </div> */}
                        </div>


                        {/* Button */}
                        <div className='flex justify-between items-center'>
                        <div>
                        {displayMessage && <div className='mt-4'><p className='bg-green-400 text-green-800 opacity-80 text-center p-2 text-sm rounded-lg'>Submitted! Please Go Down ▼</p></div>}
                        </div>
                        <div className='flex justify-center items-center'>
                            {loader ? (<div className='flex justify-center items-center bg-blue-500 p-2 mt-4 w-44 rounded-lg'><ClipLoader color='white' size={24}/></div>) : (<button onClick={handleSubmit} className='bg-blue-500 p-2 mt-4 w-44 rounded-lg text-white hover:bg-blue-600'>Send</button>)}
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        {displayTableScetion && (
            <Table teachers={+teachers} lectures={+lectures}/>
        )}
        </div>
    );
};

export default UniversityForm;
