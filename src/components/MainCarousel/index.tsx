import { imageData } from '../../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Navigation, Pagination } from 'swiper/types/modules';
const MainCarousel = () => {
  const renderSlide = imageData.map((image) => {
    return (
      <SwiperSlide key={image.alt}>
        <img src={image.url} alt={image.alt} />
      </SwiperSlide>
    );
  });

  return (
    <Swiper
      spaceBetween={50}
      modules={[Navigation, Pagination]}
      rewind={true}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      slidesPerView={1}
      className={`
      w-[20rem] h-[10rem] md:w-[30rem] md:h-[15rem] lg:w-[61rem] my-6 max-w-[500px] md:max-w-[976px] max-h-[15rem] 
       `}
      breakpoints={{
        976: {
          slidesPerView: 2,
        },
      }}
    >
      {renderSlide}
    </Swiper>
  );
};

export default MainCarousel;
