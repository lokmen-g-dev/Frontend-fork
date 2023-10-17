import React, { useEffect, useState } from "react"
import './EditForm.css'
import pdp from './../Profil/studentpdp.jpg'
import StudentService from "../../service/StudentService"
import EmployeeService from "../../service/EmployeeService"
import ForgotPasswordService from "../../service/ForgotPasswordService"
import i18next from "i18next"
import { Redirect } from "react-router-dom";
import {  Modal } from "@nextui-org/react";
import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import HandlingService from "../../service/HandlingService";


const EditProfil = () => {


    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [initialValues, setInitialValues] = useState({ firstName: AuthUser?.firstName, lastName: AuthUser?.lastName, classe: AuthUser?.classe, email: AuthUser?.email });
    const [formValues, setFormValues] = useState(initialValues);
    const [baseImage, setBaseImage] = useState(AuthUser?.profilePicture);
    const [servicesList, setServicesList] = useState([]);
    const [idServ, setIdServ] = useState("")
    const [visible2, setVisible2] = useState(false);
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passErr, setPassErr] = useState("")
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [emErr,setEmErr] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const cancelUpdate = (e) => {
        setFormValues(initialValues);
    }
    const closeHandler = () => {
        setVisible2(false);
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("")
        setPassErr("")
    };
    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "/profil";
    };

    const sendUpdateRequest = (e) => {

        e.preventDefault();

        const reqBody = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            classe: formValues.classe,
            profilePicture: baseImage
        }
            StudentService.updateStudent(reqBody, AuthUser?.id)
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("AuthUser", JSON.stringify(response.data))
                        setVisible3(true)
                        setEmErr("Ussed")
                    }
                    else setEmErr("Ussed")
                })          

    }



    const upoloadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64)
        setBaseImage(base64)
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };

        });
    }

    const updatePass = (e) => {

        e.preventDefault();
        if (newPass !== confirmPass)
            setPassErr("Passwords does not match")
        else if (newPass.length < 6)
            setPassErr("Password > 6")
        else if (newPass===confirmPass) {
            ForgotPasswordService.updatePass(AuthUser.email, currentPass, newPass)
                .then(
                    (res) => {
                        if (!res.data)
                            setPassErr("Current password inccorect")
                        else
                            {
                                setVisible2(false)
                                setVisible3(true)
                            }
                    }
                )
        }
    }

    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
            )
        if (AuthUser.role !== "Student") {
            HandlingService.getServiceByEmployeeId(AuthUser?.id)
                .then(
                    (res) => {
                        setIdServ(res.data.id)
                    }
                )
        }
    }, [])

    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdServ(option);

    }

    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <div>
                <SideBar />
                <NavBar />


                {/* ----------------------------EditContainer----------------------- */}
                <h5 className="FormTitle"> {i18next.t("edit profile")}  </h5>

                <div className="EditForm">

                    {/* ---------------------------------Profil----------------------------- */}
                    <div className="profilCard">

                        <div className='upload'>
                            <span>{AuthUser.profilePicture ? <img src={AuthUser.profilePicture} className="pdp" /> : <img src={pdp} className="pdp" />}</span>
                            <div className='round'>
                                <input type="file"
                                    onChange={(e) => {
                                        upoloadImage(e);
                                    }}
                                />
                                <i class="bi bi-camera-fill"></i>
                            </div>
                        </div>
                        <h2 className="">{AuthUser.firstName + ' ' + AuthUser.lastName}</h2>
                        <p className="title"> {AuthUser.role}</p>
                        <p>{AuthUser.email}</p>
                        <span className="lienRetour" onClick={() => setVisible2(true)}>{i18next.t("change password")} <i class="bi bi-lock" ></i></span>
                    </div>



                    {/* --------------------------------EditForm--------------------------- */}
                    <form onSubmit={sendUpdateRequest} className="studentEdit">
                        <span className="spanLegend">{i18next.t("firstName")}</span>
                        <input type="text"
                            className="EditInput"
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                            placeholder={AuthUser.firstName} />
                        <span className="spanLegend">{i18next.t("lastName")}</span>
                        <input type="text"
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleChange}
                            className="EditInput"
                            placeholder={AuthUser.lastName} />


                        <span className="spanLegend">Email</span>
                        {emErr}
                        <input type="text"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            class="EditInput "
                            placeholder={AuthUser.email} />
                       <br/>
                       <br/>

                        <button class="update" ><i class="bi bi-person-check "></i> {i18next.t("save")}</button>


                    </form>
                    <button class="cancel" onClick={cancelUpdate}><i class="bi bi-x"></i> {i18next.t("cancel")}</button>

                    <div id="popup4" class="overlay12">
                        <div class="popup4">
                            <h2>Updated successfully <i class="bi bi-check2-circle"></i></h2>
                            <a class="close" href="/profil"><i class="bi bi-x-circle-fill"></i></a>
                        </div>
                    </div>



                </div>

            </div>
            <Modal
                closeButton
                blur
                open={visible2}
                width="30%"
                noPadding
                onClose={closeHandler}
            >

                <div className="updatePass">
                    {currentPass}
                    <form onSubmit={updatePass} className="studentEdit">
                        <span className="spanLegend2">Current Password</span>
                        <input type="password"
                            className="inputSignIn"
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            name="password"
                        />
                        <span className="spanLegend2">New Password</span>
                        <input type="password"
                            name="lastName"
                            onChange={(e) => setNewPass(e.target.value)}
                            value={newPass}
                            className="inputSignIn"
                        />
                        <span className="spanLegend2">Confirm New Password</span>
                        <input type="password"
                            name="email"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="inputSignIn"
                        />
                        <span className="danger">{passErr}</span>
                        <button class="updateEmp" ><i class="bi bi-arrow-repeat " ></i> Save</button>


                    </form>

                </div>

            </Modal >
            <Modal open={visible4} onClose={closeHandler} className="Errmodaal" closeButton>
                <Modal.Body>
                    <h2> Email adress already used  <i class="bi bi-exclamation-triangle"></i> </h2>
                </Modal.Body>
            </Modal>
            <Modal open={visible3} onClose={closeHandler2} className="modaal" closeButton>
                <Modal.Body>
                    <h2>Updated successfully <i class="bi bi-check2-circle"></i></h2>
                </Modal.Body>
            </Modal>
            
        </>
    )

}

export default EditProfil;

