import { FaFilter } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

const NotificationModal = ({isOpen,setIsOpen,}) => {
  

  

  return (
    <div className="relative inline-block text-left ">
      <div
        className={`origin-top-right absolute right-0 mt-2 w-96 p-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className='flex justify-between m-2'>
            <h3 className='mx-2 flex items-center'>Notification</h3> 
        <IoIosCloseCircle className='text-red-400' size={17} onClick={()=>setIsOpen(false)} />
        </div>
        <div className="py-1">
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti aperiam beatae a quis error eius natus necessitatibus, inventore eum officiis pariatur ratione, voluptates non, voluptatibus debitis incidunt quibusdam velit dolores!</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;