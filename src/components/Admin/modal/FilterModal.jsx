import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

const FilterModal = ({isOpen,setIsOpen}) => {
  

  

  return (
    <div className="relative inline-block text-left">
      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className='flex justify-between m-2'>
            <h3>Filter</h3>
        <IoIosCloseCircle className='text-red-500' size={17} onClick={()=>setIsOpen(false)} />
        </div>
        <div className="py-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 1</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 2</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 3</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 4</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Item 5</a>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
