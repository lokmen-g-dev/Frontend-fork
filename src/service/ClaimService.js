import axios from "axios"

class ClaimService {


    createClaim = (claim,studentId) => {
        return axios.post("http://esprit.reclamation.tn:8085/reclamations/" + studentId , claim)
    }

    getClaimsByStudentId = (studentId) => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamations/" + studentId )
    }

    deleteClaim =(claimId)=> {
        return axios.delete("http://esprit.reclamation.tn:8085/reclamations/" + claimId)
    }

    updateClaim =(claim,claimId,StudentId) => {
        return axios.put("http://esprit.reclamation.tn:8085/reclamations/" + claimId + '/' + StudentId , claim);
    }
    
    getAllClaims = () => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamations");
    }

    getClaimsInfo = () => {
        return axios.get("http://esprit.reclamation.tn:8085/anneeuniv");
    }

    updateClaiStatu = (claim,claimId) => {
        return axios.put("http://esprit.reclamation.tn:8085/reclamations/status/" + claimId , claim)
    }

    getClaimByTime = (dateRec) => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamations/date/" + dateRec)
    }
    sendClaimToEmployee = (claimId,employeeId) => {
        return axios.put("http://esprit.reclamation.tn:8085/reclamations/employee/" + employeeId + "/" + claimId)
    }

    getClaimsByEmployeeId = (employeeId) => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamations/employee/" + employeeId )
    }

    getClaimsStdInfo = (claimId) => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamation/infos/" + claimId);
    }
    getClaimsEmpInfo = (claimId) => {
        return axios.get("http://esprit.reclamation.tn:8085/reclamation/employee/infos/" + claimId);
    }

    sendResponse = (resp,claimId) => {
        return axios.post("http://esprit.reclamation.tn:8085/response/new/" + claimId , resp)
    }

    getResponse = (claimId) => {
        return axios.get("http://esprit.reclamation.tn:8085/response/" + claimId);
    }


}


export default new ClaimService()