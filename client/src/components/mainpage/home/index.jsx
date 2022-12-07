import './home.css';
import {Carousel} from "../carousel/index";
import { First } from './blocks/first';
import { Second } from './blocks/second';
import { Third } from './blocks/third';
import { Fourth } from './blocks/fourth';


export const Home = () => {

    return (
        <div className='home'>
            <First/>
            <Second/>
            <Third/>
            <Fourth/>
            <div className='fifth block' id="community">
                <h1>Upcoming <font>events</font></h1>
                <Carousel/>
            </div>
        </div>
    );
};