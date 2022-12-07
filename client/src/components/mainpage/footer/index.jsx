import './footer.css';
import TiktokIcon from "../../imgs/tiktok.png";
import { useNavigate } from 'react-router-dom';
import InstagramIcon from "../../imgs/instagram.png";
import YoutubeIcon from "../../imgs/youtube.png";

export const Footer = () => {

    const links = [
        [
            {
                title: 'Get to know us',
            },     
            {
                title: 'About us',
                href: '#about'
            },
            {
                title: 'Contact us',
                href: '/'
            },
            {
                title: 'See our financials',
                href: '/documents'
            },
            {
                title: 'Verify documents',
                href: '/verify'
            }
        ],
        [
            {
                title: 'Take action!',
            },
            {
                title: 'Donate',
                href: '/'
            },
            {
                title: 'Shop our store',
                href: '/'
            },
            {
                title: 'Join the evergreen!',
                href: '/'
            }
        ],
        [
            {
                title: 'Our community',
            },
            {
                title: 'Our projects',
                href: '/'
            },
            {
                title: 'Upcoming events',
                href: '/#community'
            },
            {
                title: 'Become a volunteer',
                href: '/reg'
            }
        ],
    ];

    const navigate = useNavigate();
    const message = 'made with love <3';

    return (
        <div>
            <hr/>
            <div className="footer">
                {links.map((item, index) => 
                    <ul key = {index}>
                        {item.map((link, index) => 
                            <li
                                key = {index}
                                style = {{fontWeight: index ? '' : 'bold'}}
                            >
                                {index
                                    ? link.href[0] === "#"
                                        ? <a onClick={() => navigate('/')} href={link.href} >{link.title}</a>
                                        : <a onClick={() => navigate(link.href)}>{link.title}</a>
                                    : <span>{link.title}</span>}
                            </li>
                        )}
                    </ul>
                )}
                <ul className="last">
                    <li style={{
                        fontWeight: 'bold'
                    }}>
                        <p>NEW WAVE</p>
                    </li>
                    <li>© 2022</li>
                    <li>{message}</li>
                    <li>
                        <a
                            href="/tiktok"
                            target="_blank"
                        >
                            <img
                                src={TiktokIcon}
                                alt="tiktok icon"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/newwave_club" 
                            target="_blank"
                        >
                            <img
                                src={InstagramIcon}
                                alt="instagram icon"
                        /></a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                        >
                            <img
                                src={YoutubeIcon}
                                alt="Youtube icon"
                        /></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};