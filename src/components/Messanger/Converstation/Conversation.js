import './Conversation.css';
import pdp from './pdpAdmin.jpg'
import { useEffect, useState } from "react"
import ConversationsService from '../../../service/ConversationsService';
import moment from 'moment';
import { DeleteIcon } from "./../../NextUiIcons/DeleteIcon";
import { Tooltip } from "@nextui-org/react";
import { IconButton } from "./../../NextUiIcons/IconButton";
import { Skeleton } from 'primereact/skeleton';




const Conversation = ({ conversation }) => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [last, setLast] = useState(null)
    const [empName, setEmpName] = useState("");
    const [stdName, setStdName] = useState("");



    useEffect(() => {
        ConversationsService.getMessagesByConvId(conversation.id)
            .then(
                (res) => {
                    setLast(parseInt(res.data.length))

                })
        ConversationsService.getEmployeeInfo(conversation?.id)
            .then(
                (res) => {
                    setEmpName(res.data[0]);
                }
            )
        ConversationsService.getStudentInfo(conversation?.id)
            .then(
                (res) => {
                    setStdName(res.data[0]);
                }
            )
    }, [])

    return (

        <div className="conversation">


            {AuthUser.role === "Employee" ?
                { ...stdName ? {... stdName.profilePicture ? <img src={stdName.profilePicture} className="convPdp" /> : <img src={pdp} className="convPdp" />} : <Skeleton shape="circle" size="3rem" className="mr-2 convPdp"></Skeleton> }
                : ""
            }

            {AuthUser.role === "Student" ?
                { ...empName ? {... empName.profilePicture ? <img src={empName.profilePicture} className="convPdp" /> : <img src={pdp} className="convPdp" />} : <Skeleton shape="circle" size="3rem" className="mr-2 convPdp"></Skeleton>  }
                : ""
            }
            {AuthUser.role === "Admin" ?
                { ...stdName ? {...stdName.profilePicture? <img src={stdName.profilePicture} className="convPdp" /> : <img src={pdp} className="convPdp" />} :<Skeleton shape="circle" size="3rem" className="mr-2 convPdp"></Skeleton>  }
                : ""
            }
            {/* <p className="convPdp2" > A </p> */}


            <div className="convInfo">
                <div className="convTop">
                    {AuthUser.role === "Student" ?
                       { ...empName?   <p className="convName"> {empName.firstName  + " " + empName.lastName}</p> :<Skeleton width="200px" className="mb-2"></Skeleton> }  :
                        {...stdName ? <p className="convName">{stdName.firstName + " " + stdName.lastName}</p> : <Skeleton width="200px" className="mb-2"></Skeleton> }}
                </div>

                <div className='convBottom'>
                    <p>
                        {last !== null ? (AuthUser?.id === conversation?.messages[last - 1]?.senderId) ?

                            <div className='btmCnv'>
                                <div>
                                    {"You : " + conversation?.messages[last - 1]?.messageTxt.substring(0, 20) + ".."}
                                </div>
                                {/* <span className='timeCnv'>
                        {moment(conversation.messages[last-1].dateCreation).startOf('minute').fromNow()}
                    </span> */}

                            </div> :
                            conversation?.messages[last - 1]?.messageTxt.substring(0, 20) : ""}
                    </p>

                </div>
                <IconButton onClick={() => {
                    ConversationsService.deleteConversationById(conversation?.id);
                    window.location.href = ""
                }
                }>
                    <DeleteIcon className="dltConv" size={18} fill="#979797" />
                </IconButton>

            </div>

        </div>
    )


}

export default Conversation

