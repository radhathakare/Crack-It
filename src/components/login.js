import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState} from 'react';
import './index.css';
import Navbar from './navbar';
import Footer from "./footer";

export default function Login() {
  let navigate = useNavigate();

    const [user, setUser] = useState({
        email:"", pass:"" 
    });
    
    let name, value;
    const Input = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});}

    const SendData = async (e) => {
        e.preventDefault();

        const{email, pass} = user;

        const res = await fetch("/login", {method:"POST", headers:{"Content-Type" : "application/json"}, 
        body:JSON.stringify({
            email, pass
        })
        });

        const data = await res.json();
        if(res.status === 400 || !data){
            window.alert ("Invalid Credentials!");
            // console.log("Invalid Credentials!");
            navigate("/login");
        }else{
            navigate("/");
            window.alert ("Login Successful");
            // console.log("Login Successful");
        }

    }

  function showhide() {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }  
  }
  
    return (
        <>
        <Navbar />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
  <body>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Welcome Back
        </div>
        <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to access your account
        </div>

        <div class="mt-10">
          <form method='POST' onSubmit={SendData}>
            <div class="flex flex-col mb-5">
              <label for="email" class="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i class="fas fa-at text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="email"
                  onChange={Input}
                  value={user.email}
                  name="email"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your email (@vit.edu)"
                  required
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Password:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <i class="fas fa-lock text-blue-500" ></i>
                  </span>
                  
                </div>

                <input
                  id="pass"
                  type="password"
                  onChange={Input}
                  value={user.pass}
                  name="pass"
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your password"
                  required
                />
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    right-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span onClick={showhide}>
                    <i class="fas fa-eye" ></i>
                  </span>
                  
                </div>
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">Sign In</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="flex justify-center items-center mt-6">
        <div class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
          <span class="ml-2">You don't have an account?<a href="/signup" class="text-xs ml-2 text-blue-500 font-semibold">Register now</a></span>
        </div>
      </div>
    </div>
  </body>
      <Footer />
</>
    );
}