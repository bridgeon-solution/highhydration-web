import React from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';
import client from '../../../assets/car/carr1.png';
import client1 from '../../../assets/car/carr4.png';
import client2 from '../../../assets/car/carr3.png';

const HomeCarousel = () => {
  return (
    <div className="relative bg-[#EFF0F3] w-full overflow-hidden after:clear-both after:block after:content-['']">
      <TECarousel ride="carousel" interval={3000}>
        <TECarouselItem
          itemID={1}
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        >
          <img
            src={client}
            className="block w-full h-auto object-cover"
            alt="Client 1"
          />
        </TECarouselItem>
        <TECarouselItem
          itemID={2}
          className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        >
          <img
            src={client1}
            className="block w-full h-auto object-cover"
            alt="Client 2"
          />
        </TECarouselItem>
        <TECarouselItem
          itemID={3}
          className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        >
          <img
            src={client2}
            className="block w-full h-auto object-cover"
            alt="Client 3"
          />
        </TECarouselItem>
      </TECarousel>
    </div>
  );
};

export default HomeCarousel;
