import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import api from '../../axiosInterceptors';
import OrderDetailsModal from '../../components/Admin/OrderDetailsModal';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OrderManagement() {
  const [value, setValue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await api.get('/orders');
      if (response.status === 200) {
        const orders = response.data.orders;
        setAllOrders(orders);
        const bulkOrders = orders.filter(order => order.bulkOrder);
        setBulkOrders(bulkOrders);
        const preOrders = orders.filter(order => order.preOrder);
        setPreOrders(preOrders);
      }
      console.log(response, 'allOrder');
    } catch (error) {
      console.log(error, 'error all orders');
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]'>
      <div className='mt-2 min-h-screen'>
        <AdminSidebar />
      </div>
      <Box sx={{ width: '100%', overflow: 'scroll' }}>
        <div className='flex justify-center'>
          <h1 className='pt-4 pl-2'>Orders</h1>
        </div>
        <hr />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Bulk Orders" {...a11yProps(1)} />
            <Tab label="Pre Orders" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className='bg-[#0E2C72] '>
                <TableRow>
                  <TableCell className='text-white '>No</TableCell>
                  <TableCell className='text-white '>Customer Name</TableCell>
                  <TableCell className='text-white '>Pincode</TableCell>
                  <TableCell className='text-white '>Address</TableCell>
                  <TableCell className='text-white '>Date</TableCell>
                  <TableCell className='text-white '>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allOrders.map((order, index) => (
                  <TableRow key={order.orderId} onClick={() => handleRowClick(order)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.userId?.first_name}</TableCell>
                    <TableCell>{order.userId?.pin_number}</TableCell>
                    <TableCell>{order.address?.address_line1}</TableCell>
                    <TableCell>{order.purchaseDate.slice(0, 10)}</TableCell>
                    <TableCell>{order.deliveryStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className='bg-[#0E2C72] '>
                <TableRow>
                  <TableCell className='text-white '>No</TableCell>
                  <TableCell className='text-white '>Customer Name</TableCell>
                  <TableCell className='text-white '>Pincode</TableCell>
                  <TableCell className='text-white '>Address</TableCell>
                  <TableCell className='text-white '>Date</TableCell>
                  <TableCell className='text-white '>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bulkOrders.map((order, index) => (
                  <TableRow key={order.orderId} onClick={() => handleRowClick(order)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.userId?.first_name}</TableCell>
                    <TableCell>{order.userId?.pin_number}</TableCell>
                    <TableCell>{order.address?.address_line1}</TableCell>
                    <TableCell>{order.purchaseDate.slice(0, 10)}</TableCell>
                    <TableCell>{order.deliveryStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='bg-[#0E2C72] '>
                  <TableRow>
                    <TableCell className='text-white '>No</TableCell>
                    <TableCell className='text-white '>Customer Name</TableCell>
                    <TableCell className='text-white '>Pincode</TableCell>
                    <TableCell className='text-white '>Address</TableCell>
                    <TableCell className='text-white '>Date</TableCell>
                    <TableCell className='text-white '>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {preOrders.map((order, index) => (
                    <TableRow key={order.orderId} onClick={() => handleRowClick(order)}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.userId?.first_name}</TableCell>
                      <TableCell>{order.userId?.pin_number}</TableCell>
                      <TableCell>{order.address?.address_line1}</TableCell>
                      <TableCell>{order.purchaseDate.slice(0, 10)}</TableCell>
                      <TableCell>{order.deliveryStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomTabPanel>
        </Box>
        {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          open={modalOpen}
          handleClose={handleClose}
        />
      )}
      </div>
     
    
  );
}
