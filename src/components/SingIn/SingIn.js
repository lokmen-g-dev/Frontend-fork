import './SingIn.css'
import logo from './logo1.png';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Password } from 'primereact/password';
import HandlingService from '../../service/HandlingService';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import i18next from "i18next"
import Translations from '../Translations/Translations';




const SignIn = () => {

    // --------------------------------------SignIn-------------------------
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [loginEmail, setLoginEmail] = useState("");
    const [signInContainer, setSignInContainer] = useState("signContainer");
    const [signUpContainer, setSignUpContainer] = useState("signUpContainer hideSignIn");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState("");
    const [loginFailed2, setLoginFailed2] = useState(true);
    const history = useHistory();
    const [stdBtn, setStdBtn] = useState("btnStd");
    const [empBtn, setEmpBtn] = useState("btnEmp");
    const [selectedSignUp, setSelectedSignUp] = useState("Employee");
    const [servicesList, setServicesList] = useState([]);
    const [idServ, setIdServ] = useState();
    const [usedEm, setUsedEm] = useState(false)


    const sendLoginRequest = (e) => {


        e.preventDefault();
        const reqBody = {
            email: loginEmail,
            password: loginPassword
        };


        fetch("http://esprit.reclamation.tn:8085/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject(i18next.t("failed attempt. Please try again !"));
            })
            .then((response) => {
                localStorage.setItem('AuthUser', JSON.stringify(response))
                history.push('/profil')
                // else if (response.role === "Admin") history.push('/dashboardadmin')
            })
            .catch((message) => {
                setLoginFailed(message);
                setLoginEmail = "";
                setLoginPassword = "";
            })
            .catch((message) => {
                setLoginFailed2(false)
            })
    }

    // ---------------------SignUp-----------------------------

    // --------------------ControlSaisi---------------------
    // ------------------Student----------
    const initialValues = { firstName: "", lastName: "", classe: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showName, setShowName] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

    }

    const validate = (values) => {
        const errors = {};
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const espritRegex = /^\w+([\.-]?\w+)*@\esprit(\.tn)+$/;


        if (!values.firstName.replace(/\s+/, '').length) {
            errors.firstName = i18next.t("firstName") + i18next.t("required");
        }
        if (!values.lastName.replace(/\s+/, '').length) {
            errors.lastName = i18next.t("lastName") + i18next.t("required");
        }
        if (!values.classe.replace(/\s+/, '').length) {
            errors.classe = i18next.t("classe") + i18next.t("required");
        }
        if (!values.email) {
            errors.email = i18next.t("Email ") + i18next.t("required");
        } else if (!espritRegex.test(values.email)) {
            errors.email = "Email " + i18next.t("must be") + " @esprit.tn"
        }
        if (!values.password) {
            errors.password = i18next.t("password") + i18next.t("required");
        } else if (values.password.length < 6) {
            errors.password = i18next.t("password") + " " + i18next.t("must be more than 6 characters")
        }


        return errors;

    }


    // ---------------Employee---------------------
    const initialValues2 = { firstName: "", lastName: "", service: "", email: "", password: "" };
    const [formValues2, setFormValues2] = useState(initialValues2);
    const [formErrors2, setFormErrors2] = useState({});
    const [isSubmit2, setIsSubmit2] = useState(false);
    const [showName2, setShowName2] = useState("");




    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormValues2({ ...formValues2, [name]: value })
    }

    const handleSubmit2 = (e) => {

        e.preventDefault();
        setFormErrors2(validate2(formValues2));
        setIsSubmit2(true);

    }



    const validate2 = (values) => {
        const errors2 = {};
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const espritRegex = /^\w+([\.-]?\w+)*@\esprit(\.tn)+$/;


        if (!values.firstName.replace(/\s+/, '').length) {
            errors2.firstName = i18next.t("firstName") + i18next.t("required");
        }
        if (!values.lastName.replace(/\s+/, '').length) {
            errors2.lastName = i18next.t("lastName") + i18next.t("required");
        }
        if (values.service === "SELECT YOUR SERVICE") {
            errors2.service = i18next.t("select your service please");
        }
        if (!values.service.replace(/\s+/, '').length) {
            errors2.service = i18next.t("select your service please");
        }
        if (!values.email) {
            errors2.email = i18next.t("Email ") + i18next.t("required");
        } else if (!espritRegex.test(values.email)) {
            errors2.email = "Email " + i18next.t("must be") + " @esprit.tn"
        }
        if (!values.password) {
            errors2.password = i18next.t("password") + i18next.t("required");
        } else if (values.password.length < 6) {
            errors2.password = i18next.t("password") + " " + i18next.t("must be more than 6 characters")
        }


        return errors2;

    }
    // -----------------------------SaveInDB"POST-METHOD"-------------------------


    // ----------Student--------------
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            fetch("http://localhost:8080/students/add", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(formValues),
            })
                .then((response) => {
                    if (response.status === 200) {
                        setUsedEm(false)
                        setShowName(formValues.firstName)
                        setFormValues(initialValues);

                    }
                    else if (response.status === 406) {
                        setUsedEm(true)
                    }
                })

        }
    }, [formErrors, usedEm])


    // -----------------Employee--------------
    useEffect(() => {
        if (Object.keys(formErrors2).length === 0 && isSubmit2) {

            fetch("http://localhost:8080/employees/add/" + idServ, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(formValues2),
            })
                .then((response) => {
                    if (response.status === 201) {
                        setUsedEm(false)
                        setShowName2(formValues2.firstName)
                        setFormValues2(initialValues2);

                    }
                    else if (response.status === 404) {
                        setUsedEm(true)
                    }
                })
        }
    }, [formErrors2])

    useEffect(() => {


        HandlingService.getAllService()
            .then(
                (result) => {
                    setServicesList(result.data);
                },
            )
    }, [])




    // **************************************Login**************************************


    const SwitchSignIn = () => {
        if (signInContainer === "signContainer") {
            setSignInContainer(" signContainer hideSignIn ");
            setSignUpContainer("signUpContainer");
        }
        else {
            setSignUpContainer(" signUpContainer hideSignIn ");
            setSignInContainer("signContainer")
        }
    }



    const SwitchBtn = () => {
        if (stdBtn === "btnEmp1") {
            setStdBtn("btnStd");
            setEmpBtn("btnEmp");
            setSelectedSignUp("Employee")
        }
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues2({ ...formValues2, [name]: value })

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');
        setIdServ(option);

    }

    const SwitchBtn2 = () => {
        if (stdBtn === "btnStd") {
            setStdBtn("btnEmp1");
            setEmpBtn("btnStd1");
            setSelectedSignUp("Student")
        }

    }

    if (AuthUser) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div className='signInBg'>
                <Translations />
                <div className='nav'>
                    <img src={logo} className="logoSign" />
                    <div>
                        {/* ************Nav********** */}
                        {/* <Link className="lnk" to="/">

                            <button className="buttonNav"><i class="bi bi-house-door"></i> Home </button>
                        </Link>
                        <button className="buttonNav"> <i class="bi bi-people"></i> About Us</button>
                        <button className="buttonNav"> <i class="bi bi-envelope"></i> Contact</button> */}
                    </div>
                </div>


                {/* ----------------SignUp-------------- */}
                {selectedSignUp === "Student" ?
                    <div className={signUpContainer}>
                        <div className='btnSwitch'>
                            <button className={stdBtn} onClick={SwitchBtn}>{i18next.t("student")}</button>
                            <button className={empBtn} onClick={SwitchBtn2}>{i18next.t("employee")}</button>
                        </div>
                        <form onSubmit={handleSubmit2}>

                            <h1>{i18next.t("sign up")}</h1>

                            {/* ------------------------------------FirstName------------------------------ */}
                            <input type="text"
                                className="inputSignIn"
                                placeholder={i18next.t("firstName")}
                                name="firstName"
                                value={formValues2.firstName}
                                onChange={handleChange2}
                            />
                            <span className="danger">{formErrors2.firstName}</span>
                            {/* -------------------------------------LastName------------------------------------ */}

                            <input type="text"
                                className="inputSignIn"
                                placeholder={i18next.t("lastName")}
                                name="lastName"
                                value={formValues2.lastName}
                                onChange={handleChange2}
                            />
                            <span className="danger">{formErrors2.lastName}</span>
                            {/* --------------------Service----------------------- */}
                            <select className="inputSignIn" name="service" onChange={onChangeHandler} >
                                <option>{i18next.t("select your service")}</option>
                                {servicesList.map(serv =>

                                    <option id={serv.id}>{serv.name}</option>

                                )}
                            </select>


                            <span className="danger">{formErrors2.service}</span>
                            {/* -------------------------------Email------------------------------- */}
                            <input type="text"
                                className="inputSignIn"
                                placeholder="Email"
                                name="email"
                                value={formValues2.email}
                                onChange={handleChange2}
                            />
                            <span className="danger">{formErrors2.email}</span>
                            {/* ---------------------------------Password---------------------------------------- */}
                            <Password
                                className="InputPass"
                                inputClassName="inputSignIn2"
                                placeholder={i18next.t("password")}
                                name="password"
                                value={formValues2.password}
                                onChange={handleChange2}
                            />
                            <span className="danger">{formErrors2.password}</span>



                            <div className='btnSwitchCont'>
                                <button className="buttonSingIn">{i18next.t("sign up")}</button>
                                {/* <button className="buttonSingUp">Sign Up</button>    */}
                            </div>
                            {Object.keys(formErrors2).length === 0 && isSubmit2 && showName2 ? <span className="succes show_slide">
                                <i class="bi bi-check2-circle "></i>
                                Hey <span className="user-name"> {showName2} </span>   {i18next.t("welcome !")}  </span> : ("")}
                            {usedEm && !showName ? <span className="errSlide show_slide">{i18next.t("email adress already in use !")}</span> : ""}

                            <div className='prevLog'>{i18next.t("have account?")} <a onClick={SwitchSignIn}>{i18next.t("login")}</a></div>





                            {/* -------------------SignIn------------- */}

                        </form>
                    </div> : <div className={signUpContainer}>
                        <div className='btnSwitch'>
                            <button className={stdBtn} onClick={SwitchBtn}>{i18next.t("student")}</button>
                            <button className={empBtn} onClick={SwitchBtn2}>{i18next.t("employee")}</button>
                        </div>
                        <form onSubmit={handleSubmit}>

                            <h1>{i18next.t("sign up")} </h1>

                            {/* ------------------------------------FirstName------------------------------ */}
                            <input type="text"
                                className="inputSignIn"
                                placeholder={i18next.t("firstName")}
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                            />
                            <span className="danger">{formErrors.firstName}</span>
                            {/* -------------------------------------LastName------------------------------------ */}

                            <input type="text"
                                className="inputSignIn"
                                placeholder={i18next.t("lastName")}
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                            />
                            <span className="danger">{formErrors.lastName}</span>
                            {/* --------------------Classe----------------------- */}
                            <input type="text"
                                className="inputSignIn"
                                placeholder={i18next.t("classe")}
                                name="classe"
                                value={formValues.classe}
                                onChange={handleChange}
                            />
                            <span className="danger">{formErrors.classe}</span>
                            {/* -------------------------------Email------------------------------- */}
                            <input type="text"
                                className="inputSignIn"
                                placeholder="Email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <span className="danger">{formErrors.email}</span>
                            {/* ---------------------------------Password---------------------------------------- */}
                            <Password
                                inputClassName="inputSignIn2"
                                className="InputPass"
                                placeholder={i18next.t("password")}
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <span className="danger">{formErrors.password}</span>



                            <div className='btnSwitchCont'>
                                <button className="buttonSingIn">{i18next.t("sign up")}</button>
                                {/* <button className="buttonSingUp">Sign Up</button>    */}
                            </div>
                            {/* {usedEm ?<span className="succes show_slide">  "used email"</span> : ""}  */}
                            {Object.keys(formErrors).length === 0 && isSubmit && showName ? <span className="succes show_slide">
                                <i class="bi bi-check2-circle "></i>
                                Hey <span className="user-name"> {showName} </span> {i18next.t("you are a one of us now !")}   </span> :
                                ""}
                            {usedEm && !showName ? <span className="errSlide show_slide">{i18next.t("email adress already in use !")}</span> : ""}
                            <div className='prevLog'>{i18next.t("have account?")}<a onClick={SwitchSignIn}>{i18next.t("login")}</a></div>





                            {/* -------------------SignIn------------- */}

                        </form> </div>}


                {/* ----------SignIn------------------ */}

                <div className={signInContainer}>
                    {/* <h1 className='claimNow'>Claim Now !</h1> */}
                    <form >


                        {!loginFailed2 ? <h3 className="danger1">{loginFailed}</h3> : ""}

                        <h1>{i18next.t("sign in")}</h1>


                        <input type="text"
                            className="inputSignIn"
                            placeholder="Email"
                            name="LoginEmail"
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />

                        <input type="password"
                            className="inputSignIn"
                            placeholder={i18next.t("password")}
                            name="LoginPassword"
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />


                        <div className='btnSwitchCont'>
                            <button className="buttonSingIn" onClick={sendLoginRequest}>{i18next.t("sign in")}</button>
                            {/* <button className="buttonSingUp">Sign Up</button>    */}
                        </div>

                        <a href="forgotpassword">{i18next.t("forgot your password?")}</a>
                        {/* <span class="buttonSingUp" onClick={SwitchSignIn}>{i18next.t("New here ? Join Us Now")}
                            <i class="bi bi-arrow-right-circle"></i></span> */}
                    </form>
                </div>


            </div>

        </>

    )
}

export default SignIn;