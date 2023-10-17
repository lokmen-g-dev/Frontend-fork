import { useState } from 'react';
import ForgotPasswordService from '../../service/ForgotPasswordService';
import './ForgotPassword.css'
import imageFg from './fpimg.png';
import logo from './logo4.png';
import i18next from "i18next"
import Translations from "../Translations/Translations";


const ForgotPassword = () => {
    const [emailReset, setEmailReset] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [valid, setValid] = useState("")
    const [code, setCode] = useState("")
    const [loadMsg, setLoadMsg] = useState("");
    const [succes, setSucces] = useState("");
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false);

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const sendRequest = (e) => {

        e.preventDefault();
        setLoadMsg(i18next.t("loading... Please Wait"))
        ForgotPasswordService.sendResetRequest(emailReset)
            .then((response) => {
                setLoading(true)
                if (response.status === 200) {
                    setResetCode(response.data);
                    setSucces(i18next.t("check your mail"))
                    setErr("")
                }
                else if(response.status === 500) {
                    setErr("Connexion error ! Try agin")
                    setLoading(true)
                }
            })

            .catch((message) => {
                setErr(i18next.t("no account found for this email address !"))
                setLoading(true)
            })
    }

    const submitCode = (e) => {
        e.preventDefault()

        if (code === resetCode.substring(resetCode.lastIndexOf(" ") + 1, resetCode.length)) {
            setValid(true)
            setLoading(false)
            setLoadMsg("")
        }
        else {
            setLoading(true);
            setErr(i18next.t("non valid code"))
        }
    }


    const changePassword = (e) => {
        e.preventDefault()
        setLoadMsg(i18next.t("checking... Please Wait"))
        if (newPass === confirmPass) {
            ForgotPasswordService.resetPassword(emailReset, newPass)
                .then(

                    (res) => {
                        setLoading(true)
                        setErr("")
                        if (res.status === 200) {
                            setSucces(i18next.t("passowrd Changed Successfully"))
                            setErr("")
                            setNewPass("")
                            setEmailReset("")
                            setConfirmPass("")
                        }
                    }
                )
        }
        else {
            setLoading(true);
            setErr(i18next.t("you must enter the same password to confirm"))
        }

    }

    return (
        <>
            <Translations />
            <div className='nav'>
                <img src={logo} className="logoSign" />
                <div>

                    {/* ************Nav********** */}
                    <button className="buttonNav">Home <i class="bi bi-house-door"></i></button>
                    <button className="buttonNav">About Us <i class="bi bi-people"></i></button>
                    <button className="buttonNav">Contact <i class="bi bi-envelope"></i></button>
                    <button className="buttonNav">Login <i class="bi bi-box-arrow-in-right"></i></button>
                </div>
            </div>

            <div className="fpContainer">
                <img src={imageFg} className="fpImg" />
                <div className='resetContainer'>
                    <form onSubmit={sendRequest}>
                        {!loading ? <span className='errReset2'>{loadMsg}</span> : <p>{!err ? <span className='loadReset'><i class="bi bi-check-circle-fill"></i>{succes}</span> : <span className='errReset'><i class="bi bi-x-circle-fill"></i><p>{err}</p></span>}</p>}
                        {!succes ? <div>
                            <h1 className='resetTitle'>{i18next.t("forgot your password ?")}</h1>
                            <span className='txtRes'>{i18next.t("don't worry ! Just fill in your email and we'll send a code to reset your password")}
                            </span>
                            <input type="text"
                                className="inputReset"
                                placeholder="Email"
                                name="LoginEmail"
                                onChange={(e) => setEmailReset(e.target.value)}
                            />

                            <button className="buttonReset" onClick={sendRequest}>{i18next.t("email Me")}</button>

                        </div> : {
                            ...!valid ? <div>
                                <p className='resetText'>{i18next.t("an email with instructions on how to reset your password has been sent to")} <b> {emailReset} </b> {i18next.t("check your spam or junk folder if you don’t see the email in your inbox.")}
                                </p>
                                <input type="text"
                                    className="inputReset"
                                    placeholder="Code"
                                    name="LoginEmail"
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <button className="buttonReset"
                                    onClick={submitCode}
                                >{i18next.t("submit")}</button>

                            </div> : <div>
                                <h1 className='resetTitle'>{i18next.t("reset Password")}</h1>

                                <input type="password"
                                    className="inputSignIn"
                                    placeholder={i18next.t("new Password")}
                                    name="NewPassword"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                />
                                <input type="password"
                                    className="inputSignIn"
                                    placeholder={i18next.t("confirm password")}
                                    name="ConfirmPassword"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                                <button className="buttonReset"
                                    onClick={changePassword}
                                >{i18next.t("Changer le mot de passe")}</button>
                            </div>
                        }}

                        <p className='prevLog'>{i18next.t("remembred your password ?")}<a href='/login'>{i18next.t("login")}</a></p>
                    </form>

                </div>

            </div>
        </>
    )
}


export default ForgotPassword;

