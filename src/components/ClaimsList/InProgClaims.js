import moment from 'moment';
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import './ClaimsList.css'
import NotFound from './../404/404'
import { Redirect } from 'react-router-dom';
import i18next from "i18next"
import { Button, Modal } from '@nextui-org/react';
import HandlingService from '../../service/HandlingService';
import { EditIcon } from "./../NextUiIcons/EditIcon";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { Text, Tooltip } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";




const InProgClaims = () => {
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [claims, setClaims] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [visible3, setVisible3] = useState(false);
    const [anneeList, setAnneeList] = useState([])
    const [idServ, setIdServ] = useState(0);
    const [anneeFin, setAnneeFin] = useState("");
    const [visible2, setVisible2] = useState(false);
    const [dateDebSem, setDateDebSem] = useState("");
    const [dateFinSem, setDateFinSem] = useState("");
    const [dateDebSem2, setDateDebSem2] = useState("");
    const [dateFinSem2, setDateFinSem2] = useState("");

    const [numSem, setNumSem] = useState("")
    const [succesMsg, setSuccesMsg] = useState("");
    const [thisService, setThisService] = useState("");
    const [visible1, setVisible1] = useState(false);
    const [visible4, setVisible4] = useState(false);


    const closeHandler = () => {
        setVisible1(false);
        setVisible2(false);
        setVisible4(false);
        // setDateDebSem("");
        // setDateFinSem("")

    };

    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "";
    };

    useEffect(() => {

        HandlingService.getAllPeriode()
            .then(
                (result) =>
                    setClaims(result.data)
            )
    }, [])


    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setAnneeList(result.data);
                },
            )
    }, [])
    const onChangeHandler = (e) => {

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdServ(option);
        setAnneeFin(parseInt(option) + 1)
    }

    const onChangeHandler2 = (e) => {

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setNumSem(option);
        console.log(numSem)
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const semestre = {
            anneeDeb: idServ,
            anneeFin: anneeFin,
            numSemestre: numSem,
            dateDebSemstre: dateDebSem,
            dateFinSemstre: dateFinSem
        }

        console.log(semestre)

        HandlingService.createSemestre(semestre)
            .then(
                (result) => {
                    if (result.status === 200) {
                        setVisible2(false)
                        setSuccesMsg("Semestre successfully added");
                        setVisible3(true)

                    };
                },
            );
    }

    const semestre = {
        dateDebSemstre: dateDebSem2,
        dateFinSemstre: dateFinSem2
    }


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
                        <h2 className='hideC'>Liste des Periodes</h2>
                        <div>
                        </div>
                        {/* <div className='srch'>
                        <input type="search" placeholder={i18next.t("search") + " . . ."}  onChange={(e) => { setSearchTerm(e.target.value) }} />
                            <i className="bi bi-search" ></i>
                        </div> */}
                    </div>

                    <section className="tabStudentsContainer">
                        {/* --------Tab header----------- */}
                        <div className="tbl-header1">
                            <table cellPadding="0" cellSpacing="0" border="0" className="studentsTable">
                                <thead>
                                    <tr>
                                        <th className='thStd'>ANNEE DEB</th>
                                        <th className='thStd'>NUM SEMESTRE</th>
                                        <th className='thStd hideC' >DATE DEB</th>
                                        <th className='thStd hideC'>DATE FIN</th>
                                        <th className='thStd hideC' htmlFor="touch"  >NUM PERIODE </th>
                                        <th className='thStd' htmlFor="touch">ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* -----------Tab Content------------ */}
                        <div className="tbl-content1">
                            <table cellPadding="0" cellSpacing="0" border="0" className="studentsTable">
                                <tbody>
                                    {claims.map(claim => <tr key={claim.id}>
                                        <td className='thStd'>
                                            {claim.anneeDeb}
                                        </td>
                                        <td className='thStd'>
                                            {claim.numSemestre}
                                        </td>
                                        <td className='thStd hideC'>
                                            {moment(claim.dateDebPeriode).format('DD/MM/YY')}
                                        </td>
                                        <td className='thStd hideC'>
                                            {moment(claim.dateFinPeriode).format('DD/MM/YY')}

                                        </td>
                                        <td className='thStd hideC'>
                                            {claim.numPeriode}
                                        </td>
                                        <td className='thStd'>

                                            <div className="actCl2" >

                                                <Tooltip content="Details">
                                                    <IconButton >
                                                        {/* <EyeIcon size={20} fill="rgb(20, 161, 28)" /> */}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content={i18next.t("edit")}>
                                                    <IconButton >
                                                        <EditIcon size={20} fill="rgb(247, 210, 0)" onClick={() => {
                                                            setThisService(claim)
                                                            setDateDebSem2(moment(claim.dateDebSemstre).format('yyyy-MM-DD'))
                                                            setDateFinSem2(moment(claim.dateFinSemstre).format('yyyy-MM-DD'))
                                                            setVisible1(true);
                                                        }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip content={i18next.t("delete")} >
                                                    <IconButton >
                                                        <DeleteIcon size={20} fill="red" onClick={() => {
                                                            setVisible4(true);
                                                            setThisService(claim)

                                                        }} />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>

                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <button className="addService" onClick={() => setVisible2(true)}><i className="bi bi-plus"></i> Ajouter Periode</button>




                    {/* ---------SuccesMsg------------- */}


                    <Modal open={visible3} onClose={closeHandler2} className="modaal" closeButton>
                        <Modal.Body>
                            <h2> {succesMsg}<i className="bi bi-check2-circle"></i></h2>
                        </Modal.Body>
                    </Modal>
                </div>

                {/* ------------------Add Semestre--------------------- */}
                <Modal
                    closeButton
                    blur
                    open={visible2}
                    noPadding
                    onClose={closeHandler}
                >

                    <div className="services">
                        <h2 className="servTi">Ajouter Semestre </h2>
                        <select className="inputSignIn" name="service" onChange={onChangeHandler}>
                            <option>Année Deb</option>
                            {anneeList.map(serv =>

                                <option id={serv.anneeDeb}>{serv.anneeDeb}</option>

                            )}
                        </select>
                        <input type="text"
                            className="inputSignIn"
                            placeholder="Année Fin"
                            name="anneeDeb"
                            disabled
                            // onChange={(e) => setAnneeFin(e.target.value)}
                            value={anneeFin}
                        />
                        <input type="date"
                            className="inputSignIn"
                            placeholder="Date Deb Semestre"
                            // name="anneeDeb"
                            onChange={(e) => setDateDebSem(e.target.value)}
                            value={dateDebSem}
                        />
                        <input type="date"
                            className="inputSignIn"
                            placeholder="Date Fin Semestre"
                            // name="anneFin"
                            onChange={(e) => setDateFinSem(e.target.value)}
                            value={dateFinSem}
                        />
                        <select className="inputSignIn" name="service" onChange={(e) => setNumSem(e.target.selectedIndex)}>
                            <option>Num Semestre</option>
                            <option id={1} >1</option>
                            <option id={2}>2</option>
                        </select>

                        {/* <span className="danger">{nameErr}</span> */}
                        <button className="sendBtn1" onClick={handleSubmit}> Add </button>
                    </div>

                </Modal >

                {/* ----------------Delete PopUp-------------- */}
                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible4}
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
                            HandlingService.deleteSemestreById(thisService?.id)
                            window.location.href = ""
                        }} >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* -----------Edit Service--------------- */}
                <Modal
                    closeButton
                    blur
                    noPadding
                    open={visible1}
                    onClose={closeHandler}
                >

                    <div className="services">
                        <h2 className="servTi">Update Semestre </h2>
                        <input type="date"
                            className="inputSignIn"
                            placeholder="Name"
                            name="serviceName"
                            onChange={(e) => setDateDebSem2(e.target.value)}
                            value={dateDebSem2}
                        />
                        <input type="date"
                            className="inputSignIn"
                            name="serviceName"
                            onChange={(e) => setDateFinSem2(e.target.value)}
                            value={dateFinSem2}
                        />
                        <button className="sendBtn1" onClick={() => {
                            HandlingService.updateSem(thisService?.id, semestre)
                            setVisible1(false)
                            setVisible3(true)
                            setSuccesMsg("Updated successfully")
                        }
                        }> Update </button>
                    </div>

                </Modal >
            </div>


        </>
    )
}


export default InProgClaims