import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import pdpAd from './blank.jpg'
import EmployeeService from './../../service/EmployeeService';
import './EmployeesList.css'
import i18next from "i18next"
import { EyeIcon } from "./../NextUiIcons/EyeIcon";
import { EditIcon } from "./../NextUiIcons/EditIcon";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { Button, Modal, Text } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";
import HandlingService from '../../service/HandlingService';
import { Redirect } from 'react-router-dom';
import NotFound from './../404/404'


const EmployeesList = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [thisEmployee, setThisEmployee] = useState("");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [formValues, setFormValues] = useState();
    const [baseImage, setBaseImage] = useState();
    const [servicesList, setServicesList] = useState([]);
    const [idServ, setIdServ] = useState(2)




    useEffect(() => {

        EmployeeService.getEmployeesInfos()
            .then(
                (result) =>
                    setEmployees(result.data)
            )
    }, [])

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);


    const closeHandler = () => {
        setVisible(false);
        setVisible2(false);
    };
    const closeHandler2 = () => {
        setVisible3(false);
        window.location.href = "";
    };


    // ---------EditEmployeee----------


    const sendUpdateRequest = (e) => {

        e.preventDefault();

        const reqBody2 = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            profilePicture: baseImage,
        }

        EmployeeService.updateEmployee(reqBody2, thisEmployee?.id, idServ)
            .then((response) => {
                if (response.status === 200) {
                    setVisible3(true);
                }
                return Promise.reject("Failed . Please try again !");
            })

    }

    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
            )
    }, [])

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

    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdServ(option);

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
                        <h2 className='hideC'>{i18next.t("employees list")} {thisEmployee.id}</h2>
                        <div className='srch'>
                            <input type="search" placeholder={i18next.t("search") + " . . ."} onChange={(e) => { setSearchTerm(e.target.value) }} />
                            <i class="bi bi-search" ></i>
                        </div>
                    </div>

                    <section className="tabEmployeesContainer">

                        {/* --------Tab header----------- */}


                        {employees.filter((value) => {
                            if (searchTerm == "")
                                return value
                            else if (value.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                            else if (value.service.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                            else if (value.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                            else if (value.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                        }).sort(function (a, b) { return a.id - b.id }).map(employee => <tr key={employee.id}>

                            <div className="cardsDisplay">
                                <div className="cardProfile">
                                    <div className="actBtn">
                                        <IconButton>
                                            <EyeIcon size={20} fill="#979797" />
                                        </IconButton>
                                        <IconButton onClick={(e) => {
                                            setThisEmployee(employee);
                                            setFirstName(employee.firstName);
                                            setLastName(employee.lastName);
                                            setEmail(employee.email);
                                            setBaseImage(employee.profilePicture)
                                            setVisible2(true);
                                        }}>
                                            <   EditIcon size={20} fill="#979797" />
                                        </IconButton>
                                        <IconButton onClick={(e) => {
                                            setThisEmployee(employee)
                                            setVisible(true);
                                        }}>
                                            <DeleteIcon size={20} fill="#FF0080" />
                                        </IconButton>
                                    </div>
                                    {employee.profilePicture ? <img src={employee.profilePicture} /> : <img src={pdpAd} />}
                                    <div className="profile_name">{employee.firstName + " " + employee.lastName}</div>
                                    <span>{employee.service}</span>
                                    <div className="profile_email">{employee.email}</div>
                                    {/* <button className="contact-btn" onClick={() => {
                                        ConversationsService.createConversations(AuthUser.id, employee.id);
                                        window.location.href = ("/messanger");
                                    }
                                    }>Message <i class="bi bi-chat-text"></i></button> */}


                                </div>
                            </div>


                        </tr>)}


                    </section>
                </div>

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
                            Are you sure you want to delete this employee ?
                        </Text>
                    </Text>
                </Modal.Header>

                <Modal.Footer>
                    <Button auto flat color="grey" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto color="error" onClick={() => {
                        EmployeeService.deleteEmployee(thisEmployee?.id);
                        window.location.href = ""
                    }} >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* -----------Edit PopUp--------------- */}
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
                            <span>{thisEmployee.profilePicture ? <img src={thisEmployee.profilePicture} className="pdp" /> : <img src={pdpAd} className="pdp" />}</span>
                            <div className='round'>
                                <input type="file"
                                    onChange={(e) => {
                                        upoloadImage(e);
                                    }}
                                />
                                <i class="bi bi-camera-fill"></i>
                            </div>
                        </div>
                        <h2 className="">{thisEmployee.firstName + ' ' + thisEmployee.lastName}</h2>
                        <p className="title"> Employee</p>
                        <p>{thisEmployee.email}</p>
                    </div>



                    {/* --------------------------------EditForm--------------------------- */}
                    <form onSubmit={sendUpdateRequest} className="studentEdit">
                        <span className="spanLegend2">First Name</span>
                        <input type="text"
                            className="inputSignIn"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={thisEmployee.firstName} />
                        <span className="spanLegend2">Last Name</span>
                        <input type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="inputSignIn"
                            placeholder={thisEmployee.lastName} />


                        <span className="spanLegend2">Email</span>
                        <input type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputSignIn"
                            placeholder={thisEmployee.email} />
                        <span className="spanLegend2">Service</span>
                        <select className="inputSignIn" name="service" onChange={onChangeHandler}>
                            {/* <option>SELECT YOUR SERVICE</option> */}
                            {servicesList.map(serv =>

                                <option id={serv.id}>{serv.name}</option>

                            )}
                        </select>

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

export default EmployeesList;