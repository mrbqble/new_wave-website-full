import { useSwiper } from "swiper/react";

export const SwiperButtonNext = ({ children }) => {
  const swiper = useSwiper();
  return <button
    className="link"
    style={{
      backgroundColor: '#D0D5FF'
    }}
    onClick={() => swiper.slideNext()}
  >{children}</button>;
};