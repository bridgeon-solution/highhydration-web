import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { TfiEmail } from "react-icons/tfi";
import { FaPhone } from "react-icons/fa";
import { SiAdblock } from "react-icons/si";
import { RiUserSettingsFill } from "react-icons/ri";
import api from "../../../axiosInterceptors";
import toast from "react-hot-toast";
import adminApi from "../../../pages/Admin/utils/axiosInterceptors";

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
const SupplierMangementModal = ({ handleClose, isOpen, fethcData }) => {
    const [seletedValue,setSeletedValue]=useState('')

    const handleChange=(e)=>{
        setSeletedValue(e.target.value)
        
    }
    console.log(seletedValue);

    const handleSubmit=async()=>{
        try {
            if(setSeletedValue){
                const response=await adminApi.patch('/role/',{value:seletedValue,supplierId:isOpen?._id})
                if(response.status==200){
                    toast.success('Updated',{seletedValue})
                    handleClose(false)
                    fethcData()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
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
            <ModalContent className="flex flex-col justify-between">
                <div className=" w-full">
                    <div className=" pt-2">
                        <div>
                        <img className="w-20 h-20 rounded-full mt-4 mx-4" src={isOpen?.profile_pic||"https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} alt="" />
                        <div className="w-full  text-end">
                            <select name="" id="" className="mx-5 p-1 border rounded-full px-2" onChange={handleChange}>
                            {isOpen?.roles ==="admin"?<option value="admin">Admin</option>:<option value="supplier">Supplier</option>}
                            {isOpen?.roles !=="admin"?<option value="admin">Admin</option>:<option value="supplier">Supplier</option>}
                                
                                
                            </select>
                        </div>
                        </div>
                        <div>
                        <h3 className="mx-4 mt-4">{isOpen?.first_name} {isOpen?.last_name}</h3>
                        <p  className=" mx-4 mt-1 flex items-center gap-2 mb-2"> <SiAdblock />:{isOpen?.is_blocked?<div className="bg-red-500 h-3 w-3"></div>:<div className="bg-green-500 h-3 w-3 rounded-full"></div>}</p>
                        <p  className=" mx-4 mt-1 flex items-center gap-2 mb-2"><TfiEmail /> : {isOpen?.email}</p>
                        <p  className=" mx-4 mt-1 flex items-center gap-2 mb-2"><FaPhone /> : {isOpen?.phone_number}</p>
                        <p  className=" mx-4 mt-1 flex items-center gap-2 mb-2"><RiUserSettingsFill /> : {isOpen?.roles}</p>
                        </div>
                    </div>
                </div>
                <div className=" w-full  flex justify-end gap-3 mb-4 ">
                    <button className="border p-2 px-4 rounded-2xl bg-red-500 text-white hover:bg-red-800 ">Close</button>
                    <button className="border p-2 px-4 mx-2  rounded-2xl bg-blue-600 text-white hover:bg-blue-800" onClick={()=>{handleSubmit()}}>Save</button>
                </div>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SupplierMangementModal;
