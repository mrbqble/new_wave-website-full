import { useSwiper } from "swiper/react";
import { useContext } from "react";
import { DefaultContext } from "../../../Context";

export const SwiperButtonPrev = ({ children, index }) => {
  const {setCurrent} = useContext(DefaultContext);
  const swiper = useSwiper();
  return <button onClick={() => {
    swiper.slidePrev()
    setCurrent(index);
    console.log(index);
  }}
    style={{backgroundColor: "white", border: "none"}}
  >{children}</button>;
};