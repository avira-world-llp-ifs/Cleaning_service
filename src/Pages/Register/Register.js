import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../Assets/logo/logo_black.png'
import { AuthContext } from "../../Contexts/AuthProvider";
import UseTitle from "../../Hooks/UseTitle";

const Register = () => {
  UseTitle('Register')
    const { createAccount, signInwithProvider, emailVarification,
        userInformationProviding,
        setLoading, } = true;
        const navigate= useNavigate() 
        const location= useLocation()
        const from = location.state?.from?.pathname || "/";

        const googleProvider= new GoogleAuthProvider()

  
      const [error, setError] =  useState('')

    const formHandler = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl= form.photoUrl.value
        const name = form.name.value
        
        createAccount(email, password)
        .then((res) => {

          handelUserInformationProviding(name, photoUrl);
          form.reset();
          setLoading(false);
          


          const user=res.user
          setLoading(true)
          const curentUser = {
            email: user.email,
          };
    
     // JWT Token Implement
    
     fetch(`https://cleaner-guy-server.vercel.app/jwt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(curentUser),
    })
      .then((res) => res.json())
      .then((data) => {

        // Local Storage is not the best placee to  store
        localStorage.setItem("CleanerGuy", data.token);
    
        navigate(from, { replace: true });
      })
      
        })
        .catch(error => {
          setError(error.message);
          console.error(error);
          
        })
    
        .finally(()=> {
          setLoading(false)
        })
    
  
  
        const handelUserInformationProviding = (name, photoUrl) => {
          const profile = {
            displayName: name,
            photoURL: photoUrl,
          };
    
          userInformationProviding(profile)
          .then(()=> {
    
          })
          .catch(error=>{
            console.error(error);
          })
        };



      };

      const googleProviderHandler = () => {
        signInwithProvider(googleProvider)
          .then((res) => {
            const user=res.user
          setLoading(true)
          const curentUser = {
            email: user.email,
          };
    
     // JWT Token Implement
    
     fetch(`https://cleaner-guy-server.vercel.app/jwt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(curentUser),
    })
      .then((res) => res.json())
      .then((data) => {

        // Local Storage is not the best placee to  store
        localStorage.setItem("CleanerGuy", data.token);
    
        navigate(from, { replace: true });
      })
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(()=> {
            setLoading(false)
          })
          
      }


  return (
    <div>
    <div className="flex w-full max-w-sm mx-auto overflow-hidden my-32 bg-white rounded-lg shadow-lg dark:bg-green-100 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            "url('https://www.pristinehome.com.au/wp-content/uploads/2020/01/Choosing-the-Best-Professional-Home-Cleaning-Service-in-Sydney.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          <img className="w-32 mx-auto" src={logo} alt="" />
        </h2>

        {/* <p className="text-xl text-center text-black ">Thank You for Sing Up</p> */}

        <button
            onClick={googleProviderHandler }
          className="flex items-center justify-center mt-4 hover:text-white transition-colors duration-300 transform border rounded-lg dark:border-gray-700 w-full hover:bg-gray-50 dark:hover:bg-green-400"
        >
          <div  className="px-4 py-2">
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <span className="w-5/6 px-4 py-3 font-bold text-center">
            Sign in with Google
          </span>
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <Link
            to="/login"
            className="text-xs text-center text-black uppercase dark:text-gray-400 hover:underline"
          >
            Already have an Account
          </Link>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={formHandler}>
            {/* single Field  */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-black "
              forhtml="LoggingEmailAddress"
            >
              Name
            </label>
            <input
              id="LoggingEmailAddress"
              name="name"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-green-100  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-black "
              forhtml="LoggingEmailAddress"
            >
              Your Photo Url
            </label>
            <input
              id="LoggingEmailAddress"
              placeholder="https://googlephoto.com/photo.png"
              name="photoUrl"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-green-100  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
            />
          </div>

            {/* single Field  */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-black "
              forhtml="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              name="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-green-100  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-black "
                forhtml="loggingPassword"
              >
                Password
              </label>
              {/* <Link to="#" className="text-xs text-black  hover:underline">
                Forget Password?
              </Link> */}
            </div>

            <input
              id="loggingPassword"
              name="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-green-100  dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>

              <div>
              <p className="text-red-600">{error?.split(':')[1]?.split('/')[1]?.split(')')[0]}</p>
              </div>
          <div className="mt-8">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-900 rounded hover:bg-green-400 focus:outline-none focus:bg-gray-600">
              Register
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to="/termsAndCondition"
            className="text-xs text-black uppercase dark:text-gray-400 hover:underline"
          >
            terms and conditions
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;