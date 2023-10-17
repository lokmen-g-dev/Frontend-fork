import './Message.css'
import pdp from './pdpAdmin.jpg';
import moment from 'moment'
import { useEffect, useState } from 'react';
import StudentService from '../../../service/StudentService';
import EmployeeService from '../../../service/EmployeeService';



const Message = ({ message, own }) => {

    const [senderPic, setSenderPic] = useState("");

    useEffect(() => {

        if (message.senderRole === "Student") {
            StudentService.getStudentById(message.senderId)
                .then(
                    (res) => {
                        setSenderPic(res.data.profilePicture)
                    }
                )
        }

        else {
            EmployeeService.getEmployeeById(message.senderId)
                .then(
                    (res) => {
                        setSenderPic(res.data.profilePicture)
                    }
                )
        }

    }, [])
    // console.log(sender)





    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                {senderPic ? <img src={senderPic} className="messageImg" /> : <img src={pdp} className="messageImg" />}
                <p className="messageTxt">{message.messageTxt}</p>
            </div>

            <div className='messageBottom'>
                {moment(message.dateCreation).fromNow()}
            </div>

        </div>
    )
}


export default Message