import React from 'react'
import ad from "../../assets/Supplier/sup1.png"
import SupTable from '../../components/supplier/SupTable'
import SideBar from '../../components/supplier/Sidebar'





const SupplyHome  = () => {
  return (

    <div className=' flex w-full h-screen overflow-hidden' >
      <div className=' mt-2 min-h-screen' >
      <SideBar/>
      </div>

      <div className='mt-2 w-full overflow-scroll'>

        <div className=' w-full h-90 flex  border rounded-lg' style={{ backgroundColor: '#303c6c '}}>
          <div className='w-3/4'>
            <p className='text-white s:flex s:justify-center s:text-2xl s:items-center    md:text-6xl   font-bold md:pt-12 md:pl-'>Welcome To High Hydration</p>
          </div>
          <div className='s:p-1 md:p-5'>
            <img className=' s:h-14 s:w-14 md:h-36 md:w-36   xl:h-64 xl: w-64 ' src={ad} /> 
          </div>
        </div>

        {/* orderlist */}
        <div className='flex justify-around flex-wrap m-5'>
          <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12 mb-5 ">
            <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
              <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-black  text-lg font-semibold tracking-wide">Total Orders</h6>
              <div className="flex items-center justify-center">
                <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-black  text-lg font-bold tracking-wide">20</h6>
              </div>

            </div>
          </div>


          <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12 mb-5 ">
            <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
              <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-green-700 to-green-500 text-lg font-semibold tracking-wide">Completed</h6>
              <div className="flex items-center justify-center">
                <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-green-700 to-green-500 text-lg font-bold tracking-wide"> 10</h6>

              </div>

            </div>
          </div>

          <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12 mb-5 ">
            <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
              <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-red-700 to-red-500 text-lg font-semibold tracking-wide">Processing</h6>
              <div className="flex items-center justify-center">
                <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-red-700 to-red-500 text-lg font-bold  tracking-wide">10</h6>
              </div>

            </div>
          </div>
        </div>
   <SupTable/>
</div>



    </div>

  )
}

export default SupplyHome