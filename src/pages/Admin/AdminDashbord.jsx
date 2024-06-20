import React from "react";
import ad from "../../assets/Supplier/sup1.png";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminChart from "../../components/Admin/AdminChart";
import RadarChart from "../../components/Admin/RadarChart";
import TinyChartComp from "../../components/Admin/TinyChartComp";
import AttendenceChart from "../../components/Admin/AttendenceChart";

const AdminDashbord = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F8F8F8]">
      <div className=" mt-2 min-h-screen">
        <AdminSidebar />
      </div>

      <div className="mt-1 w-full overflow-scroll">
        <div
          className=" w-full h-1/3 flex  border rounded-lg "
          style={{ backgroundColor: "#303c6c " }}
        >
          <div className="w-3/4">
            <p className="text-white s:flex s:justify-center s:text-2xl s:items-center    md:text-6xl   font-bold md:pt-12 md:pl-">
              Welcome To High Hydration
            </p>
          </div>
          <div className="s:p-1 md:p-5">
            <img
              className=" s:h-14 s:w-14 md:h-36 md:w-36 xl:h-48 xl:w-44 "
              src={ad}
            />
          </div>
        </div>

        {/* orderlist */}
        <div className="mt-3">
          <TinyChartComp />
        </div>

        {/* orderlist over */}

        <div className="flex w-full  ">
          <div className=" w-1/2">
            <AdminChart />
          </div>

          <div className="w-1/2 ">
            <AttendenceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;
