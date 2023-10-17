import axios from 'axios';



class ForgotPasswordService {
    sendResetRequest = (email) => {
        return axios.post("http://esprit.reclamation.tn:8085/sendemail/" + email);
    }

    resetPassword = (email,pwd) => {
        return axios.put("http://esprit.reclamation.tn:8085/resetpassword/" + email+'/'+pwd);
    }

    updatePass = (email,pwd,newPwd) => {
        return axios.put("http://esprit.reclamation.tn:8085/updatepwd/" + email+'/'+pwd+'/'+newPwd);
    }

}

export default new ForgotPasswordService()
