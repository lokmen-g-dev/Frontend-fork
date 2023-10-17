import axios from "axios"

class ConversationService {

    createConversations = (studentId,employeeId) => {
        return axios.post("http://esprit.reclamation.tn:8085/conversation/new/"+studentId+"/"+employeeId);
    }

    getAllConversations = () => {
        return axios.get("http://esprit.reclamation.tn:8085/conversations");
    }

    getStudentsConversation = (studentId) => {
        return axios.get("http://esprit.reclamation.tn:8085/conversations/student/"+ studentId);
    } 
    getEmployeesConversation = (employeeId) => {
        return axios.get("http://esprit.reclamation.tn:8085/conversations/employee/"+ employeeId);
    } 
    getConversationById = (convId) => {
        return axios.get("http://esprit.reclamation.tn:8085/conversations/"+ convId);
    } 
    getEmployeeInfo =(convId) => {
        return axios.get("http://esprit.reclamation.tn:8085/conv/infos2/"+ convId)
    }

    getStudentInfo =(convId) => {
        return axios.get("http://esprit.reclamation.tn:8085/conv/infos/"+ convId)
    }

    getMessagesByConvId = (convId)=> {
        return axios.get("http://esprit.reclamation.tn:8085/messages/"+ convId);
    }

    sendMessage = (message,convId) => {
        return axios.post("http://esprit.reclamation.tn:8085/messages/new/"+ convId,message)
    }
    deleteConversationById = (convId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/conversation/"+convId)
    }

}

export default new ConversationService();