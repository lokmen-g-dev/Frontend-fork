import axios from "axios"
import { useEffect, useRef, useState } from "react"
import ConversationsService from "../../service/ConversationsService"
import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import Conversation from "./Converstation/Conversation"
import Message from "./Message/Message"
import './Messanger.css'
import { io } from "socket.io-client"
import { Redirect } from "react-router-dom"

const Messanger = () => {
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [currectChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [myConversations, setMyConversations] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState([]);
    const scrollRef = useRef();
    const [socket, setSocket] = useState(null);
    const receiverUser = members.find(m => m !== AuthUser.id);
    const [lastMessage, setLastMessage] = useState(null);



    useEffect(() => {
        setSocket(io("http://localhost:5000"));

    }, [])

    useEffect(() => {
        socket?.on("getMessage", data => {
            setArrivalMessage({
                senderId: data.userId,
                dateCreation: Date.now(),
                messageTxt: data.message,
            })
        });
    }, [socket])

    useEffect(() => {
        arrivalMessage && members?.includes(arrivalMessage.senderId) &&
            setMessages(prev => [...prev, arrivalMessage]);
        setLastMessage(lastMessage + 1)
    }, [arrivalMessage, currectChat])


    useEffect(() => {
        socket?.emit("newUser", AuthUser?.id);
    }, [socket, AuthUser?.id]);





    useEffect(() => {
        if (AuthUser?.role === "Student") {
            ConversationsService.getStudentsConversation(AuthUser?.id)
                .then(
                    (res) => {
                        setMyConversations(res.data)
                        setCurrentChat(res.data[res.data.length - 1])
                    }
                )
        }
        else {
            ConversationsService.getEmployeesConversation(AuthUser.id)
                .then(
                    (result) => {
                        setMyConversations(result.data)
                        setCurrentChat(result.data[result.data.length - 1])
                    })
        }
    }, [])


    useEffect(() => {
        if (currectChat) {
            ConversationsService.getMessagesByConvId(currectChat?.id)
                .then(
                    (res) => {
                        setMessages(res.data)
                        setLastMessage(res.data.length)


                    }
                )
            ConversationsService.getEmployeeInfo(currectChat?.id)
                .then(
                    (res) => {
                        members[0] = (res.data[0].id);
                    }
                )
            ConversationsService.getStudentInfo(currectChat?.id)
                .then(
                    (res) => {
                        members[1] = (res.data[0].id)
                    }
                )

        }
    }, [currectChat])




    const handleSubmit = (e) => {
        e.preventDefault();

        const message = {
            senderId: AuthUser.id,
            messageTxt: newMessage,
            senderRole: AuthUser.role

        }

        socket.emit("sendMessage", {
            userId: AuthUser.id,
            receiverId: receiverUser,
            message: newMessage,
            senderRole: AuthUser.role


        })

        ConversationsService.sendMessage(message, currectChat.id)
            .then(
                (res) => {
                    setMessages([...messages, res.data])
                    setNewMessage('')
                }
            )

    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "instant" })
    }, [messages])

    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="homeContent">
                <div className="messanger">
                    <div className="chatMenu">
                        <div className="chatMenuWrapper">
                            {myConversations.map(c => (

                                <div onClick={() => setCurrentChat(c)} key={c.id}>
                                    <Conversation conversation={c} last={lastMessage} />
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="chatBox">
                        <div className="chatBoxWrapper">
                            <div className="chatBoxTop">

                                {messages.map(m => (
                                    <div ref={scrollRef} key={m.id}>
                                        <Message message={m} own={m.senderId === AuthUser.id} />
                                    </div>
                                ))}


                            </div>
                            <div className="chatBoxBottom">
                                <form className="formMessage" onSubmit={handleSubmit}>
                                    <input type="text" className="sendTxt"
                                        placeholder="Your message"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button className="sendBtn" onClick={handleSubmit}>Send</button>
                                </form>
                            </div>


                        </div>
                    </div>
                    {/* <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {AuthUser.id}
                        {lastMessage}
                        {members.length !== 0 ? members[0] + " " + members[1] : ""}

                        
                    </div>
                </div> */}


                </div>
            </div>


        </>
    )
}


export default Messanger
