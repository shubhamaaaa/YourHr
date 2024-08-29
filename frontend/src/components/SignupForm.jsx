import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0],
        });
    };

    const URL = 'http://localhost:3000'; 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        if (formData.resume) {
            data.append('resume', formData.resume);
        }
    
        try {
            await axios.post(`${URL}/api/signup`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Signup successful!');
        } catch (err) {
            console.error(err);
            alert('Signup failed: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <form className='lg:h-[450px] h-[300px] w-[330px] lg:w-[450px] border font-semibold border-gray-800 rounded-xl m-auto mt-10  lg:mx-auto lg:mt-20  flex flex-col items-center justify-center bg-gray-300 hover:bg-green-300' onSubmit={handleSubmit}>
            <h1 className='lg:mb-10 text-lg font-bold mb-6'>YOURHR</h1>
            <div className='mt-3 lg:space-y-3 space-y-2 space-x-2'>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" name="phone" onChange={handleChange} required />
            </div>
            <div>
                <label>Resume:</label>
                <input  type="file" name="resume" onChange={handleFileChange} required />
            </div>
            </div>
            <button className='mt-5 border border-gray-500 rounded-xl p-2 bg-blue-700 hover:bg-blue-400 font-bold' type="submit">Sign Up</button>
            
        </form>
    );
}

export default SignupForm;
