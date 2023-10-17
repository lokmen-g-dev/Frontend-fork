import { useEffect, useState } from "react";
import moment from 'moment';
import './EmployeeClaimsList.css'
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import ClaimService from "../../service/ClaimService";
import NotifService from "../../service/NotifService";
import { Button, Modal, Text } from "@nextui-org/react";
import pdpAd from './../EmployeesList/blank.jpg'
import NotFound from './../404/404'
import { IconButton } from "./../NextUiIcons/IconButton";
import ConversationsService from "../../service/ConversationsService";
import { Redirect } from "react-router-dom";
import i18next from "i18next"


const EmployeeClaimsList = () => {


    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [thisClaimInfo, setThisClaimInfo] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [joinInfo, setJoinInfo] = useState({});
    const [employeeClaims, setEmployeeClaims] = useState([]);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible, setVisible] = useState(false);
    const [respErr, setRespErr] = useState(false);
    const [resp, setResp] = useState("");

    const closeHandler = () => {
        setVisible2(false);
        setVisible(false)
    };

    useEffect(() => {

        ClaimService.getClaimsByEmployeeId(AuthUser?.id)
            .then(
                (result) => {
                    setEmployeeClaims(result.data);
                },
            )

    }, [])

    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "";
    };

    const sendResponse = (e) => {

        e.preventDefault();

        const reqBody = {
            status: "Finished",
        }
        const reqBody2 = {
            "responseMessage": resp,
        }
        const NotifBody = { notificationMessage: "Hey ! " + joinInfo.fisrtName + " your claim is finished" }
        const NotifBody2 = { notificationMessage: AuthUser.firstName + " a traité la reclamations" }
        ClaimService.sendResponse(reqBody2, thisClaimInfo?.id)
            .then((response) => {
                if (response.status === 201) {
                    ClaimService.updateClaiStatu(reqBody, thisClaimInfo.id)
                    NotifService.sendNotifsStudent(NotifBody, joinInfo.stdId)
                    NotifService.sendNotifsAdmin(NotifBody2)
                    setVisible3(true);
                    window.location.href = "/employee/claims";
                    setVisible(false)
                }
                return Promise.reject("Failed . Please try again !");
            })

    }

    const sendFinishedStatu = (e) => {

        e.preventDefault();

        const reqBody = {
            status: "Finished",
        }

        const NotifBody = { notificationMessage: "Hey ! " + joinInfo.fisrtName + " your claim is finished" }
        const NotifBody2 = { notificationMessage: AuthUser.firstName + " a traité la reclamations" }
        ClaimService.updateClaiStatu(reqBody, thisClaimInfo.id)
            .then((response) => {
                if (response.status === 200) {
                    NotifService.sendNotifsStudent(NotifBody, joinInfo.stdId)
                    NotifService.sendNotifsAdmin(NotifBody2)
                    window.location.href = "/employee/claims";
                }
                return Promise.reject("Failed . Please try again !");
            })

    }
    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    if (AuthUser.role !== "Employee") {
        return <NotFound />;
      }
      
    return (
        <>
            <NavBar />
            <SideBar />

            <div className="homeContent">
                <div>
                    <div className="tabStudentsTitle">
                        <h2 className='hideC'>{i18next.t("claims list")} </h2>
                        <div>
                        </div>
                        <div className='srch'>

                        <input type="search" placeholder={i18next.t("search") + " . . ."}  onChange={(e) => { setSearchTerm(e.target.value) }} />
                            <i className="bi bi-search" ></i>
                        </div>
                    </div>
                    <section className="tabStudentsContainer">
                        {/* --------Tab header----------- */}
                        <div className="tbl-header1">
                            <table cellPadding="0" cellSpacing="0" border="0" className="studentsTable">
                                <thead>
                                    <tr>
                                        <th className='thStd'>ID</th>
                                        <th className='thStd hideC' >{i18next.t("TITLE")}</th>
                                        <th className='thStd hideC' >Description</th>
                                        <th className='thStd hideC'>DATE</th>
                                        <th className='thStd hideC' htmlFor="touch" >STATUS</th>
                                        <th className='thStd' htmlFor="touch">ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* -----------Tab Content------------ */}
                        <div className="tbl-content1">
                            <table cellPadding="0" cellSpacing="0" border="0" className="studentsTable">
                                <tbody>
                                    {employeeClaims.filter((value) => {
                                        if (searchTerm == "")
                                            return value
                                        if (value.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        if (value.dateRec.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                    }).map(claim => <tr key={claim.id}>
                                        <td className='thStd'>
                                            {claim.id}
                                        </td>
                                        <td className='thStd'>
                                            {claim.title}
                                        </td>
                                        <td className='thStd hideC'>
                                            {claim.description.substring(0, 40) + "..."}
                                        </td>
                                        <td className='thStd hideC'>
                                            {moment(claim.dateRec).format('ll')}
                                        </td>
                                        <td className='thStd hideC'>
                                            {claim.status === "In progress" ? <button className="WaitStatu1">{i18next.t("waiting")}</button> : ""}
                                            {claim.status === "Finished" ? <button className="FiniStatu1">{i18next.t(claim.status)}</button> : ""}
                                        </td>
                                        <td className='thStd'>

                                            {/* -------Action pour les reclamations en attente------------ */}
                                            <a className="buttonPopUp" >
                                                <button className="treatBtn" onClick={(e) => {
                                                    setThisClaimInfo(claim);
                                                    ClaimService.getClaimsStdInfo(claim.id)
                                                        .then(
                                                            (result) => {
                                                                setJoinInfo(result.data);
                                                            }
                                                        )
                                                    setVisible2(true);
                                                }}>{i18next.t("see Details")} <i className="bi bi-search"></i></button>
                                            </a>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </div>
            <Modal
                closeButton
                open={visible2}
                width="50%"
                noPadding
                onClose={closeHandler}
            >

                <div className="">

                    <div className='claimInfo'>
                        <h5 className='Tit13'>{i18next.t("claim details")} :
                            {thisClaimInfo?.status === "Finished" ? <button className="FiniStatu2">{i18next.t(thisClaimInfo?.status)}</button> : <button className="WaitStatu2">{i18next.t("Waiting for treatment")}</button>} </h5>
                        <h2 className="">{thisClaimInfo?.title}</h2>
                        <div>
                            <p>{thisClaimInfo.description}</p>
                            <p className=''>{moment(thisClaimInfo.dateRec).format('LL')}</p>
                        </div>

                        <div className="stdInfoRec">
                            <p>{joinInfo.profilePicture ? <img src={joinInfo.profilePicture} className="profil-img2" /> : <img src={pdpAd} className="profil-img2" />}</p>

                            <p className='Tit14'>{i18next.t("student")} :</p>
                            <div>{joinInfo.fisrtName + " " + joinInfo.lastName}</div>
                            <button className="MsgEmp" onClick={() => {
                                ConversationsService.createConversations(joinInfo.stdId, AuthUser.id);
                                window.location.href = ("/messanger");
                            }}
                            >{i18next.t("SEND A MESSAGE")} </button>
                        </div>

                        {thisClaimInfo?.status !== "Finished" ? <a className="buttonPopUp" > <button className="treatBtn1" onClick={() => setVisible(true)}
                        >{i18next.t("Send Response")} <i className="bi bi-arrow-right-short"></i></button> </a> : ""}

                    </div>

                </div>


            </Modal >
            <Modal open={visible} onClose={closeHandler} blur closeButton className='modalResp'>
                <Modal.Body>
                    <span>{i18next.t("Response")} :{respErr}</span>
                    <textarea className='inputSignIn textar' onChange={(e) => setResp(e.target.value)} />
                    <button className="treatBtn1 seendRe" onClick={sendResponse}>{i18next.t("Send")} </button>
                </Modal.Body>
            </Modal>

            <Modal open={visible3} onClose={closeHandler2} className="modaal" closeButton>
                <Modal.Body>
                    <h2>{i18next.t("Response sent successfully")} <i class="bi bi-check2-circle"></i></h2>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default EmployeeClaimsList