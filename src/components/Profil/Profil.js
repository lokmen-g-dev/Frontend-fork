import pdp2 from './studentpdp.jpg';
import './Profil.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import HandlingService from '../../service/HandlingService';
import i18next from "i18next"
import HandlingServiceList from '../HandlingServiceList/HandlingServiceList';



const Profil = () => {


    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [service, setService] = useState("")
    useEffect(() => {

        if (AuthUser?.role !== "Student") {
            HandlingService.getServiceByEmployeeId(AuthUser?.id)
                .then(
                    (res) => {
                        setService(res.data)
                    }
                )
        }
    }, [])
    const history = useHistory();



    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <SideBar />
            <NavBar />

            <div className="homeContent">
                <div className="card">

                    <span>{AuthUser.profilePicture ? <img src={AuthUser.profilePicture} className="pdp" /> : <img src={pdp2} className="pdp" />}</span>
                    <span><h1 className="nom">{AuthUser.firstName + ' ' + AuthUser.lastName}</h1><p className="title">{AuthUser.role}</p></span>
                  
                    <h3>Email :</h3>
                    <p>{AuthUser.email}</p>



                    <a onClick={(e) => history.push('/editprofil')} className="editbtn"> {i18next.t("edit")}
                        <i className="bi bi-gear edt"></i>
                    </a>

                    <i class="flag flag-us"></i>

                </div>

            </div>



        </div>


    )
}

export default Profil