
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import api from "../../axiosInterceptors";
import OrderDetailsModal from "../../components/Admin/OrderDetailsModal";
import Loader from "../../components/Loader";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FaFilter } from "react-icons/fa";
import FilterModalOrder from "../../components/Admin/modal/FilterModalOrder";
import adminApi from "./utils/axiosInterceptors";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OrderManagement() {
  const [value, setValue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [toatalpage, setTotalaPage] = useState();
  const [totalLength, setTotalLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, [params, page,filter]);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {

      const response = await adminApi.get(`/orders`, {
        params: { params: params, page, filter },
      });
      setTotalaPage(response?.data?.totalpage);
      setTotalLength(response?.data?.totalLength);
      if (response.status === 200) {
        setLoading(false);
        const orders = response.data.orders;
        if (params === "preorder") {
          setPreOrders(orders);
        } else if (params === "bulkorder") {
          console.log("hau");
          setBulkOrders(orders);
        } else {
          setAllOrders(orders);
        }
      }
      console.log(response, "allOrder");
    } catch (error) {
      console.log(error, "error all orders");
      setLoading(false);
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
  const handleClick = (p) => {
    if (p === "prev" && page > 1) {
      setPage(page - 1);
    } else if (p === "next" && page < toatalpage) {
      setPage(page + 1);
    } else if (typeof p === "number") {
      setPage(p);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(page - 2, 1);
    let endPage = Math.min(page + 3, toatalpage);
    if (endPage - startPage < 3) {
      startPage = Math.max(endPage - 3, 1);
    }
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <p
          key={i}
          onClick={() => handleClick(i)}
          className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
            page === i
              ? "bg-indigo-600 text-white"
              : "text-gray-700 hover:bg-gray-50"
          } focus:z-20 focus-visible:outline h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
        >
          {i}
        </p>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {loading && <Loader />}

      <div className="flex w-full h-screen overflow-hidden bg-[#F8F8F8]">
        <div className="mt-2 min-h-screen">
          <AdminSidebar />
        </div>
        {isOpen && (
          <FilterModalOrder
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setFilter={setFilter}
          />
        )}
        <Box sx={{ width: "100%", overflow: "scroll" }}>
          <div className="flex justify-center">
            <h1 className="pt-4 pl-2">Orders</h1>
          </div>
          <hr />
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="All"
                {...a11yProps(0)}
                onClick={() => setParams("")}
              />
              <Tab
                label="Bulk Orders"
                {...a11yProps(1)}
                onClick={() => {
                  setParams("bulkorder");
                }}
              />
              <Tab
                label="Pre Orders"
                {...a11yProps(2)}
                onClick={() => {
                  setParams("preorder");
                }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} className="z-0">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="bg-[#0E2C72] ">
                  <TableRow>
                    <TableCell className="text-white ">No</TableCell>
                    <TableCell className="text-white ">Customer Name</TableCell>
                    <TableCell className="text-white ">Pincode</TableCell>
                    <TableCell className="text-white ">Address</TableCell>
                    <TableCell className="text-white ">Date</TableCell>
                    <TableCell className="text-white flex items-center justify-between">
                      Status
                      <div className="flex items-center float-right mx-1">
                        {!isOpen && (
                          <FaFilter
                            className="text-white"
                            size={16}
                            onClick={() => setIsOpen(true)}
                          />
                        )}
                        {isOpen && (
                          <FilterModalOrder
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setFilter={setFilter}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allOrders.map((order, index) => (
                    <TableRow
                      key={order.orderId}
                      onClick={() => handleRowClick(order)}
                    >
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
                <TableHead className="bg-[#0E2C72] ">
                  <TableRow>
                    <TableCell className="text-white ">No</TableCell>
                    <TableCell className="text-white ">Customer Name</TableCell>
                    <TableCell className="text-white ">Pincode</TableCell>
                    <TableCell className="text-white ">Address</TableCell>
                    <TableCell className="text-white ">Date</TableCell>
                    <TableCell className="text-white flex items-center justify-between">
                      Status
                      <div className="flex items-center float-right mx-1">
                        {!isOpen && (
                          <FaFilter
                            className="text-white"
                            size={16}
                            onClick={() => setIsOpen(true)}
                          />
                        )}
                        {isOpen && (
                          <FilterModalOrder
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setFilter={setFilter}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bulkOrders.map((order, index) => (
                    <TableRow
                      key={order.orderId}
                      onClick={() => handleRowClick(order)}
                    >
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
                <TableHead className="bg-[#0E2C72] ">
                  <TableRow>
                    <TableCell className="text-white ">No</TableCell>
                    <TableCell className="text-white ">Customer Name</TableCell>
                    <TableCell className="text-white ">Pincode</TableCell>
                    <TableCell className="text-white ">Address</TableCell>
                    <TableCell className="text-white ">Date</TableCell>
                    <TableCell className="text-white flex items-center justify-between">
                      Status
                      <div className="flex items-center float-right mx-1">
                        {!isOpen && (
                          <FaFilter
                            className="text-white"
                            size={16}
                            onClick={() => setIsOpen(true)}
                          />
                        )}
                        {isOpen && (
                          <FilterModalOrder
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            setFilter={setFilter}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {preOrders.map((order, index) => (
                    <TableRow
                      key={order.orderId}
                      onClick={() => handleRowClick(order)}
                    >
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
          <div className="flex justify-end mx-4">
            <nav
              className="isolate inline-flex  -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                onClick={() => handleClick("prev")}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <div>{renderPageNumbers()}</div>

              <a
                onClick={() => handleClick("next")}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </Box>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            open={modalOpen}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}
