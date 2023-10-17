import React, { useEffect, useRef, useState } from "react";
import './HomePage.css';
import hImg from "./../DashbordAdmin/joujaaa.png";
import img1 from './JOUJA TAHFOUNA.png';
import icon1 from './1_1.png';
import icon2 from './2_1.png';
import icon3 from './3_1.png';
import icon4 from './4_1.png';
import icon5 from './5_1.png';
import icon6 from './1.png';
import icon7 from './2.png';
import icon8 from './3.png';

import img2 from './home page1.png'
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css'
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import i18next from "i18next"
import Translations from "../Translations/Translations";

const HomePage = ({ someid }) => {

    const goToView = (path) => {
        const anchor = document.querySelector(path)
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    const [navBar, setNavbar] = useState()
    const changeBackground = () => {
        console.log(window.scrollY)
        if (window.scrollY >= 65) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)

    }, [])

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const Slider = [
        {
            image: icon4,
            title: i18next.t("BEST SOLUTION"),
            desc: i18next.t("provide a better solution for all your claims")
        },
        {
            image: icon1,
            title: i18next.t("INSTANT CHAT"),
            desc: i18next.t("find the solution faster with an instant discussion with our experts")
        },
        {
            image: icon2,
            title: "SUPPORT 24/7",
            desc: i18next.t("we are at your disposal 24/7")
        },
        {
            image: icon5,
            title: i18next.t("CLAIMS"),
            desc: i18next.t("save time and send your claim in a few clicks in complete safety and comfort")
        },
        {
            image: icon3,
            title: i18next.t("UP TO DATE"),
            desc: i18next.t("follow the progress in their resolutions in an up-to-date way")
        },

    ]
    const productTemplate = (item) => {
        return (
            <div className="serv">
                <img src={item.image} />
                <div>
                    <h4 className="titleServ">{item.title}</h4>
                    <p className="descServ">{item.desc}</p>
                </div>
            </div>
        );
    }



    return (
        <>
            <Translations />
            <div className={navBar ? "nav homenav" : "nav"}>
                <img src="http://esprit.reclamation.tn:3000/static/media/logo4.8149fd528f69d70f4c35.png" className="logoSign" />
                <div>

                    {/* ************Nav********** */}
                    <button onClick={() => goToView("#someeId")} className={navBar ? "buttonNav scrl" : "buttonNav"}><i class="bi bi-house-door"></i> {i18next.t("home")} </button>
                    <button onClick={() => goToView("#some-id")} className={navBar ? "buttonNav scrl" : "buttonNav"}> <i class="bi bi-envelope"></i> Contact</button>
                    <button onClick={() => goToView("#some-id2")} className={navBar ? "buttonNav scrl" : "buttonNav"}> <i class="bi bi-people"></i> {i18next.t("about Us")}</button>
                    <Link to="/login" className="lnk">
                        <button className={navBar ? "buttonNav scrl" : "buttonNav"}> <i class="bi bi-box-arrow-in-right"></i>{i18next.t("login")}</button>
                    </Link>
                </div>
            </div>


            <div className="homePage" >
                <div className="ItHome view1" id="someeId">
                    <div class="custom-shape-divider-top-1651695498">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                        </svg>
                    </div>
                    <img src={img2} alt="img" className="imgHome1" />
                    <div className="leftSide">
                        <h1 className="titleHome">{i18next.t("NEED HELP ?")}</h1>
                        <div className='titleHome2'>{i18next.t("Get it from Esprit's best administrative team who will provide you a better solution for your problems")}</div>
                        <Link to="/login" className="lnk">
                            <button className="btnStart"> {i18next.t("START NOW !")}</button>
                        </Link>

                    </div>
                    <div class="custom-shape-divider-bottom-1651702671">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                        </svg>
                    </div>
                </div>
                <div className="ItHome view2" id="some-id2">
                    <div class="custom-shape-divider-top-1651706729">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                        </svg>
                    </div>
                    <div className="">
                        <h1 className="titleHomee">{i18next.t("it's all about your satisfaction")}</h1>
                        <div className='titleHome2'>{i18next.t('To improve the management of complaints in order to improve the quality of inefficient service, we are committed to implementing this Workflow for the management of your complaints')}
                        </div>
                    </div>
                    <Carousel value={Slider} responsiveOptions={responsiveOptions} indicatorsContentClassName="sliderIt" numVisible={3} numScroll={1} className="custom-carousel"
                        autoplayInterval={2500} itemTemplate={productTemplate} />

                    <div class="custom-shape-divider-bottom-1651702671">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                        </svg>
                    </div>
                </div>
                <div className="ItHome2 view1 " id="some-id">
                    <div class="custom-shape-divider-top-1651695417">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                        </svg>
                    </div>
                    <h1 className="titleHomee">{i18next.t("Contact Us")}</h1>
                    <div className="contacts">
                        <div className="contactItem">
                            <img src={icon7} />
                            <h2>{i18next.t("Address")} </h2>
                            <p className="titleHome3"> 1.2 rue andrés ampére - 2083 <br/> Pole technologique - El Ghazela</p>

                        </div>
                        <div className="contactItem">
                        <img src={icon6} />
                        <h2> {i18next.t("Phone")} </h2>
                        <p className="titleHome2"> +216 70 250 000</p>
                        </div>
                        <div className="contactItem">
                        <img src={icon8} />
                        <h2>Email </h2>
                        <p className="titleHome2"> reclamaions@esprit.tn</p>

                        </div>
                    </div>
                </div>
            </div>



        </>


    )

}

export default HomePage;