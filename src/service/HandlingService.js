import axios from "axios"


class HandlingService {
    getAllService = () => {
        return axios.get("http://esprit.reclamation.tn:8085/anneeuniv");
    }

    getAllSemestre = () => {
        return axios.get("http://esprit.reclamation.tn:8085/semestre");
    }

    getAllPeriode = () => {
        return axios.get("http://esprit.reclamation.tn:8085/periode");
    }

    getAllClasses = () => {
        return axios.get("http://esprit.reclamation.tn:8085/classes/2022");
    }

    getAllPlanClasse = (codeCl) => {
        return axios.get("http://esprit.reclamation.tn:8085/planetude/2021/" + codeCl);
    }

    getSemainesOfSemestre = () => {
        return axios.get("http://esprit.reclamation.tn:8085/semaine/11");
    }



    getServiceByName = (name) => {
        return axios.get("http://localhost:8080/services/name/" + name)
    }
    getServiceByEmployeeId = (id) => {
        return axios.get("http://localhost:8080/services/employee/" + id)
    }
    createService = (data) => {
        return axios.post("http://esprit.reclamation.tn:8085/anneeuniv/add",data)
    }

    createSemestre = (data) => {
        return axios.post("http://esprit.reclamation.tn:8085/semestre/add",data)
    }
    deleteServiceById = (servId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/anneeuniv/"+servId)
    }
    deleteSemestreById = (semId) => {
        return axios.delete("http://esprit.reclamation.tn:8085/semestre/"+semId)
    }

    updateSem = (semId,semestre) => {
        return axios.put("http://esprit.reclamation.tn:8085/semestre/update/"+semId,semestre)
    }
    
    updateService = (semId,semestre) => {
        return axios.put("http://esprit.reclamation.tn:8085/semestre/update/"+semId,semestre)
    }

   
}

export default new HandlingService()