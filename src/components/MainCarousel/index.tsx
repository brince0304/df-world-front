import { imageData } from '../../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Pagination } from 'swiper';
import { Paper } from '@mui/material';
const MainCarousel = () => {
  const renderSlide = imageData.map((image) => {
    return (
      <SwiperSlide key={image.alt}>
        <img src={image.url} alt={image.alt} />
      </SwiperSlide>
    );
  });

  return (
    <Paper>
      <Swiper
        modules={[Pagination]}
        rewind={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        slidesPerView={1}
        breakpoints={{
          976: {
            slidesPerView: 2,
          },
        }}
      >
        {renderSlide}
      </Swiper>
    </Paper>
  );
};

export default MainCarousel;
