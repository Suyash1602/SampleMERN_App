import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
    let [errMsg, setErrMsg] = useState("");
    let { register, handleSubmit, formState: { errors } } = useForm()
    let navigate = useNavigate();

    let gender = ['male', 'female', 'other']

    let states = ['Maharashtra', 'Andhra Pradesh', 'Others']

    let formSubmit = async (userObj) => {
        // https post request
        let res = await axios.post("http://localhost:4000/user/create-user", userObj)

        if (res.data.message === "User created") {
            // navigate to sign in page
            navigate("/signin")
        } else {
            setErrMsg(res.data.message)
        }
    }



    return (
        <>
            <h1 className="text-center bg-primary p-3 text-white">SignUp page</h1>
            {/* sign up form */}
            <div className="container w-50">
                <div className='Signup pb-5'>
                    <div className='container text-left bg-dark shadow-lg rounded p-3 form-wrapper mb-5' >

                        {/* Duplicate user message */}
                        {errMsg !== "" && <p className="text-danger fw-bold">{errMsg}</p>}

                        {/* form */}
                        <form className='form text-left' onSubmit={handleSubmit(formSubmit)}>
                            {/* username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-semibold text-white">Username</label>
                                <input type="text" id="username" placeholder='UserName' className="form-control" {...register("username", { required: true, minLength: 4, maxLength: 6 })}></input>
                                {/* validation error message */}
                                {errors.username?.type === 'required' && <p className='text-danger mt-1'>Username is required</p>}
                                {errors.username?.type === 'minLength' && <p className='text-danger mt-1'>Minimum length should be 4</p>}
                                {errors.username?.type === 'maxLength' && <p className='text-danger mt-1'>Maximun length should be 6</p>}
                            </div>

                            {/* password */}
                            <div className='mb-4'>
                                <label htmlFor='password' className='form-label fw-semibold text-white'>Password</label>
                                <input type='password' id='password' placeholder='Password' className='form-control' {...register("password", { required: true })}></input>
                                {/* validation error message */}
                                {errors.password?.type === 'required' && <p className='text-danger mt-1'>Password is required</p>}
                            </div>

                            {/* date of birth */}
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label fw-semibold text-white">DOB</label>
                                <input type="date" id="dob" className="form-control" {...register("dob", { required: true })}></input>
                                {/*validation error message  */}
                                {errors.dob?.type === 'required' && <p className='text-danger mt-1'>Date is required</p>}
                            </div>

                            {/* gender */}
                            <div className='mb-3'>
                                <label htmlFor="gen" className="form-label fw-semibold text-white">Gender</label>
                                {
                                    gender.map((gen, index) => {
                                        return (
                                            <div className='form-check' key={index}>
                                                <input type='radio'
                                                    id={gen}
                                                    className='form-check-input'
                                                    value={gen}
                                                    {...register('gender', { required: true })}>
                                                </input>
                                                <label htmlFor={gen} className="form-check-label fw-semibold text-white">{gen}</label>
                                            </div>
                                        )
                                    })
                                }
                                {errors.gender?.type === 'required' && <p className='text-danger mt-1'>Gender is required</p>}
                            </div>

                            {/* select state */}
                            <div className='mb-3'>
                                {/* select */}
                                <select className="form-select" id='state' {...register('state', { required: true })}>
                                    <option selected>Select state...</option>
                                    <option value={states[0]}>Maharashtra</option>
                                    <option value={states[1]}>Andhra Pradesh</option>
                                    <option value={states[2]}>Others</option>
                                </select>
                                {errors.state?.type === 'required' && <p className='text-danger mt-1'>State is required</p>}
                            </div>

                            {/* submit button */}
                            <div className='container text-center'>
                                <button type='submit' className='btn btn-success my-4 text-center'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}

export default SignUp