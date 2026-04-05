import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useState } from 'react';

const Navbar = ({ setOpen, loadAnswers }) => {
    const {backendUrl} = useContext(AppContext)
    const submitExamHandler = async () => {
        try {
            const confirmSubmit = window.confirm("Are you sure to submit?");
            if (!confirmSubmit) return;

            const { data } = await axios.post(
            `${backendUrl}/exam/submit`,
            {},
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            );

            if (data.success) {
            alert("Exam Submitted!");
            loadAnswers()
            console.log(data.result);

            // redirect to result page
            // navigate("/result", { state: data.result });
            }

        } catch (error) {
            console.log(error);
        }
    };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className='flex items-center justify-between md:py-3 px-5 max-sm:pt-3'>
      <div className='flex gap-4 items-center'>
        <RiMenuUnfoldLine onClick={() => setOpen(prev => !prev)} className='text-[30px] cursor-pointer'/>
        <h1 className='text-[20px ] font-medium'>Exam Prep</h1>
        <button onClick={()=>logout()} className='bg-red-100 rounded-md p-2 text-red-500 text-sm font-medium ml-2 cursor-pointer'>Logout</button>
      </div>
      <button onClick={submitExamHandler} className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition">Submit</button>
    </div>
  )
}

export default Navbar
