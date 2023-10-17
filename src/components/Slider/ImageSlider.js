import React, { useState } from "react";
import StudentASideBar from "../Navigation/StudentASideBar";
import { SliderData } from "./SliderData";
import './ImageSlider.css'
import {FaArrowAltCircleRight,faArrowAltCircleLeft} from 'react-icons/fa'
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlide";
import SideBar from "../SideBar/SideBar";


const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const slides = SliderData.length;
    const nextSlide = () => {
        setCurrent(current === slides -1 ? 0: current+1)
    }

    
    const user = useSelector(selectUser);
  
    const prevSlide = () => {
        setCurrent(current === 0 ? slides -1 : current -1);
    }

   

    if(!Array.isArray(SliderData) || slides<= 0) {
        return null;
    }



    

    
    return (
    <div >
        <SideBar />
        <div className="slideContent">
        <h2 className="articletitle">
           HOW TO CLAIM ?
        </h2>
        <label class="switch-wrap">
  <input type="checkbox" />
  <div class="switch"></div>
</label>
       <p className="desc" >
       Envahie par les troupes russes depuis le 24 février,
         l'Ukraine réclame en outre des avions de combat pour faire face à l'offensive de Vladimir Poutine.
          « Pensez-vous que cela ne vous concerne pas ? Aujourd'hui, c'est l'Ukraine, demain, ce sera l'Europe
           tout entière. La Russie ne s'arrêtera pas », complète le Parlement ukrainien dans son tweet, relayant
            ainsi les demandes répétées du président Zelensky. Ce dernier souhaite l'instauration d'une zone
             d'exclusion aérienne en Ukraine, un périmètre dans lequel les avions russes seraient interdits. 
             Ce qu'a refusé l'Otan, une telle décision étant synonyme de guerre entre le Kremlin et l'Alliance 
             atlantique. « Tous les gens qui mourront après aujourd'hui mourront à cause de vous », a réagi le 
             chef d'État ukrainien, dans une vidéo dont s'est fait l'écho Le Monde.
       </p>
       
        <section class="slider ">
        
        {SliderData.map((slide, index) => {
            return (
                <div className={index === current ? 'slide active' : slide} key=
                {index}>
                    {index === current && (
                <div> 
                    

                    {/* ------------------------<========-------------------- */}
                    <i class="bi bi-chevron-left left-arrow" onClick={prevSlide} ></i>

                    {/* -------------------------Slides Image ------------------------     */}
                        <img src={slide.image} className="image" /> 
                    
                    {/* --------------------------=====>----------------- */}
                    <i class="bi bi-chevron-right right-arrow" onClick={nextSlide} ></i>

                    {/* ---------------------------SlideTitle------------------------------ */}
                    <h3 className="slidetitle"> {current+1 + " / " + slide.title}</h3> 

                    {/* ------------------------SlideDescritption------------------------------------ */}
                    <p className="descSlide">{slide.description}</p> </div>)}
                    
                </div>
            )
        })}
        
    </section>
    <h2 className="articletitle">
            ABOUT US
        </h2>
       <p className="desc" >
       Envahie par les troupes russes depuis le 24 février,
         l'Ukraine réclame en outre des avions de combat pour faire face à l'offensive de Vladimir Poutine.
          « Pensez-vous que cela ne vous concerne pas ? Aujourd'hui, c'est l'Ukraine, demain, ce sera l'Europe
           tout entière. La Russie ne s'arrêtera pas », complète le Parlement ukrainien dans son tweet, relayant
            ainsi les demandes répétées du président Zelensky. Ce dernier souhaite l'instauration d'une zone
             d'exclusion aérienne en Ukraine, un périmètre dans lequel les avions russes seraient interdits. 
             Ce qu'a refusé l'Otan, une telle décision étant synonyme de guerre entre le Kremlin et l'Alliance 
             atlantique. « Tous les gens qui mourront après aujourd'hui mourront à cause de vous », a réagi le 
             chef d'État ukrainien, dans une vidéo dont s'est fait l'écho Le Monde.
       </p>
        </div>
        
    </div>
    
    )
    }
export default ImageSlider;