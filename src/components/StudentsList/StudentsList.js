import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import StudentService from './../../service/StudentService';
import './StudentsList.css';
import pdpAd from '../DashbordAdmin/pdpAdmin.jpg'
import { Tooltip, Button, Modal, Text, Switch } from "@nextui-org/react";
import { EyeIcon } from "./../NextUiIcons/EyeIcon";
import { EditIcon } from "./../NextUiIcons/EditIcon";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { IconButton } from "./../NextUiIcons/IconButton";
import { Redirect } from 'react-router-dom';
import i18next from "i18next"
import NotFound from './../404/404'





const StudentsList = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [students, setStudents] = useState([]);
    const [thisStudent, setThisStudent] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [classe, setClasse] = useState()
    const [baseImage, setBaseImage] = useState();
    const [accountStatus, setAccountStatus] = useState();



    useEffect(() => {

        StudentService.getAllStudents()
            .then(
                (result) =>
                    setStudents(result.data)
            )
    }, [accountStatus])

    const sendUpdateRequest = (e) => {

        e.preventDefault();

        const reqBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            profilePicture: baseImage,
            classe: classe
        }

        StudentService.updateStudent(reqBody, thisStudent.id)
            .then((response) => {
                if (response.status === 200) {
                    setVisible3(true);

                }
                return Promise.reject("Failed . Please try again !");
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

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const closeHandler = () => {
        setVisible(false);
        setVisible4(false);
        setVisible2(false);
        setAccountStatus(null)
    };

    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "";
    };

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
                        <h2 className='hideC'>{i18next.t("students list")} </h2>
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
                                        <th className='thStd'>{i18next.t("nom")}</th>
                                        <th className='thStd hideC' >Class</th>
                                        <th className='thStd hideC'>Email</th>
                                        <th className='thStd' for="touch">ACTION</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="tbl-content1">
                            <table cellpadding="0" cellspacing="0" border="0" className="studentsTable">
                                <tbody>
                                    {students.filter((value) => {
                                        if (searchTerm === "")
                                            return value
                                        else if (value.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        else if (value.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        else if (value.classe.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                        else if (value.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                            return value
                                        }
                                    }).filter(s => s.role==="Student").map(student => <tr key={student.id}>
                                        <td className='thStd'>
                                            {student.id}
                                        </td>
                                        <td className='thStd'>
                                            {student.firstName}
                                        </td>
                                        <td className='thStd hideC'>
                                            {student.classe}
                                        </td>
                                        <td className='thStd hideC'>
                                            {student.email}
                                        </td>
                                        <td className='thStd'>

                                            <div className="actCl2" >

                                                <Tooltip content="Details">
                                                    <IconButton onClick={(e) => {
                                                        setThisStudent(student);
                                                        setAccountStatus(student.accStatus)
                                                        setVisible4(true);
                                                    }}>
                                                        <EyeIcon size={20} fill="rgb(20, 161, 28)" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content={i18next.t("edit")}>
                                                    <IconButton onClick={(e) => {
                                                        setThisStudent(student);
                                                        setFirstName(student.firstName);
                                                        setLastName(student.lastName);
                                                        setEmail(student.email);
                                                        setClasse(student.classe)
                                                        setBaseImage(student.profilePicture)
                                                        setVisible2(true);
                                                    }
                                                    }>
                                                        <EditIcon size={20} fill="rgb(247, 210, 0)" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip content={i18next.t("delete")} >
                                                    <IconButton onClick={(e) => {
                                                        setThisStudent(student);
                                                        setVisible(true);
                                                    }
                                                    }>
                                                        <DeleteIcon size={20} fill="red" />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>

                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>

            </div>

            {/* -------------StudentInfo----------------- */}
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible4}
                onClose={closeHandler}
                className="popUpInfo"
            >

                <div className="">

                    <span>{thisStudent?.profilePicture ? <img src={thisStudent?.profilePicture} className="pdp" /> : <img src={pdpAd} className="pdp" />}</span>
                    <h2 className="">{thisStudent?.firstName + ' ' + thisStudent?.lastName}</h2>
                    <p className="title"> Student</p>
                    <p>{thisStudent?.email}</p>
                </div>
            </Modal>


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
                            Are you sure you want to delete this student ?
                        </Text>
                    </Text>
                </Modal.Header>

                <Modal.Footer>
                    <Button auto flat color="grey" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto color="error" onClick={() => {
                        StudentService.deleteStudent(thisStudent.id);
                        window.location.href = ""
                    }} >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal
                closeButton
                blur
                open={visible2}
                width="50%"
                noPadding
                onClose={closeHandler}
            >

                <div className="EditEmployeeForm">

                    {/* ---------------------------------EmployeeInfo----------------------------- */}
                    <div className="profilCard">
                        <div className='upload'>
                            <span>{thisStudent?.profilePicture ? <img src={thisStudent?.profilePicture} className="pdp" /> : <img src={pdpAd} className="pdp" />}</span>
                            <div className='round'>
                                <input type="file"
                                    onChange={(e) => {
                                        upoloadImage(e);
                                    }}
                                />
                                <i class="bi bi-camera-fill"></i>
                            </div>
                        </div>
                        <h2 className="">{thisStudent?.firstName + ' ' + thisStudent?.lastName}</h2>
                        <p className="title"> Student</p>
                        <p>{thisStudent?.email}</p>

                    </div>



                    {/* --------------------------------EditForm--------------------------- */}
                    <form onSubmit={sendUpdateRequest} className="studentEdit">
                        <span className="spanLegend2">First Name</span>
                        <input type="text"
                            className="inputSignIn"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={thisStudent?.firstName} />
                        <span className="spanLegend2">Last Name</span>
                        <input type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="inputSignIn"
                            placeholder={thisStudent?.lastName} />


                        <span className="spanLegend2">Email</span>
                        <input type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputSignIn"
                            placeholder={thisStudent?.email} />
                        <span className="spanLegend2">Class</span>
                        <input type="text"
                            name="class"
                            value={classe}
                            onChange={(e) => setClasse(e.target.value)}
                            className="inputSignIn"
                            placeholder={thisStudent?.classe} />


                        <button class="updateEmp" ><i class="bi bi-arrow-repeat "></i> Save</button>


                    </form>

                </div>

            </Modal >


            <Modal open={visible3} onClose={closeHandler2} className="modaal" closeButton>
                <Modal.Body>
                    <h2>Updated successfully <i class="bi bi-check2-circle"></i></h2>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default StudentsList;