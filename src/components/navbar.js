import React from "react";
import { useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './index.css';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Companies', href: '#', current: false },
  { name: 'Interview Experiences', href: '#', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  let navigate = useNavigate();
      
  const callVotePage = async () => {
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
        document.getElementById('userimg').style.lineHeight=0;
        document.getElementById('userimg').className="h-8.5 w-9 rounded-full";  
        var str = data.name;
        if(str.indexOf(" ")!==-1){
        document.getElementById('userimg').dataset.letters=(((str[0]+str[str.indexOf(" ")+1]).toUpperCase()).toString());}
        else{
        document.getElementById('userimg').dataset.letters=(((str[0]).toUpperCase()).toString());
        }}

    }catch (err) {
        console.log(err);
        var btn=document.getElementsByClassName('bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white')[0];
        btn.outerHTML = btn.outerHTML.replace(/button/g,"a");
    }
}

  const SignOut = async () =>{
  try{
    const res = await fetch('/logout', {
        method:"GET",
        headers: {
            Accept:"application/json",
            "Content-Type" : "application/json"
        },
        credentials:"include"
    });

    if(!res.status === 401){
        const error = new Error(res.error);
        console.log(error);
        throw error;
    }else{
      window.alert('logged out successfully');
      document.getElementById('userimg').className="h-8.5 w-9 rounded-full fas fa-user";
      var btn=document.getElementsByClassName('bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white')[0];
      btn.outerHTML = btn.outerHTML.replace(/button/g,"a");
      navigate("/");
    }

  }catch (err) {
      console.log(err);
}
}

useEffect(() => {
    callVotePage();
});

    return (
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
            <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
              <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="data:image/png;base64,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"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="data:image/png;base64,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"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
    
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button id="dropdownmenu" href="/login" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <div
                            id="userimg"
                            className="h-8.5 w-9 rounded-full fas fa-user"
                            alt="profile"
                            
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/profile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={SignOut}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
    
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )
}