import { useSwiper } from "swiper/react";

export const SwiperButtonPrev = ({ children }) => {
  const swiper = useSwiper();
  return <button
    className='link'
    style={{
        backgroundColor: 'white'
    }}
    onClick={() => swiper.slidePrev()}
  >{children}</button>;
};