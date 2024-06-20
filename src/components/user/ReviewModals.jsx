import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../axiosInterceptors";

const ReviewModals = ({ props, setReviewProduct, starRate,setStarRate,prodid,orderId}) => {
    const [error,setError]=useState()
    const userId=localStorage.getItem('userId')
    const [value,setValue]=useState('')
    console.log(orderId,'productId',starRate,'starra');
    const handleClose = () => {
    setReviewProduct(false);
    setStarRate(prevState => {
      const newState = { ...prevState };
      delete newState[orderId];
      return newState;
  });
  };
  const handleColor = (a) => {
    switch (a) {
      case 1:
      case 2:
        return "red";
      case 3:
        return "orange";
      case 4:
        return "green";
      default:
        return "green";
    }
  };
  const handleText = (a) => {
    switch (a) {
      case 1:
      case 2:
        return "very bad";
      case 3:
        return "Avarage";
      case 4:
        return "good";
      default:
        return "very good";
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    const description = formData.get('description'); 
    if(!description){
        toast.error('fill the form')
        setError('Description')
        return 
    }else{
      try {
        const data={
          userId:userId,
          prodcutId:prodid,
          rating:starRate[orderId],
          reviewText:description
        }
        console.log(data);
        const response=await api.post('reviews',{data})
        console.log(response);
        if(response.status===201){
          setValue('')
          toast.success("success add review")
          handleClose()
        }else if(response.status===200){
          toast.error('You Olrady Reviewed This Product')
          setValue(response.data.ifExist.reviewText)
        }
      } catch (error) {
        
      }
    }

  };
  return (
    <>
    <div>
      <Modal
        show={props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Review this product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((i, index) => (
              <div key={i || index}>
                <FaStar
                  size={18}
                  className={`${
                    starRate[orderId] > index
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                />
              </div>
            ))}
            <p
              className={`text-${handleColor(
                starRate[orderId]
              )}-500 mx-2`}
            >
              {handleText(starRate[orderId])}
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleForm.ControlTextarea1"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
              onChange={(e)=>{setValue(e.target.value)}}
                id="exampleForm.ControlTextarea1"
                name="description" 
                value={value}    
                rows={3}
                className="mt-1 p-3 border  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>

            <Modal.Footer>
              {/* <Button className='text-black hover:text-white' onClick={props.onHide}>Close</Button> */}
              <button
                onClick={() => {
                  handleClose();
                }}
                className="text-red-400 p-2 rounded-lg border border-gray-100 hover:text-white hover:bg-red-400"
              >
                Close
              </button>
              <button
                type="submit"
                className="text-blue-400 p-2 rounded-lg border border-gray-100 hover:text-white hover:bg-blue-400 pl-3"
              >
                Send
              </button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </>

  );
};

export default ReviewModals;
