import React, { useState } from 'react'

const DropDown = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState('Select an option');
      
        const toggleDropdown = () => setIsOpen(!isOpen);
        const handleSelect = (option) => {
          setSelected(option);
          setIsOpen(false);
        };
  return (
    <div className='my-20 mx-10'>
    <div className="relative inline-block text-center">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selected}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.29l3.71-3.08a.75.75 0 111.01 1.12l-4.25 3.43a.75.75 0 01-1.02 0l-4.25-3.43a.75.75 0 010-1.12z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <ul className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <li>
            <button
              onClick={() => handleSelect('Option 1')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              School
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelect('Option 2')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              College
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelect('Option 3')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              University
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelect('Option 3')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Office
            </button>
          </li>
        </ul>
      )}
    </div>
    </div>
  )
}

export default DropDown
