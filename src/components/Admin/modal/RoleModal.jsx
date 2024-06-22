
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import api from '../../../axiosInterceptors';
import toast from 'react-hot-toast';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalContainer = styled(motion.div)`
  width: 45%;
  height: 45%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;
const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  h1 {
    color: #5c3aff;
    `;
    // display: flex;
    // justify-content: center;
    // align-items: center;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 }
};
const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-50%" }
};
const RoleModal = ({isOpen,handleClose}) => {
    const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState('');
  const supplierId=isOpen?._id
  // Fetch data from the backend and set the initial state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/role`,{params:{supplierId:supplierId}});
        const data = response.data;
        setPermissions(data.roles[0].permissions || []);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [supplierId]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  const validateForm = async() => {
    if (permissions.length === 0) {
      setError('At least one permission must be selected');
    } else {
      setError('');
      setSelectedPermissions(permissions);
      console.log('Selected permissions:', permissions);
      try {
        const response=await api.post('/role/',{permissions,supplierId})
        console.log(response,"this response create the role");
        if(response.status==201){
            toast.success('success Role assing')
            handleClose(false)
        }
      } catch (error) {
        console.error(error)
      }
    //   api.post(`/role/`, { permissions })
    //     .then(response => {
    //       toast.success('Permissions updated successfully');
    //     })
    //     .catch(error => {
    //       toast.error('Failed to update permissions');
    //       console.error('Error updating permissions', error);
    //     });
    }
  };
  return (
    <div>
        <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={()=>handleClose(false)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
            >
              <title>close</title>
              <line
                x1="19.39"
                y1="19.39"
                x2="1"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="19.39"
                x2="19.39"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </CloseButton>
            <ModalContent className="flex flex-col justify-between overflow-auto">
                <div className=" w-full">
                    <div className=" pt-2">
                        <div className='flex items-center'>
                        <img className="w-20 h-20 rounded-full mt-4 mx-4" src={isOpen?.profile_pic||"https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} alt="" />
                        <div className='mt-5'>
                        <h4 className='h-2'>{isOpen?.first_name}{isOpen?.last_name}</h4>
                        <p className='font-extralight text-gray-600 hidden sm:block'>{isOpen.roles}</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-5 mx-5 overscroll-auto'>
        <div className='flex items-center gap-4 mx-2 w-full sm:w-5/12 justify-between'>
          <label className='text-lg' htmlFor="supplierManagement">Supplier Management:</label>
          <input
            className='w-5 h-5'
            type="checkbox"
            value="/suppliermanagement"
            checked={permissions.includes("/suppliermanagement")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='flex items-center gap-4 mx-2 w-full sm:w-5/12 justify-between'>
          <label className='text-lg' htmlFor="userManagement">User Management:</label>
          <input
            className='w-5 h-5'
            type="checkbox"
            value="/usermanagement"
            checked={permissions.includes("/usermanagement")}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='flex items-center gap-4 mx-2 w-full sm:w-5/12 justify-between'>
          <label className='text-lg' htmlFor="supplierManagement">Payment Management:</label>
          <input
            className='w-5 h-5'
            type="checkbox"
            value="/payment"
            checked={permissions.includes("/payment")}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    

                <div className=" w-full  flex justify-end gap-3 mb-4 ">
                    <button className="border p-2 px-4 rounded-2xl bg-red-500 text-white hover:bg-red-800 " onClick={()=>handleClose(false)}>Close</button>
                    <button className="border p-2 px-4 mx-2  rounded-2xl bg-blue-600 text-white hover:bg-blue-800" onClick={validateForm} >Save</button>
                </div>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
    </div>
  )
}

export default RoleModal