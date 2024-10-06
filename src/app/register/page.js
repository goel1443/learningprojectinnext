'use client';
import React from 'react';
import { Formik } from 'formik';
import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function Register() {
    const router = useRouter()
    const handleRegister = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}user/signup`, {
                name: values.name,
                country: values.country,
                email: values.email,
                password: values.password,
                confirm_password: values.confirmpassword,
                direct_sponser_id: values.sponser,
            });

            if (response.status === 200 && response.data.status_code === "0") {
                toast.error(response.data.message || "Something went wrong!");
            } if(response.status === 200 && response.data.status_code === "1"){
                toast.success(response.data.message);
                router.push('/')
            }
           
        } catch (error) {
            toast.error("An error occurred during registration.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="h-screen bg-zinc-800 flex flex-col items-center justify-center">
            <ToastContainer />
            <Formik
                initialValues={{ email: '', name: '', country: '', confirmpassword: '', password: '', sponser: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.name) {
                        errors.name = 'Name is required';
                    }
                    if (!values.country) {
                        errors.country = 'Country is required';
                    }
                    if (!values.confirmpassword) {
                        errors.confirmpassword = 'Confirm Password is required';
                    } else if (values.confirmpassword !== values.password) {
                        errors.confirmpassword = 'Password and Confirm Password must match';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    if (!values.sponser) {
                        errors.sponser = 'sponser is required';
                    }
                    return errors;
                }}
                onSubmit={handleRegister}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className="flex max-w-md w-full flex-col gap-4 bg-white p-5 rounded-lg">
                        <div>
                            <Label htmlFor="name" value="Your name" />
                            <TextInput id="name" type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                            {errors.name && touched.name && <span className='text-red-500'>{errors.name}</span>}
                        </div>

                        <div>
                            <Label htmlFor="email1" value="Your email" />
                            <TextInput id="email1" type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            {errors.email && touched.email && <span className='text-red-500'>{errors.email}</span>}
                        </div>

                        <div>
                            <Label htmlFor="password" value="Your password"  />
                            <TextInput id="password" autoComplete='off' type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            {errors.password && touched.password && <span className='text-red-500'>{errors.password}</span>}
                        </div>

                        <div>
                            <Label htmlFor="confirmpassword" value="Confirm Password" />
                            <TextInput id="confirmpassword" autoComplete='off' type="password" name="confirmpassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmpassword} />
                            {errors.confirmpassword && touched.confirmpassword && <span className='text-red-500'>{errors.confirmpassword}</span>}
                        </div>

                        <div>
                            <Label htmlFor="country" value="Your country" />
                            <TextInput id="country" type="text" name="country" onChange={handleChange} onBlur={handleBlur} value={values.country} />
                            {errors.country && touched.country && <span className='text-red-500'>{errors.country}</span>}
                        </div>

                        <div>
                            <Label htmlFor="sponser Id" value="Your sponser" />
                            <TextInput id="sponser" type="text" name="sponser" onChange={handleChange} onBlur={handleBlur} value={values.sponser} />
                            {errors.sponser && touched.sponser && <span className='text-red-500'>{errors.sponser}</span>}
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
}
