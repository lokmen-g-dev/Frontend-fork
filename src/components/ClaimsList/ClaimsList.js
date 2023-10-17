import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ClaimService from '../../service/ClaimService';
import EmployeeService from '../../service/EmployeeService';
import HandlingService from '../../service/HandlingService';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import i18next from "i18next"
import './ClaimsList.css'
import NotFound from './../404/404'
import { EyeIcon } from "./../NextUiIcons/EyeIcon";
import { EditIcon } from "./../NextUiIcons/EditIcon";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { Button, Modal, Text, Tooltip } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";



const ClaimsList = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [searchTerm, setSearchTerm] = useState('');
    const [servicesList, setServicesList] = useState([]);
    const [anneeDeb, setAnneeDeb] = useState("")
    const [anneeFin, setAnneeFin] = useState("")
    const [nameErr, setNameErr] = useState("");
    const [succesMsg, setSuccesMsg] = useState("");
    const [thisService, setThisService] = useState("");





    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);


    const closeHandler = () => {
        setVisible(false);
        setVisible1(false);
        setVisible2(false);
        setVisible4(false);

    };
    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "";
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const anneUniv = {
            anneeDeb: anneeDeb,
            anneeFin: anneeFin
        }

        if (anneeDeb !== "" && anneeFin !== "" && (anneeFin - anneeDeb === 1)) {
            HandlingService.createService(anneUniv)
                .then(
                    (result) => {
                        if (result.status === 200) {
                            setVisible2(false)
                            setSuccesMsg("Service successfully added");
                            setVisible3(true)

                        };
                    },
                );
        }
        else (setNameErr("Invalid Data"))
    }

    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
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
                <div className="tabStudentsTitle2">
                    <h2 className='hideC'>Année Universitaire</h2>
                    <div className='srch'>
                        <input type="search" placeholder={i18next.t("search") + " . . ."} onChange={(e) => { setSearchTerm(e.target.value) }} />
                        <i class="bi bi-search" ></i>
                    </div>
                </div>

                <section className="">

                    {/* --------Tab header----------- */}
                    <div className="tbl-header2">
                        <table cellpadding="0" cellspacing="0" border="0" className="servicesTable">
                            <thead>
                                <tr>
                                    <th className='thStd'>ANNEE DEB</th>
                                    <th className='thStd'>ANNEE FIN</th>
                                    <th className='thStd' for="touch">ACTION</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="tbl-content3">
                        <table cellpadding="0" cellspacing="0" border="0" className="studentsTable">
                            <tbody>
                                {servicesList.filter((value) => {
                                    if (searchTerm === "")
                                        return value
                                    else if (value.anneeDeb.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return value
                                    }
                                    else if (value.anneeFin.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return value
                                    }
                                }).map(service => <tr key={service.id}>
                                    <td className='thStd'>
                                        {service.anneeDeb}
                                    </td>
                                    <td className='thStd'>
                                        {service.anneeFin}
                                    </td>

                                    <td className='thStd'>

                                        <div className="actCl2" >

                                            <Tooltip content="Details">
                                                <IconButton >
                                                    {/* <EyeIcon size={20} fill="rgb(20, 161, 28)" /> */}
                                                </IconButton>
                                            </Tooltip>
                                            {/* <Tooltip content={i18next.t("edit")}>
                                                <IconButton >
                                                    <EditIcon size={20} fill="rgb(247, 210, 0)" onClick={() =>{
                                                        setVisible1(true);
                                                        setThisService(service);
                                                        setServiceName(service.name)
                                                    }}/>
                                                </IconButton>
                                            </Tooltip> */}

                                            <Tooltip content={i18next.t("delete")} >
                                                <IconButton >
                                                    <DeleteIcon size={20} fill="rgb(121, 125, 127)" onClick={() => {
                                                        setVisible(true);
                                                        setThisService(service)
                                                    }
                                                    } />
                                                </IconButton>
                                            </Tooltip>

                                        </div>

                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </section>
                <button class="addService" onClick={() => setVisible2(true)}><i class="bi bi-plus"></i> Nouvelle Année Universitaire</button>

            </div>

            {/* ----------------Delete PopUp-------------- */}
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text b id="modal-title" size={18}>
                        Delete Confirmation
                        <Text size={18}>
                            Are you sure you want to delete this service ?
                        </Text>
                    </Text>
                </Modal.Header>

                <Modal.Footer>
                    <Button auto flat color="grey" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto color="error" onClick={() => {
                        HandlingService.deleteServiceById(thisService?.anneeDeb)
                        window.location.href = ""
                    }} >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* ------------------AddService--------------------- */}
            <Modal
                closeButton
                blur
                open={visible2}
                noPadding
                onClose={closeHandler}
            >

                <div className="services">
                    <h2 className="servTi">Ajouter Année Universitaire </h2>
                    <input type="text"
                        className="inputSignIn"
                        placeholder="Année Deb"
                        name="anneeDeb"
                        onChange={(e) => setAnneeDeb(e.target.value)}
                        value={anneeDeb}
                    />

                    <input type="text"
                        className="inputSignIn"
                        placeholder="Année Fin"
                        name="anneFin"
                        onChange={(e) => setAnneeFin(e.target.value)}
                        value={anneeFin}
                    />
                    <span className="danger">{nameErr}</span>
                    <button className="sendBtn1" onClick={handleSubmit}> Add </button>
                </div>

            </Modal >

            {/* -----------Edit Service--------------- */}
            {/* <Modal
                closeButton
                blur
                noPadding
                open={visible1}
                onClose={closeHandler}
            >

                <div className="services">
                    <h2 className="servTi">Service name </h2>
                    <input type="text"
                        className="inputSignIn"
                        placeholder="Name"
                        name="serviceName"
                        onChange={(e) => setServiceName(e.target.value)}
                        value={serviceName}
                    />
                    <span className="danger">{nameErr}</span>
                    <button className="sendBtn1" onClick={() => {
                        HandlingService.updateService(thisService?.id,serviceName)
                        setVisible1(false)
                        setVisible3(true)
                        setSuccesMsg("Updated successfully")} }> Add </button>
                </div>

            </Modal > */}


            {/* -----------------SuucesMsg--------------------- */}
            <Modal open={visible3} onClose={closeHandler2} className="modaal" closeButton>
                <Modal.Body>
                    <h2>{succesMsg} <i class="bi bi-check2-circle"></i></h2>
                </Modal.Body>
            </Modal>

            <Modal open={visible4} onClose={closeHandler} className="Errmodaal" closeButton>
                <Modal.Body>
                    <h2> You can't delete this service  <br />
                        Check employees list before <i class="bi bi-exclamation-triangle"></i> </h2>
                </Modal.Body>
            </Modal>
        </>

    )
}


export default ClaimsList