
"use client";
import { Formik } from 'formik';
import { Button, Label, TextInput } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/slices/auth/loginSlices';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router=useRouter()
  const dispatch = useDispatch()
  const handleLogin = (values) => {
  
    
    // console.log('JATIN' , values.sponser);
    

    dispatch(loginUser( {password : values.password,sponser : values.sponser, router:router}))
  }
  return (
    <div className="h-screen bg-zinc-800 flex flex-col items-center justify-center">
      <Formik
        initialValues={{ password: '',sponser:'' }}
        validate={values => {
          const errors = {};

          if (!values.password) {
            errors.password = 'Password is required'
          }
          if (!values.sponser) {
            errors.sponser = 'sponser is required'
          }
          return errors;
        }}

        onSubmit={(values) => handleLogin(values)}
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
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput autoComplete="off" id="password" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
            </div>
            {(errors.password && touched.password) &&
              <span className='text-red-500'>{errors.password}</span>
            }


            <div>
              <Label htmlFor="sponser Id" value="Your sponser" />
              <TextInput id="sponser" type="text" name="sponser" onChange={handleChange} onBlur={handleBlur} value={values.sponser} />
              {errors.sponser && touched.sponser && <span className='text-red-500'>{errors.sponser}</span>}
            </div>
            <Button type="submit" disabled={isSubmitting}>Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
