import React, { useEffect, useState, useRef } from "react";
import NotifService from "../../service/NotifService";
import './NavBar.css';
import pdpStd from './147142.png'
import logo from './logo4.png'
import pdpAd from './pdpAdmin.jpg'
import moment from 'moment'
import StudentService from "../../service/StudentService";
import EmployeeService from "../../service/EmployeeService";
import ConversationsService from "../../service/ConversationsService";
import Conversation from "../Messanger/Converstation/Conversation";
import Message from "../Messanger/Message/Message";
import { io } from "socket.io-client";
import { DeleteIcon } from "./../NextUiIcons/DeleteIcon";
import { Tooltip } from "@nextui-org/react";
import { IconButton } from "./../NextUiIcons/IconButton";


const NavBar = () => {
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [notifs, setNotifs] = useState([]);
    const [show, setShow] = useState(4);
    const lastNotifs = notifs.slice(-show);
    const [showNotif, setShowNotif] = useState(false);
    const [newNotif, setNewNotif] = useState();
    const [authUser, setAuthUser] = useState({});


    // -----------Chat-----------------
    const [currectChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [empName, setEmpName] = useState("");
    const [stdName, setStdName] = useState("");
    const [myConversations, setMyConversations] = useState([]);
    const scrollRef = useRef();
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState([]);
    const receiverUser = members.find(m => m !== AuthUser.id);
    const [showDisc, setShowDisc] = useState(false);
    const [newMsg, setNewMsg] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineUsers2, setOnlineUsers2] = useState([]);
    const [convIc, setConvIc] = useState("bi bi-chat-text-fill notifi");
    const [notifIc, setNotifIc] = useState("bi bi-bell-fill notifi")




    useEffect(() => {
        const data = localStorage.getItem("AuthUser");
        if (data) {
            setAuthUser(JSON.parse(data));
        }
    }, [])

    const handleShowNotif = () => {
        if (showNotif === true) {
            setNotifIc("bi bi-bell-fill notifi")
            setShowNotif(false);
        }
        else {
            setShowNotif(true)
            setNotifIc("bi bi-bell-fill notifi2")
            setConvIc("bi bi-chat-text-fill notifi")
            setShow(4)
            setShowDisc(false)
            setNewNotif(0)
        }
    }

    const handleShowDisc = () => {
        if (showDisc === true) {
            setShowDisc(false);
            setConvIc("bi bi-chat-text-fill notifi")
        }
        else {
            setShowNotif(false)
            setNotifIc("bi bi-bell-fill notifi")
            setConvIc("bi bi-chat-text-fill notifi2")
            setNewMsg(0)
            setShowDisc(true)
        }
    }



    const handleShowMore = () => {
        setShow(show + 5);
    }

    const deleteMyNotifs = () => {
        if (AuthUser.role === "Student") {
            NotifService.deleteStudentsNotifs(AuthUser.id);
            window.location.href = ""
        }
        else {
            NotifService.deleteEmployeeNotifs(AuthUser.id);
            window.location.href = ""
        }

    }

   




    // useEffect(() => {
    //     if (currectChat) {
    //         ConversationsService.getMessagesByConvId(currectChat?.id)
    //             .then(
    //                 (res) => {
    //                     setMessages(res.data)
    //                 }
    //             )
    //         ConversationsService.getEmployeeInfo(currectChat?.id)
    //             .then(
    //                 (res) => {
    //                     members[0] = (res.data[0].id);
    //                     setEmpName(res.data[0]);
    //                 }
    //             )
    //         ConversationsService.getStudentInfo(currectChat?.id)
    //             .then(
    //                 (res) => {
    //                     members[1] = (res.data[0].id);
    //                     setStdName(res.data[0]);
    //                 }
    //             )

    //     }
    // }, [currectChat])



    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "instant" })
    // }, [messages])


    // useEffect(() => {
    //     if (AuthUser.role === "Student") {
    //         ConversationsService.getStudentsConversation(AuthUser.id)
    //             .then(
    //                 (res) => {
    //                     setMyConversations(res.data)
    //                     if (res.data.length > 10)
    //                         setNewMsg("10+");
    //                     else {
    //                         setNewMsg(res.data.length)
    //                     }

    //                 }
    //             )
    //     }
    //     else 
    //     {
    //         ConversationsService.getEmployeesConversation(AuthUser.id)
    //             .then(
    //                 (result) => {
    //                     setMyConversations(result.data)
    //                     if (result.data.length > 10)
    //                         setNewMsg("10+");
    //                     else {
    //                         setNewMsg(result.data.length)
    //                     }
    //                 })
    //     }
    // }, [])

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const message = {
    //         senderId: AuthUser.id,
    //         messageTxt: newMessage,
    //         senderRole: AuthUser.role
    //     }

    //     if (newMessage !== "") {
    //         socket?.emit("sendMessage", {
    //             userId: AuthUser.id,
    //             receiverId: receiverUser,
    //             message: newMessage,
    //             senderRole: AuthUser.role

    //         })
    //     }

    //     if (newMessage.replace(/\s+/, '').length) {
    //         ConversationsService.sendMessage(message, currectChat.id)
    //             .then(
    //                 (res) => {
    //                     setMessages([...messages, res.data])
    //                     setNewMessage('')
    //                 }
    //             )
    //     }

    // }


    // -----------------RealTimeSocket--------------------
    // useEffect(() => {
    //     setSocket(io("http://localhost:5000"));

    // }, [])

    // useEffect(() => {
    //     socket?.on("getMessage", data => {
    //         setArrivalMessage({
    //             senderId: data.userId,
    //             dateCreation: Date.now(),
    //             messageTxt: data.message,
    //             senderRole: data.senderRole
    //         })
    //     });
    // }, [socket])

    // useEffect(() => {
    //     arrivalMessage && members?.includes(arrivalMessage.senderId) &&
    //         setMessages(prev => [...prev, arrivalMessage]);
    // }, [arrivalMessage, currectChat])


    // useEffect(() => {
    //     socket?.emit("newUser", AuthUser.id);
    //     socket?.on("getOnlineUsers", users => {
    //         setOnlineUsers(users);
    //     })
    // }, [socket, AuthUser.id]);


    // useEffect(() => {
    //     onlineUsers?.map(u => {
    //         onlineUsers2.push(u.userId)
    //     })
    // }, [onlineUsers])



    return (
        <div>


            {/* ****************Nav Bar********************* */}
            <div className="navBar">
                <img src={logo} className="logoNav2" />
                <div className="ProfileInfo">

                    {/* <i className={convIc} onClick={handleShowDisc}>
                        {newMsg !== 0 ? <div className="counter">
                            {newMsg}
                        </div> : ""}
                    </i>

                    <i className={notifIc} onClick={handleShowNotif}>
                        {newNotif !== 0 ? <div className="counter">
                            {newNotif}
                        </div> : ""}
                    </i> */}
                    

                    <p className="profile-name">{authUser.firstName  + '  ' + authUser.lastName} </p>
                    <span>{AuthUser.profilePicture ? <img src={AuthUser.profilePicture} className="profil-img" /> : <img src={pdpAd} className="profil-img" />}</span>
                    {/* <i class="bi bi-three-dots-vertical navButn"></i> */}

                </div>
            </div>
            {showNotif && notifs.lenght !== 0 ? <div className="boxNotif" >
                <span className="titleNotif"> Notifications </span>
                <table cellpadding="0" cellspacing="0" border="0" >
                    <tbody>
                        {lastNotifs.map(notif => <tr key={notif.id} className="trCl11">
                            <td className="tdCl11">
                                <img src={pdpStd} className="pdpStd" />
                            </td >
                            <td className="tdCl11">
                                {notif.notificationMessage} <br />
                                <span className="timeNotif">{moment(notif.timeNotif).fromNow()}</span>
                                <div className="dltIc">
                                    <Tooltip content="Delete">
                                        <IconButton onClick={() => {
                                            NotifService.deleteNotifById(notif.id);
                                            window.location.href = ""
                                        }
                                        }>
                                            <DeleteIcon size={18} fill="#979797" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </td>




                        </tr>).reverse()}
                        <tr className="shmr">
                            {
                                notifs.length > 2 ? <a className="LienDelete" onClick={deleteMyNotifs}>  Delete All  </a> : ""
                            }
                            {show < notifs.length ? <td colSpan={2} className="showmore">
                                <a className="LienShowMore" onClick={handleShowMore}> Show more  </a>
                            </td> : ""}
                        </tr>
                    </tbody>

                </table>

            </div> : ""}
            {showDisc ? <div className='boxMessage'>
                <span className="titleNotif"> Chats </span>
                {myConversations?.length > 0 ?
                    myConversations.map(c => (

                        <div onClick={() => {
                            setCurrentChat(c);
                            setShowDisc(false);
                            setConvIc("bi bi-chat-text-fill notifi");
                        }} key={c.id}>

                            <Conversation conversation={c} /> 
                        </div>

                    ))
                    :
                    <div className="titleNotif2"> No conversations </div>
                }
            </div> : " "}

            {currectChat ? <div className='boxDisscussion'>
                <div className='boxDiscBar'>
                    <div>
                        {AuthUser.role === "Student" ? <div> {empName.firstName + " " + empName.lastName} </div> :
                            <div> {stdName.firstName + " " + stdName.lastName} </div>}
                        {AuthUser.role === "Student" ?
                            <div> {onlineUsers2.indexOf(empName.id) > -1 ? <span className="txtDisc"> <i className="bi bi-circle-fill on"></i> Online</span> :
                                <span className="txtDisc"> <i className="bi bi-circle-fill off"></i> Offline</span>}</div> :
                            <div> {onlineUsers2.indexOf(stdName.id) > -1 ? <span className="txtDisc"> <i className="bi bi-circle-fill on"></i> Online</span> :
                                <span className="txtDisc"> <i className="bi bi-circle-fill off"></i> Offline</span>} </div>}

                    </div>

                    <i className="bi bi-x-lg" onClick={() => setCurrentChat(null)}></i>
                </div>
                <div className="chatBoxTop">
                    {messages.map(m => (
                        <div ref={scrollRef} key={m.id}>
                            <Message message={m} own={(m.senderId === AuthUser.id && m.senderRole === AuthUser.role)} />
                        </div>
                    ))}
                </div>



                <div className="chatBoxBottom">
                    <form className="formMessage" >
                        <input type="text" className="sendTxt"
                            placeholder="Your message"
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                        <button className="sendBtn">Send</button>
                    </form>
                </div>
            </div> : ""}

        </div>


    )
}

export default NavBar;