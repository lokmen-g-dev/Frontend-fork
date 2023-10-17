import moment from 'moment';
import React, { useEffect, useState } from 'react';
import pdpAd from './../EmployeesList/blank.jpg'
import ClaimService from '../../service/ClaimService';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import './ClaimsList.css'
import NotFound from './../404/404'
import { Redirect } from 'react-router-dom';
import i18next from "i18next"
import ConversationsService from '../../service/ConversationsService';



const FiniClaims = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [claims, setClaims] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [thisClaimInfo, setThisClaimInfo] = useState("")
    const FinishedClaims = claims.filter(claim => claim.status === "Finished")



    useEffect(() => {

        ClaimService.getClaimsInfo()
            .then(
                (result) =>
                    setClaims(result.data)
            )
    }, [])
    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    if (AuthUser.role !== "Admin") {
        return <NotFound />;
    }
    return (
        <>
            <SideBar />
            <NavBar />
            <div className="homeContent">
                <div>
                    <div className="tabStudentsTitle">
                        <h2 className='hideC'> {i18next.t("Finished Claims")}</h2>
                        <div>
                        </div>
                        <div className='srch'>

                            <input type="search" placeholder={i18next.t("search") + " . . ."} onChange={(e) => { setSearchTerm(e.target.value) }} />
                            <i class="bi bi-search" ></i>
                        </div>
                    </div>

                    <section className="tabStudentsContainer">
                        {/* --------Tab header----------- */}
                        <div className="tbl-header1">
                            <table cellpadding="0" cellspacing="0" border="0" className="studentsTable">
                                <thead>
                                    <tr>
                                        <th className='thStd'>ID</th>
                                        <th className='thStd'>{i18next.t("STUDENT")}</th>
                                        <th className='thStd hideC' >{i18next.t("TITLE")}</th>
                                        <th className='thStd hideC'>DATE</th>
                                        <th className='thStd hideC' for="touch"  >STATUS </th>
                                        <th className='thStd' for="touch">ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* -----------Tab Content------------ */}
                        <div className="tbl-content1">
                            <table cellpadding="0" cellspacing="0" border="0" className="studentsTable">
                                <tbody>
                                    {FinishedClaims.filter((value) => {
                                        if (searchTerm == "")
                                            return value
                                        if (value.fisrtName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.classe.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.dateRec.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }


                                    }).map(claim => <tr key={claim.recId}>
                                        <td className='thStd'>
                                            {claim.recId}
                                        </td>
                                        <td className='thStd'>
                                            {claim.fisrtName}
                                        </td>
                                        <td className='thStd hideC'>
                                            {claim.title}
                                        </td>
                                        <td className='thStd hideC'>
                                            {moment(claim.dateRec).format('LL')}
                                        </td>
                                        <td className='thStd hideC'>
                                            {claim.status === "Waiting for treatment" ? <button className="WaitStatu1">{i18next.t("waiting")}</button> : ""}
                                            {claim.status === "In progress" ? <button className="InProgStatu1">{i18next.t("in progress")}</button> : ""}
                                            {claim.status === "Finished" ? <button className="FiniStatu1">{i18next.t("finished")}</button> : ""}
                                        </td>
                                        <td className='thStd'>
                                            <a class="buttonPopUp" href="#claimDet">
                                                <button className="treatBtn" onClick={(e) => {
                                                    setThisClaimInfo(claim)
                                                }
                                                }>{i18next.t("see Details")} <i class="bi bi-search"></i></button>
                                            </a>
                                            <div id="claimDet" class="overlay12">
                                                <div class="popup1">
                                                    <a class="close" href="#"><i class="bi bi-x-circle-fill"></i></a>
                                                    <div class="content">

                                                        <div className="profilInfo">
                                                            <h5 className='Tit12'>{i18next.t("student")} : </h5>
                                                            <img src={thisClaimInfo?.profilePicture ? thisClaimInfo?.profilePicture : pdpAd} />
                                                            <h2 className="">{thisClaimInfo?.fisrtName + ' ' + thisClaimInfo?.lastName}</h2>
                                                            <p>{thisClaimInfo?.email}</p>
                                                            <button className="MsgEmp2" onClick={() => {
                                                                ConversationsService.createConversations(thisClaimInfo?.stdId, AuthUser.id);
                                                                window.location.href = ("/messanger");
                                                            }}
                                                            >{i18next.t("SEND A MESSAGE")} </button>
                                                        </div>
                                                        <div className='claimInfo'>
                                                            <h5 className='Tit13'>{i18next.t("claim details")} :  {thisClaimInfo?.status === "Waiting for treatment" ? <button className="WaitStatu2">{i18next.t(thisClaimInfo?.status)}</button> : ""}
                                                                {thisClaimInfo?.status === "In progress" ? <button className="InProgStatu2">{i18next.t(thisClaimInfo?.status)}</button> : ""}
                                                                {thisClaimInfo?.status === "Finished" ? <button className="FiniStatu2">{i18next.t(thisClaimInfo?.status)}</button> : ""} </h5>
                                                            <h2 className="">{thisClaimInfo?.title}</h2>
                                                            <div className='dateR'>
                                                                <p>{thisClaimInfo?.description}</p>
                                                                {/* <img className='file64' src={thisClaimInfo.description} /> */}
                                                                <p className='dateDet'>{moment(thisClaimInfo?.dateRec).format('LL')}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>


        </>
    )
}


export default FiniClaims