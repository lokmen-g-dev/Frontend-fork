import axios from "axios"


class NotifService {
    sendNotifToAdmin = (notif) => {
        return axios.post("http://esprit.reclamation.tn:8085/Notification/admin",notif)
    }

   
    sendNotifsStudent = (notif,studentId) => {
        return axios.post("http://esprit.reclamation.tn:8085/notifications/students/" + studentId , notif)
    }
    sendNotifsEmployee = (notif,employeeId) => {
        return axios.post("http://esprit.reclamation.tn:8085/notifications/employees/" + employeeId , notif)
    }
    sendNotifsAdmin = (notif) => {
        return axios.post("http://esprit.reclamation.tn:8085/Notification/admin/" , notif)
    }

    deleteNotifById = (notifId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/notifs/"+ notifId)
    }

    deleteEmployeeNotifs = (employeeId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/employees/"+employeeId+"/notificaitons")
    }
    deleteStudentsNotifs = (studentId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/students/"+studentId+"/notificaitons")
    }
} 

export default new NotifService()