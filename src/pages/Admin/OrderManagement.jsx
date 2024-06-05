import * as React from 'react';
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

function createData(orderId, customerName, date, status) {
  return { orderId, customerName, date, status };
}

const rows = [
  createData(1, 'John Doe', '2024-06-01', 'Completed'),
  createData(2, 'Jane Smith', '2024-06-02', 'Pending'),
  createData(3, 'Sam Johnson', '2024-06-03', 'Shipped'),
];



export default function OrderManagement() {
  const [value, setValue] = React.useState(0);
  const [allOrders,setAllOrders] = React.useState([]);
  const [bulkOrders,setBulkOrders] = React.useState([]);
  const [preOrders,setPreOrders] = React.useState([]);

  React.useEffect(()=>{
    fetchAllOrders()
},[])
    const fetchAllOrders = async ()=>{
        try {
            const response = await api.get('/orders')
            if(response.status===200){
                const orders = response.data.orders;
                setAllOrders(orders);
                const bulkOrders = orders.filter(order => order.bulkOrder);
                setBulkOrders(bulkOrders);
    

                const preOrders = orders.filter(order => order.preOrder);
                setPreOrders(preOrders);
            }
            console.log(response,'allOrder')
        } catch (error) {
            console.log(error,'error all orders')
        }
    }

 
    

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]'>
      <div className='mt-2 min-h-screen'>
        <AdminSidebar />
      </div>
      <Box sx={{ width: '100%' }}>
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
          {allOrders.map((orders,index) => (
            <TableRow key={orders.orderId}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{orders.userId?.first_name}</TableCell>
              <TableCell>{orders.userId?.pin_number}</TableCell>
              <TableCell>{orders.address?.address_line1}</TableCell>
              <TableCell>{orders.purchaseDate.slice(0, 10)}</TableCell>
              <TableCell>{orders.deliveryStatus}</TableCell>
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
        {bulkOrders.map((orders,index) => (
            <TableRow key={orders.orderId}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{orders.userId?.first_name}</TableCell>
              <TableCell>{orders.userId?.pin_number}</TableCell>
              <TableCell>{orders.address?.address_line1}</TableCell>
              <TableCell>{orders.purchaseDate.slice(0, 10)}</TableCell>
              <TableCell>{orders.deliveryStatus}</TableCell>
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
        {preOrders.map((orders,index) => (
            <TableRow key={orders.orderId}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{orders.userId?.first_name}</TableCell>
              <TableCell>{orders.userId?.pin_number}</TableCell>
              <TableCell>{orders.address?.address_line1}</TableCell>
              <TableCell>{orders.purchaseDate.slice(0, 10)}</TableCell>
              <TableCell>{orders.deliveryStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
