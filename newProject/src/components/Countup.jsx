import React, { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";

export default function Countup() {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className='flex pt-1 justify-between  flex-wrap  '>
    <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12 mb-5 ">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
            <div className="flex items-center justify-center">
              <h4 className="font-bold text-4xl text-blue-600">
                <CountUp start={0} end={counterOn ? 4678 : 0} duration={2} delay={0} startOnMount={false} />+
              </h4>
            </div>
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-lg font-semibold tracking-wide">Users</h6>
          </div>
        </div>

        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
            <div className="flex items-center justify-center">
              <h4 className="font-bold text-4xl text-blue-600">
                <CountUp start={0} end={counterOn ? 2800 : 0} duration={2} delay={0} startOnMount={false} />+
              </h4>
            </div>
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-lg font-semibold tracking-wide">Suppliers</h6>
          </div>
        </div>




        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
            <div className="flex items-center justify-center">
              <h4 className="font-bold text-4xl text-blue-600">
                <CountUp start={0} end={counterOn ? 9999 : 0} duration={2} delay={0} startOnMount={false} />+
              </h4>
            </div>
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-lg font-semibold tracking-wide">Delivered</h6>
          </div>
        </div>

        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
            <div className="flex items-center justify-center">
              <h4 className="font-bold text-4xl text-blue-600">
                <CountUp start={0} end={counterOn ? 3200 : 0} duration={2} delay={0} startOnMount={false} />+
              </h4>
            </div>
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-lg font-semibold tracking-wide">Testimonial</h6>
          </div>
        </div>

      </div>
    </ScrollTrigger>
  );
}
