import React from "react";
import {useNavigate} from 'react-router-dom';
import { useEffect} from 'react';
import './index.css';
import Navbar from './navbar';
import Footer from "./footer";

export default function UserInfo(){
    let navigate = useNavigate();
    const callUserPage = async () => {
        try{
            const res = await fetch('/auth', {
                method:"GET",
                headers: {
                    Accept:"application/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            if(!res.status === 401 || !data){
                const error = new Error(res.error);
                console.log(error);
                throw error;
            }else{
                document.getElementById('name').innerHTML=data.name;
                document.getElementById('email').innerHTML=data.email;
                var str = data.name;
                if(str.indexOf(" ")!==-1){
                    document.getElementById('profileimg').innerHTML=(((str[0]+str[str.indexOf(" ")+1]).toUpperCase()).toString());}
                else{
                    document.getElementById('profileimg').innerHTML=(((str[0]).toUpperCase()).toString());
                }
            }

        }catch (err) {
            console.log(err);
            navigate("/login");
            window.alert("please login first");
        }
    }

    useEffect(() => {
        callUserPage();
        
    });

    return(
        <>
        <Navbar />
        <div class="bg-white block py-10">
    <div class="max-w-2xl mx-auto">
        <div class="w-full">
            <div class="w-full bg-blue-200 h-48 rounded-t-lg"></div>
            <div class="absolute -mt-20 ml-5">
                <div class="bg-gray-200 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary" id="profileimg"></div>
            </div>
        </div>
        <div class="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
            <div class="mb-1" id="name"></div>
            <div class="mb-1" id="email"></div>
            <div class="text-sm mt-2 text-gray-200">
                <div class="flex flex-row ml-auto space-x-2 items-center">
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                    <div class="bg-blue-200 rounded-full h-1 w-1"></div>
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                </div>
            </div>

            <div class="pt-8 flex gap-8">
                <div class="flex flex-col">
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                </div>
                <div class="flex flex-col">
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                </div>
                <div class="flex flex-col">
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                    <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
                </div>
            </div>
            <div class="py-5 break-all bbcode">
                <div class="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
                <div class="mb-1 bg-red-200 border border-gray-300 h-5 w-full h-40"></div>
            </div>
        </div>
    </div>
    </div>
<Footer />
        </>
    )
}