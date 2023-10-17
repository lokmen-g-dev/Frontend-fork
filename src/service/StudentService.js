
import axios from 'axios';
import httpClient from 'react-http-client';

class StudentService {
    create = (data) => {
        return httpClient.post("http://esprit.reclamation.tn:8085/students/add" , data);
    }
    
     updateStudent = (student,studentId) => {
        return axios.put("http://esprit.reclamation.tn:8085/utilisateur" + '/' + studentId , student)
    }

    getStudentByEmail = (email) => {
        return axios.get("http://esprit.reclamation.tn:8085/students/" + email);
    }
    
    getAllStudents = () => {
        return axios.get("http://esprit.reclamation.tn:8085/students");
    }

    getStudentById = (id) => {
        return axios.get("http://esprit.reclamation.tn:8085/students/id/" + id);
    }
    deleteStudent = (studentId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/delete/student/"+studentId)
    }

    switchStudentAccStatus = (studentId) => {
        return axios.put("http://esprit.reclamation.tn:8085/student/status/"+studentId)
    }


    
}


export default new StudentService()

  
