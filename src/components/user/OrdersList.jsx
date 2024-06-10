import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../axiosInterceptors";
import OrderModal from "./OrderModal";
import { FaStar } from "react-icons/fa";
import ReviewModals from "./ReviewModals";

const OrdersList = () => {
  const userid = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [modal, setmodal] = useState(false);
  const [product, setProduct] = useState();
  const [showAll, setShowAll] = useState(0);
  const [starRate, setStarRate] = useState(0);
  const [reviewProduct, setReviewProduct] = useState(false);
  const [desablebutton,setDesableButton]=useState([])

  const orderfetch = async () => {
    try {
      const response = await api.get(`/orders/order/${userid}`);
      setOrders(response.data.order);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    orderfetch();
  }, []);
  const handelDetalis = (id) => {
    setProduct(orders.find((i) => i._id === id));
    setmodal(true);
  };
  const statusColors = {
    ordered: "blue",
    in_transit: "yellow",
    delivered: "green",
    cancelled: "red",
  };
  const colourpicker = (status) => {
    return statusColors[status] || "gray";
  };
  const handleStarClick = (rating, productId) => {
    setStarRate((prevRatings) => ({
      ...prevRatings,
      [productId]: prevRatings[productId] === 1 && rating === 1 ? 0 : rating,
    }));
  };
  return (
    <>
      <div>
        {reviewProduct && (
          <ReviewModals
            props={reviewProduct}
            setReviewProduct={setReviewProduct}
            starRate={starRate}
            setStarRate={setStarRate}
          />
        )}
        {modal && (
          <OrderModal
            props={product}
            setModal={setmodal}
            orderfetch={orderfetch}
          />
        )}
        <div className="w-full  flex justify-center">
          <h1 className="text-4xl text-[#2D416E] font-semibold mb-6 mt-3">
            Order Details
          </h1>
        </div>
        {orders?.map((order, index) => (
          <div key={order?._id || index} className="mb-5 mx-auto mt-3">
            <div className="relative flex flex-col md:flex-row md:space-x-5  md:space-y-0 rounded-xl shadow-lg items-center p-1 max-w-xs md:max-w-7xl mx-auto  border border-white bg-white">
              <div className="w-9/12 md:w-1/6 h-full rounded-xl overflow-hidden bg-white grid place-items-center">
                <img src={order?.product?.image} alt="Product Image" />
              </div>
              <div className="w-full bg-white flex flex-col space-y-2 pl-3 pt-3">
                <div className="flex justify-between item-center">
                  <p className="text-gray-500 font-medium  hidden md:block">
                    Order Details
                  </p>
                  <button
                    type="button"
                    className={`text-${colourpicker(
                      order?.deliveryStatus
                    )}-700 hover:text-white border border-${colourpicker(
                      order?.deliveryStatus
                    )}-700 hover:bg-${colourpicker(
                      order?.deliveryStatus
                    )}-700 font-medium rounded-full text-sm p-2 text-center dark:border-${colourpicker(
                      order?.deliveryStatus
                    )}-800 dark:text-${colourpicker(
                      order?.deliveryStatus
                    )}-500 dark:hover:text-white dark:hover:bg-${colourpicker(
                      order?.deliveryStatus
                    )}-700 dark:focus:ring-${colourpicker(
                      order?.deliveryStatus
                    )}-800`}
                  >
                    {order?.deliveryStatus}
                  </button>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between">
                  <div className=" w-9/12">
                    <h3 className="font-black text-gray-800 md:text-xl text-lg">
                      {order?.product?.productname}
                    </h3>

                    <p className="md:text-sm text-gray-500 text-base">
                      {showAll[order?._id]
                        ? order?.product?.productDescription
                        : order?.product?.productDescription?.slice(0, 200) ||
                          order?.product?.productDescription}
                      {order?.product?.productDescription?.length > 200 && (
                        <span
                          className="text-blue ml-2 font-medium cursor-pointer text-blue-600"
                          onClick={() => toggleShowAll(order?._id)}
                        >
                          {showAll[order?._id] ? "Show Less" : "Show More..."}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className=" flex flex-col items-center justify-center p-2">
                    <p className="bg-gray-100 border-gray-300 border-1 pl-2 pr-2 pt-1 pb-1 rounded-lg">
                      {order?.product?.price}X{order?.totalItems || 1}=
                      {order?.amount || order?.product?.price}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xl font-black text-gray-800">
                      ${order?.product?.price}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handelDetalis(order?._id);
                      }}
                      className="text-white bg-blue-700 hover:bg-[#0B2C72] hover:text-[#8DEBFC] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Details
                    </button>
                  </div>
                </div>
                {order?.deliveryStatus == "delivered" && (
                  <div>
                    <div className="flex gap-2">
                      {[...Array(5)].map((i, index) => (
                        <div key={i || index}>
                          <FaStar
                            onClick={() =>
                              handleStarClick(index + 1, order?._id)
                            }
                            size={18}
                            className={`${
                              starRate[order?._id] > index
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {starRate[order?._id] >= 1 ? (
                  <p
                    className="text-sm font-extralight text-blue-600 mb-2"
                    onClick={() => {
                      setReviewProduct(true);
                    }}
                  >
                    Write review
                  </p>
                ) : (
                  <p className="text-sm font-extralight text-gray-600 mb-2">
                    Rate this product now
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-6"></div>
    </>
  );
};

export default OrdersList;
