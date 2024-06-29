import React, { useEffect, useState } from 'react'
import ad from '../../../assets/admindash.png'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import AdminChart from '../../../components/Admin/chart/AdminChart'
import RadarChart from '../../../components/Admin/chart/RadarChart'
import TinyChartComp from '../../../components/Admin/chart/TinyChartComp'
import AttendenceChart from '../../../components/Admin/chart/AttendenceChart'
import adminRound  from '../../../components/Admin/chart/AdminRoundChart'
import AdminRoundChart from '../../../components/Admin/chart/AdminRoundChart'
import api from '../../../axiosInterceptors'


const AdminDashbord = () => {

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#EDE8F5] ">
      <div className=" mt-2 min-h-screen">
        <AdminSidebar />
       
      </div>



      <div className="mt-2 ml-2 mr-2 w-full overflow-y-auto ">   

  <div className='w-full flex  h-1/3 border rounded-lg bg-[#303c6c] '>
          <div className='w-3/4 flex justify-center items-center'>
            <p className='text-white text-4xl md:text-6xl font-bold md:pt-12 text-center'>
              Welcome To High Hydration
            </p>
          </div>
          <div className='hidden md:flex justify-center items-center p-1 md:p-5'>
            <img className='h-14 w-14 md:h-36 md:w-36 xl:h-60 xl:w-60' src={ad} alt="admin" />
          </div>
        </div>

        {/* orderlist */}
        <div className="mt-3">
          <TinyChartComp />
        </div>

        {/* orderlist over */}
        <div className="w-full flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row mt-5">
      <div className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
        <AdminChart />
      </div>
      <div className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
        <AdminRoundChart />
      </div>
    </div>





      </div>
    </div>
  );
};

export default AdminDashbord;
