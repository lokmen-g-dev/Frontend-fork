import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ClaimService from "../../service/ClaimService";
import moment from 'moment';
import './DashboardAdmin.css';
import { ArcElement } from 'chart.js';
import pdpAd from './pdpAdmin.jpg'
import Chart from "chart.js/auto";
import NotifService from "../../service/NotifService";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import HandlingService from "../../service/HandlingService";
import EmployeeService from "../../service/EmployeeService";
import { Redirect } from "react-router-dom";
import DataStat from './DataStat';
import i18next from "i18next";
import NotFound from './../404/404'



const DashboardAdmin = () => {

    Chart.register(ArcElement);
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [claims, setClaims] = useState([]);
    const [claimsInfo, setClaimsInfo] = useState([]);
    const waitingClaims = claims.filter(claim => claim.status === "Waiting for treatment")
    const InProgressClaims = claims.filter(claim => claim.status === "In progress")
    const FinishedClaims = claims.filter(claim => claim.status === "Finished")
    const LastClaims = claimsInfo.slice(-4);
    const [authUser, setAuthUser] = useState({});
    const [servicesList, setServicesList] = useState([])
    const [claimPerServ, setClaimPerServ] = useState([]);
    const [thisClaimInfo, setThisClaimInfo] = useState(null);



    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
            )
        console.log(claimPerServ)

    }, [])

   
    {
        servicesList.map(serv => {

            let x = 0;
            serv.employees.map(emp => {
                x = x + (emp.reclamations.length)
            })
            claimPerServ.push( x )


        }


        )
    }


    




    const Doughnut = {

        datasets: [{

            data: claimPerServ.filter(function(ele , pos){
                return claimPerServ.indexOf(ele) == pos;
            }),

            backgroundColor: ['rgba(79, 77, 255, 0.416)',
                'rgba(195, 92, 255, 0.416)',
                'rgba(255, 197, 110, 0.4)', 'rgba(255, 147, 120, 0.4)', 'rgba(152, 147, 100, 0.4)'],
            borderWidth: 3,
        },],
        labels: servicesList.map(service => {
            return service.name
        }),

    };






    useEffect(() => {
        const data = localStorage.getItem("AuthUser");
        if (data) {
            setAuthUser(JSON.parse(data));
        }
    }, [])


    useEffect(() => {


        ClaimService.getAllClaims()
            .then(
                (result) => {
                    setClaims(result.data);
                },
            )
        ClaimService.getClaimsInfo()
            .then(
                (result) => {
                    setClaimsInfo(result.data);
                },
            )
    }, [])

    // ------------------TransferClaim----------------
    const [idServ, setIdServ] = useState(0);
    const [idEmp, setIdEmp] = useState(0);
    const [employeeList, setEmployeeList] = useState([])
    const [dis, setDis] = useState(true)

    const onChangeHandler = (e) => {

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdServ(option);

        if (option !== null) {
            EmployeeService.getEmployeeByServiceId(option)
                .then(
                    (result) => {
                        setEmployeeList(result.data);
                    },
                )
        }

    }

    const onChangeHandler2 = (e) => {

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdEmp(option);
        setDis(false)
        console.log(option)

    }


    const sendUpdateStatu = (e) => {

        e.preventDefault();

        const reqBody = {
            status: "In progress",
        }

        const NotifBody = { notificationMessage: thisClaimInfo.fisrtName + " your claim is in progress" }
        const NotifBody2 = { notificationMessage: "You have a new claim to treat" }
        ClaimService.updateClaiStatu(reqBody, thisClaimInfo.recId)
            .then((response) => {
                if (response.status === 200) {
                    ClaimService.sendClaimToEmployee(thisClaimInfo.recId, idEmp)
                    NotifService.sendNotifsStudent(NotifBody, thisClaimInfo.stdId)
                    NotifService.sendNotifsEmployee(NotifBody2, idEmp)
                    window.location.href = "#claimDet1";
                }
                return Promise.reject("Failed . Please try again !");
            })

    }
    if (!AuthUser) {
        return <Redirect to="/login" />;
    }
    if (AuthUser.role !== "Admin") {
        return <NotFound />;
    }
    return (
        <div>
            <div>
                <SideBar />
                <NavBar />


                <div className="homeContent">
                    <div className="claimsContainer" >

                        <div className="allClaimsContainer">

                            <p className="ClaimsTit">
                                {i18next.t("all Claims")}
                            </p>
                            <span className="ClaimInf">{claims.length} <i className="bi bi-journal-text allClaims"></i></span>

                        </div>
                        <div className="WaitingClaimsContainer">
                            <p className="ClaimsTit1">
                                {i18next.t("waiting")}
                            </p>
                            <span className="ClaimInf">{waitingClaims.length} <i className="bi bi-journal-x allClaims"></i></span>
                        </div>

                        <div className="InProgressClaimsContainer">
                            <p className="ClaimsTit2">
                                {i18next.t("in progress")}
                            </p>
                            <span className="ClaimInf">{InProgressClaims.length} <i className="bi bi-journal-minus allClaims"></i></span>

                        </div>
                        <div className="FinishedClaimsContainer">
                            <p className="ClaimsTit3">
                                {i18next.t("finished")}
                            </p>
                            <span className="ClaimInf">{FinishedClaims.length} <i className="bi bi-journal-check allClaims"></i></span>

                        </div>
                    </div>



                    <div className="gridDash">

                        <section className="tabContainer1">
                            <h2 className="statTit">  {i18next.t("last Claims")}  </h2>
                            <div className="tbl-header11">
                                <table className="table2">
                                    <thead className="table2">
                                        <tr className="trCl">
                                            <th className="thCl HideCol">{i18next.t("STUDENT")} </th>
                                            <th className="thCl">{i18next.t("TITLE")}</th>
                                            <th className="thCl HideCol HideCol1">DATE</th>
                                            <th className="thCl "> STATUS</th>
                                            <th className="thCl tit">ACTION</th>
                                            {/* <br/> */}
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div>
                                <table cellPadding="0" cellSpacing="0" border="0" className="table2">
                                    <tbody >
                                        {LastClaims.map(lastClaim => <tr key={lastClaim.recId} className="trCl">
                                            <td className="tdCl  ">
                                                <span>{lastClaim.profilePicture ? <img src={lastClaim.profilePicture} className="profil-img" /> : <img src={pdpAd} className="profil-img" />}</span>
                                            </td>
                                            <td className="tdCl ">
                                                {lastClaim.title.substring(0, 30) + ".."}
                                            </td>
                                            <td className="tdCl HideCol HideCol1">
                                                {lastClaim.dateRec}
                                            </td>
                                            <td className="tdCl HideCol">
                                                {lastClaim.status === "Waiting for treatment" ? <button className="WaitStatu1">{i18next.t("waiting")}</button> : ""}
                                                {lastClaim.status === "In progress" ? <button className="InProgStatu1">{i18next.t(lastClaim.status)}</button> : ""}
                                                {lastClaim.status === "Finished" ? <button className="FiniStatu1">{i18next.t(lastClaim.status)}</button> : ""}</td>
                                            <td className="tdCl">
                                                <a class="buttonPopUp" href="#claimDet">  <button className="treatBtn" onClick={(e) => {
                                                    setThisClaimInfo(lastClaim)
                                                }}><t className="HideCol HideCol1">{i18next.t("see Details")}</t> <i class="bi bi-search"></i></button></a>
                                                <div id="claimDet" class="overlay12">
                                                    <div class="popup1">
                                                        <a class="close" href="#"><i class="bi bi-x-circle-fill"></i></a>
                                                        <div class="content">

                                                            <div className="profilInfo">
                                                                <h5 className='Tit12'>{i18next.t("student")} : </h5>
                                                                <img src={thisClaimInfo?.profilePicture ? thisClaimInfo.profilePicture : pdpAd} />
                                                                <h2 className="">{thisClaimInfo?.fisrtName + ' ' + thisClaimInfo?.lastName}</h2>
                                                                <p>{thisClaimInfo?.email}</p>
                                                            </div>
                                                            <div className='claimInfo'>
                                                                <h5 className='Tit13'>{i18next.t("claim details")} :  {thisClaimInfo?.status === "Waiting for treatment" ? <button className="WaitStatu2">{i18next.t("Waiting for treatment")}</button> : ""}
                                                                    {thisClaimInfo?.status === "In progress" ? <button className="InProgStatu2">{i18next.t(thisClaimInfo?.status)}</button> : ""}
                                                                    {thisClaimInfo?.status === "Finished" ? <button className="FiniStatu2">{i18next.t(thisClaimInfo?.status)}</button> : ""} </h5>
                                                                <h2 className="">{thisClaimInfo?.title}</h2>
                                                                <div>
                                                                    <p>{thisClaimInfo?.description}</p>
                                                                    {/* <img className='file64' src={thisClaimInfo.description} /> */}
                                                                    <p className='dateDet'>{moment(thisClaimInfo?.dateRec).format('LL')}</p>
                                                                </div>
                                                                {thisClaimInfo?.status === "Waiting for treatment" ? <a class="buttonPopUp" href="#claimTransfer"> <button className="treatBtn1"
                                                                >Transfer <i class="bi bi-arrow-right-short"></i></button> </a> : ""}</div>.<div id="popup4" class="overlay12">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>).reverse()}
                                    </tbody>

                                </table>
                                <div id="claimTransfer" class="overlay12">
                                    <div class="popup2">
                                        <a class="close" href="#"><i class="bi bi-x-circle-fill"></i></a>
                                        <div class="content">

                                            <select className="inputSignIn" onChange={onChangeHandler}  >
                                                <option>SELECT YOUR SERVICE</option>
                                                {servicesList.map(serv =>

                                                    <option id={serv.id}>{serv.name}</option>

                                                )}
                                            </select>
                                            {idServ !== 0 ? <div>
                                                <select className="inputSignIn" onChange={onChangeHandler2}>
                                                    <option>SELECT EMPLOYEE</option>
                                                    {employeeList.map(emp =>

                                                        <option id={emp.id}>{emp.firstName}  {emp.lastName}</option>

                                                    )}
                                                </select>
                                                <button disabled={dis} className="treatBtn1" onClick={sendUpdateStatu}>Send Now <i class="bi bi-arrow-right-short"></i></button>
                                            </div> : ""}
                                        </div>
                                    </div>
                                </div>


                                {/* ---------SuccesMsg------------- */}
                                <div id="claimDet1" class="overlay12">
                                    <div class="popup4">
                                        <a class="close" href="/dashboardadmin"><i class="bi bi-x-circle-fill"></i>
                                        </a>
                                        <h2>Claim Transferred Successfully <i class="bi bi-check2-circle"></i></h2>
                                    </div>
                                </div>
                            </div>


                        </section>
                        <div className="DoughStyle">
                            <h2 className="statTit">  Employees/Service  </h2>
                            <Pie data={Doughnut} />


                        </div>
                    </div>
                    <div className="ClaimsPerMont" >
                        <DataStat />
                    </div>
                    

                </div>




            </div>

        </div>


    )
}

export default DashboardAdmin;