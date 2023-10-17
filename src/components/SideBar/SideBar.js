import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo1.png'
import './SideBar.css'
import i18next from "i18next"

const SideBar = () => {

    const [categClass, setCategClass] = useState("sub-menu");
    const [chevIc, setChevIcon] = useState("bi bi-chevron-down");
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const lang = JSON.parse(localStorage.getItem("lang"))


    const showClaimCat = () => {
        if (categClass === "sub-menu") {
            setCategClass("sub-menu showCat")
            setChevIcon('bi bi-chevron-up')
        }
        else {
            setCategClass("sub-menu");
            setChevIcon("bi bi-chevron-down");
        }

    }

    return (
        <div>
            <div className="sideBar active">
                <div className="logo_content">
                    <div className="logoS">
                        <div className="logo_name">
                            <img src={logo} className="logoNav2" />
                        </div>
                    </div>
                    {/* <i class="bi bi-list" id="btn" onClick={handleSideBar}></i> */}
                    <ul className="nav_list" >

                        {AuthUser.role === "Student" ? <li>
                            {/* <Link to="/">
                                <i className="bi bi-house-door" ></i>
                                <span className="links_name">  {i18next.t("home")} </span>
                            </Link>
                            <span className="tooltip"> {i18next.t("home")} </span> */}
                        </li> : <>
                            {AuthUser.role === "Admin" ?
                                <li>
                                    <Link to="/dashboardadmin">
                                        <i className="bi bi-house-door"></i>
                                        <span className="links_name"> {i18next.t("dashboard")} </span>
                                    </Link>
                                    <span className="tooltip"> {i18next.t("dashboard")} </span>
                                </li> : <>
                                    {/* <li>
                                        <Link to="#">
                                            <i className="bi bi-house-door"></i>
                                            <span className="links_name"> {i18next.t("dashboard")} </span>
                                        </Link>
                                        <span className="tooltip"> {i18next.t("dashboard")} </span>
                                    </li> */}
                                </>}
                        </>}
                        <li>
                            <Link to="/profil">
                                <i className="bi bi-person-fill" ></i>
                                <span className="links_name">  {i18next.t("profile")} </span>
                            </Link>
                            <span className="tooltip">  {i18next.t("profile")} </span>
                        </li>
                        {/* <li>  
                        <Link to="/messanger">
                        <i class="bi bi-chat-left-text" ></i>
                        <span className="links_name"> Chats </span>
                        </Link>
                        <span className="tooltip"> Chats </span>                        
                    </li> */}

                        {AuthUser.role === "Student" ? <>
                            {/* <li>
                                <Link to="addclaim">
                                    <i className="bi bi-file-earmark-plus"></i>
                                    <span className="links_name"> {i18next.t("add claim")} </span>
                                </Link>
                                <span className="tooltip"> {i18next.t("add claim")} </span>
                            </li>
                            <li>
                                <Link to="claimlist">
                                    <i className="bi bi-journals"></i>
                                    <span className="links_name"> {i18next.t("my claims")} </span>
                                </Link>
                                <span className="tooltip"> {i18next.t("my claims")} </span>
                            </li> */}
                        </> : <>
                            {AuthUser.role === "Admin" ? <>
                                {/* <li>
                                    <Link to="/studentslist">
                                        <i className="bi bi-person-lines-fill"></i>
                                        <span className="links_name"> {i18next.t("students")}  </span>
                                    </Link>
                                    <span className="tooltip"> {i18next.t("students")}  </span>
                                </li>
                                <li>
                                    <Link to="/employeeslist">
                                        <i className="bi bi-person-workspace"></i>
                                        <span className="links_name"> {i18next.t("employees")}  </span>
                                    </Link>
                                    <span className="tooltip"> {i18next.t("employees")}  </span>
                                </li> */}
                                <li>
                                    <Link to="/servicelist">
                                        <i className="bi bi-files"></i>
                                        <span className="links_name"> {i18next.t("Emploi par Classe")}  </span>
                                    </Link>
                                    <span className="tooltip"> {i18next.t("services")}  </span>
                                </li>
                                <li>
                                    <div>
                                        <Link to="#" onClick={showClaimCat}>
                                            <i className="bi bi-journals"></i>
                                            <span className="links_name">Paramétre Génerale  </span>
                                            <i className={chevIc}></i>

                                        </Link>
                                        <span className="tooltip"> {i18next.t("claims")}   </span>

                                    </div>
                                </li>

                                <ul className={categClass}>
                                    <li><Link to='/claimslist'><i className="bi bi-files"></i> <span className="links_name">Année Universitaire</span></Link></li>
                                    <li ><Link to='waitclaims'><i className="bi bi-file-earmark-minus"></i><span className="links_name">Semstre</span></Link></li>
                                    <li ><Link to='inprogclaims'><i className="bi bi-file-earmark-plus"></i><span className="links_name">Periode</span></Link></li>
                                    <li ><Link to='inprogclaims'><i className="bi bi-file-earmark-plus"></i><span className="links_name">Seance</span></Link></li>
                                    <li ><Link to='finiclaims'><i className="bi bi-file-earmark-check"></i><span className="links_name">Jours Féries et Vacances</span></Link></li>
                                </ul>

                            </> : <>
                                <li>
                                    <Link to="/employee/claims">
                                        <i className="bi bi-journals"></i>
                                        <span className="links_name"> {i18next.t("claims list")} </span>
                                    </Link>
                                    <span className="tooltip"> {i18next.t("claims list")} </span>
                                </li>
                            </>}
                        </>}

                        <li>
                            <Link to="/login" onClick={() => {
                                localStorage.clear();
                                localStorage.setItem('lang', JSON.stringify(lang));
                            }}>
                                <i className="bi bi-box-arrow-right" ></i>
                                <span className="links_name"> {i18next.t("logout")} </span>
                            </Link>
                            <span className="tooltip"> {i18next.t("logout")} </span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default SideBar