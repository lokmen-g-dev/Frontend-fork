import React, { useEffect, useState } from "react";
import ClaimService from "../../service/ClaimService";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import './StudentClaimsList.css'
import { EyeIcon } from "./../NextUiIcons/EyeIcon";
import { EditIcon } from "./../NextUiIcons/EditIcon";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { Tooltip, Button, Modal, Text } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";
import { Redirect } from "react-router-dom";
import NotFound from './../404/404'
import EmployeeService from "../../service/EmployeeService";
import i18next from "i18next"


function StudentClaimsList() {

  const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
  const thisClaim = JSON.parse(localStorage.getItem("thisObject"));
  const [claims, setClaims] = useState([]);
  const [finClaims, setFinClaims] = useState(false);
  const [inProgClaims, setInProgClaims] = useState(false);
  const [waitClaims, setWaitClaims] = useState(false);
  const [allClaims, setAllClaims] = useState(true);
  const [scrollBar, setScrollBar] = useState(true);
  const [status, setStatus] = useState("STATUS");
  const [visible2, setVisible2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Errvisible, setErrVisible] = useState(false);
  const [treatmentInfo, setTreatmentInfo] = useState("");
  const [empInfo, setEmpInfo] = useState("");


  const closeHandler = () => {
    setVisible2(false);
    setVisible(false);
    setTreatmentInfo("");
    setEmpInfo("")
    setErrVisible(false);

  };



  useEffect(() => {


    ClaimService.getClaimsByStudentId(AuthUser?.id)
      .then(
        (result) => {
          setClaims(result.data);
        },
      )


  }, [])


  if (!AuthUser) {
    return <Redirect to="/login" />;
  }

  if (AuthUser.role !== "Student") {
    return <NotFound />
  }

  return (
    <div>
      <SideBar />
      <NavBar />

      <div className="homeContent">
        <input type="checkbox" id="touch" onClick={() => {
          setScrollBar(true)
        }} />

        {/* ========================================scrollBar=============================== */}
        {scrollBar ? <ul class="slide11">
          <li onClick={() => {
            setInProgClaims(false)
            setFinClaims(false)
            setAllClaims(true)
            setWaitClaims(false)
            setScrollBar(false)
            setStatus("STATUS")
          }
          }>
            <i class="bi bi-journal-text statuIc"></i>{i18next.t("ALL CLAIMS")}
          </li>


          <li onClick={() => {
            setInProgClaims(false)
            setFinClaims(false)
            setAllClaims(false)
            setWaitClaims(true)
            setScrollBar(false)
            setStatus(i18next.t("WAITING"))
          }
          }>
            <i class="bi bi-journal-x statuIc"></i>{i18next.t("WAITING")}
          </li>


          <li onClick={() => {
            setInProgClaims(true)
            setAllClaims(false)
            setFinClaims(false)
            setWaitClaims(false)
            setScrollBar(false)
            setStatus(i18next.t("IN PROGRESS"))
          }
          }>
            <i class="bi bi-journal-minus statuIc" ></i>{i18next.t("IN PROGRESS")}</li>
          <li onClick={() => {
            setFinClaims(true)
            setInProgClaims(false)
            setAllClaims(false)
            setWaitClaims(false)
            setScrollBar(false)
            setStatus(i18next.t("FINISHED"))


          }}>
            <i class="bi bi-journal-check statuIc" ></i>{i18next.t("FINISHED")}</li>


        </ul> : " "}

        {/* =========================================FnScrollBar============================== */}

        <section className="tabContainer">

          <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th >{i18next.t("TITLE")}</th>
                  <th><label for="touch" className="statuIc">{status} <i class="bi bi-chevron-double-down statuIc"></i></label>  </th>
                  <th>DATE</th>
                  <th for="touch">ACTION</th>
                </tr>
              </thead>
            </table>

          </div>
          <div class="tbl-content">
            {claims.length > 0 ? <table cellpadding="0" cellspacing="0" border="0" className="table">
              <tbody>


                {/* ==================================================Afficher tout les reclamations================================= */}
                {claims.map(claim => <tr key={claim.id}>
                  {allClaims ? <>
                    <td>
                      {claim.id}

                    </td>
                    <td>
                      {claim.title}
                    </td>
                    <td >
                      {claim.status === "Waiting for treatment" ? <button className="WaitStatu">{i18next.t(claim.status)}</button> : ""}
                      {claim.status === "In progress" ? <button className="InProgStatu">{i18next.t(claim.status)}</button> : ""}
                      {claim.status === "Finished" ? <button className="FiniStatu">{i18next.t(claim.status)}</button> : ""}
                    </td>
                    <td>
                      {claim.dateRec}
                    </td>
                    <td>

                      <div className="actCl">

                        <Tooltip content="Details">
                          <IconButton onClick={(e) => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            setVisible2(true)
                            if (claim.status === "Finished") {
                              ClaimService.getResponse(claim.id)
                                .then((res) => {
                                  setTreatmentInfo(res.data)
                                })
                              ClaimService.getClaimsEmpInfo(claim.id)
                                .then((res) => {
                                  if (res.data) {
                                    setEmpInfo(res.data)
                                  }
                                  else {
                                    EmployeeService.getAdminInfo()
                                    .then((res) => {
                                      setEmpInfo(res.data);
                                    })
                                  }
                                })
                            }
                          }
                          }>
                            <EyeIcon size={20} fill="rgb(20, 161, 28)" />
                          </IconButton>
                        </Tooltip>



                        {/* ******************Update Claim****************************** */}
                        <Tooltip content={i18next.t("edit")}>
                          <IconButton onClick={(e) => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            if (claim.status === "Waiting for treatment") window.location.href = '/editclaim'
                          }
                          } className={claim.status !== "Waiting for treatment" ? 'edtIc' : ''}>
                            <   EditIcon size={20} fill={claim.status !== "Waiting for treatment" ? '#979797' : '#FFD21E'} />
                          </IconButton>
                        </Tooltip>

                        {/* *****************Delete Claim****************** */}

                        <a class="buttonPopUp">
                          <Tooltip content={i18next.t("delete")}>
                            <IconButton onClick={() => {
                              localStorage.setItem('thisObject', JSON.stringify(claim))
                              if (claim.status !== "In progress") {
                                setVisible(true)
                              }
                            }}
                              className={claim.status === "In progress" ? 'edtIc' : ''}>
                              <DeleteIcon size={20} fill={claim.status === "In progress" ? '#979797' : 'red'} />
                            </IconButton>
                          </Tooltip>
                        </a>

                      </div>

                    </td>
                  </> : " "}
                </tr>)}

                {/* ========================================Afficher les reclamations finis ==================================== */}
                {claims.map(claim => <tr key={claim.id}>
                  {claim.status === "Finished" && finClaims ? <>
                    <td>
                      {claim.id}
                    </td>
                    <td>
                      {claim.title}
                    </td>
                    <td >
                      {claim.status === "Finished" ? <button className="FiniStatu">{i18next.t(claim.status)}</button> : ""}
                    </td>
                    <td>
                      {claim.dateRec}
                    </td>
                    <td>

                      {/* ==============================PopUp============================= */}

                      <div className="actCl">

                        <Tooltip content="Details">
                          <IconButton onClick={(e) => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            setVisible2(true)
                          }
                          }>
                            <EyeIcon size={20} fill="rgb(20, 161, 28)" />
                          </IconButton>
                        </Tooltip>
                        {/* ******************Update Claim****************************** */}
                        <a class="buttonPopUp" href={claim.status !== "Waiting for treatment" ? '#' : '/editclaim'}>
                          <Tooltip content={i18next.t("edit")}>
                            <IconButton onClick={(e) => {
                              localStorage.setItem('thisObject', JSON.stringify(claim))
                            }
                            } className={claim.status !== "Waiting for treatment" ? 'edtIc' : ''}>
                              <EditIcon size={20} fill={claim.status !== "Waiting for treatment" ? '#979797' : '#FFD21E'} />
                            </IconButton>
                          </Tooltip>
                        </a>

                        {/* *****************Delete Claim****************** */}

                        <a class="buttonPopUp" href={claim.status !== "Waiting for treatment" ? '#' : '#popup2'}>
                          <Tooltip content={i18next.t("delete")} >
                            <IconButton onClick={() => {
                              setVisible(true)
                            }}>
                              <DeleteIcon size={20} fill='red' />
                            </IconButton>
                          </Tooltip>

                        </a>


                      </div>
                    </td>
                  </> : " "}


                </tr>)}

                {/* =========================================Afficher les reclamations en cours=================================== */}
                {claims.map(claim => <tr key={claim.id}>
                  {claim.status === "In progress" && inProgClaims ? <>
                    <td>
                      {claim.id}
                    </td>
                    <td>
                      {claim.title}
                    </td>
                    <td >
                      {claim.status === "In progress" ? <button className="InProgStatu">{i18next.t(claim.status)}</button> : ""}
                    </td>
                    <td>
                      {claim.dateRec}
                    </td>
                    <td>

                      <div className="actCl">

                        <Tooltip content="Details">
                          <IconButton onClick={(e) => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            setVisible2(true)
                          }
                          }>
                            <EyeIcon size={20} fill="rgb(20, 161, 28)" />
                          </IconButton>
                        </Tooltip>
                        {/* ******************Update Claim****************************** */}
                        <a class="buttonPopUp" href={claim.status !== "Waiting for treatment" ? '#' : '/editclaim'}>
                          <Tooltip content={i18next.t("edit")}>
                            <IconButton className='edtIc'>
                              <EditIcon size={20} fill={claim.status !== "Waiting for treatment" ? '#979797' : '#FFD21E'} />
                            </IconButton>
                          </Tooltip>
                        </a>

                        {/* *****************Delete Claim****************** */}

                        <a class="buttonPopUp" href={claim.status !== "Waiting for treatment" ? '#' : '#popup2'}>
                          <Tooltip content={i18next.t("delete")} >
                            <IconButton
                              className='edtIc'>
                              <DeleteIcon size={20} fill={claim.status !== "Waiting for treatment" ? '#979797' : 'red'} />
                            </IconButton>
                          </Tooltip>

                        </a>
                        <div id="popup2" class="overlay12">
                          <div class="popup21">
                            <h2>{i18next.t("delete Confirmation")}</h2>
                            <div className="textConfirm">
                            {i18next.t("are you sure you want to delete this claim ?")}
                            </div>
                            <a class="close2" href="claimlist" onClick={() => {
                              ClaimService.deleteClaim(thisClaim.id);
                            }}>{i18next.t("delete")}</a>
                            <a class="close5" href="#">{i18next.t("cancel")}</a>
                          </div>
                        </div>

                      </div>
                    </td>
                  </> : ""}
                </tr>)}


                {/* ====================================Afficher les reclamations non traitée=================================== */}
                {claims.map(claim => <tr key={claim.id}>
                  {claim.status === "Waiting for treatment" && waitClaims ? <>
                    <td>
                      {claim.id}
                    </td>
                    <td>
                      {claim.title}
                    </td>
                    <td >
                      {claim.status === "Waiting for treatment" ? <button className="WaitStatu">{i18next.t(claim.status)}</button> : ""}
                    </td>
                    <td>
                      {claim.dateRec}
                    </td>
                    <td>


                      <div className="actCl">

                        <Tooltip content="Details">
                          <IconButton onClick={(e) => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            setVisible2(true)
                          }
                          }>
                            <EyeIcon size={20} fill="rgb(20, 161, 28)" />
                          </IconButton>
                        </Tooltip>
                        {/* ******************Update Claim****************************** */}
                        <a class="buttonPopUp" href='/editclaim'>
                          <Tooltip content={i18next.t("edit")}>
                            <IconButton className='' onClick={(e) => {
                              localStorage.setItem('thisObject', JSON.stringify(claim))
                            }
                            }>
                              <EditIcon size={20} fill='#FFD21E' />
                            </IconButton>
                          </Tooltip>
                        </a>

                        {/* *****************Delete Claim****************** */}

                        <Tooltip content={i18next.t("delete")} >
                          <IconButton onClick={() => {
                            localStorage.setItem('thisObject', JSON.stringify(claim))
                            setVisible(true)
                          }}>
                            <DeleteIcon size={20} fill='red' />
                          </IconButton>
                        </Tooltip>


                      </div>
                    </td>
                  </> : ""}
                </tr>)}
              </tbody>

            </table> : <div className="msg0Claim"> {i18next.t("you don't have any claim")}  <i class="bi bi-exclamation-triangle"></i></div>}

          </div>

        </section>
      </div>

      <Modal
        closeButton
        open={visible2}
        width="50%"
        noPadding
        onClose={closeHandler}
      >
        <div class="content">
          <h5 className="Tit13">{i18next.t("claim details")} : {thisClaim?.status === "Finished" ? <button className="FiniStatu">{i18next.t(thisClaim?.status)}</button> : ""}
            {thisClaim?.status === "Waiting for treatment" ? <button className="WaitStatu">{i18next.t(thisClaim?.status)}</button> : ""}
            {thisClaim?.status === "In progress" ? <button className="InProgStatu">{i18next.t(thisClaim?.status)}</button> : ""}
          </h5>


          <div className="detailsContainer">

            <span className="detailsItem1">{i18next.t("TITLE")}</span>
            <div className="detailsItem">{thisClaim?.title}</div>

            <span className="detailsItem1" >DESCRIPTION</span>
            <div className="detailsItem" >{thisClaim?.description}</div>

            <span className="detailsItem1">DATE</span>
            <div className="detailsItem">{thisClaim?.dateRec} <br />
              <span className="claimTime">{thisClaim?.timeRec}</span>
            </div>
          </div>

          {treatmentInfo ? <div className="detailsTreat">
            <span className="detailsItem1 ">{i18next.t("treatment informations")}</span>

            <div className="detailsContainer">

              <span className="detailsItem1">{i18next.t("response")}</span>
              <div className="detailsItem">{treatmentInfo?.responseMessage}</div>
              <span className="detailsItem1">{i18next.t("employee")}</span>
              {/* <div className="detailsItem">{empInfo?.firstName + " " + empInfo?.lastName}</div> */}
              <div className="detailsItem">{empInfo?.firstName + " " + empInfo?.lastName} <br />
              <span className="claimTime">{empInfo?.email}</span>
            </div>
              <span className="detailsItem1" >Date</span>
            <div className="detailsItem" >{treatmentInfo?.dateRec}</div>

              
            </div>
          </div> : ""}

        </div>

      </Modal>


      {/* --------------Delete PopUp---------------- */}
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
          {i18next.t("delete Confirmation")}
            <Text size={18}>
            {i18next.t("are you sure you want to delete this claim ?")}
            </Text>
          </Text>
        </Modal.Header>

        <Modal.Footer>
          <Button auto flat color="grey" onClick={closeHandler}>
          {i18next.t("cancel")}
          </Button>
          <Button auto color="error" onClick={() => {
            ClaimService.deleteClaim(thisClaim.id)
            window.location.href = ""
          }}>
            {i18next.t("delete")}
          </Button>
        </Modal.Footer>
      </Modal>


      {/* -------ErrPopUp----------- */}
      <Modal
        closeButton
        width={600}
        preventClose
        height={490}
        className="noAble"
        aria-labelledby="modal-title"
        open={Errvisible}
        onClose={closeHandler}
      >

        <div>
          Your account is disabled, please try again later!
        </div>
        <i class="bi bi-exclamation-circle"></i>
      </Modal>

    </div>


  )
}


export default StudentClaimsList