import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import { userLoginLifeCycle } from '../store/slices/userLoginSlice'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    let { register, handleSubmit, formState: { errors } } = useForm()

    let { userObj, isSuccess, isError, errMessage } = useSelector(state => state.userLogin)
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let formSubmit = (userCredObj) => {
        let actionObj = userLoginLifeCycle(userCredObj)
        dispatch(actionObj)
    }

    useEffect(() => {
        if (isSuccess)
            navigate(`/userprofile/${userObj.username}`)
    }, [isSuccess, isError])


    return (
        <>
            <h1 className="text-center bg-primary p-3 text-white ">SignIn page</h1>

            {/* sign in form */}
            <div className="container w-50 m-auto">
                <div className='Signup pb-5'>
                    <div className='container text-left bg-dark shadow-lg rounded p-3 form-wrapper mb-5' >

                        {/* invalid username and password msg */}
                        {isError === true && <p className="alert alert-danger text-center fw-bold">{errMessage}</p>}

                        {/* form */}
                        <form className='form text-left' onSubmit={handleSubmit(formSubmit)}>
                            {/* username */}
                            <div className="mb-3">
                                <label htmlFor="username" placeholder='Username' className="form-label fw-semibold text-white">Username</label>
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

                            {/* submit button */}
                            <div className='container text-center'>
                                <button type='submit' className='btn btn-success my-4 text-center'>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </>
    )
}

export default SignIn