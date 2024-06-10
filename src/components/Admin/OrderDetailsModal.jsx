import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function OrderDetailsModal({ open, handleClose, order }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-details-modal-title"
      aria-describedby="order-details-modal-description"
    >
      <Box sx={style}>
        <div className='items-center m-auto w-full rounded-xl  p-2  pointer-events-auto'>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center text-xl font-bold mt-2 mb-2'>
              <h1>Order Details</h1>
            </div>
            <div className='text-center'>
            <p className='text-lg mb-2 mt-1'>Product name :{order.product.productname}</p>
              <p className='text-lg mb-2 mt-1'>Order Number :#{order?._id.slice(7,12)}</p>
              <p className='text-lg mb-2 mt-1'>Order Created At :{order.purchaseDate.slice(0, 10)}</p>
               <p className='text-lg mb-2 mt-1'>Total :${order?.amount}</p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex justify-center text-xl font-bold mt-2 mb-2'>
              <h1>Shipping Address</h1>
            </div>
            <div>
              <p className='text-lg mb-2 mt-1'>{order?.address?.address_line1}</p>
              <p className='text-lg mb-2 mt-1'>{order?.address?.address_line2}</p>
              <p className='text-lg mb-2 mt-1'>{order?.address?.pincode}</p>
              <p className='text-blue-400 mb-2 mt-1'>{order?.address?.phone_number}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-4 ">
          <button 
            onClick={handleClose} 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            OK
          </button>
          <button 
            onClick={handleClose}  
            type="button" 
            className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}

OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default OrderDetailsModal;
