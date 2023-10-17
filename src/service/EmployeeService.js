import axios from 'axios';
import httpClient from 'react-http-client';


class EmployeeService {
    create = (data,serviceId) => {
        return httpClient.post("http://esprit.reclamation.tn:8085/employees/add/" + serviceId , data);
    }

    getEmployeeById = (id) => {
        return axios.get("http://esprit.reclamation.tn:8085/employee/" + id);
    }

    updateEmployee = (employee,employeeId,servId) => {
        return axios.put("http://esprit.reclamation.tn:8085/employees" + '/' + employeeId+'/'+servId , employee)
    }

    getEmployeeByServiceId = (serviceId) => {
        return axios.get("http://esprit.reclamation.tn:8085/employees/services/" + serviceId)
    }

    getAdminInfo = () => {
        return axios.get("http://esprit.reclamation.tn:8085/employee/admin")
    }

    getEmployeesInfos = ()=> {
        return axios.get("http://esprit.reclamation.tn:8085/employees/infos")
    }
    deleteEmployee = (employeeId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/delete/employee/"+employeeId)
    }
}

export default new EmployeeService()