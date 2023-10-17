    import React, { useEffect, useState } from "react";
    import './Register.css';
//     import StudentService from "../../service/StudentService";
//     import { Link } from "react-router-dom";
//     import { useDispatch } from "react-redux";
//     import {login,} from "./../../redux/features/userSlide"
//     import { useHistory } from "react-router-dom";

//     const Register = () => {

//         // *******************************Registration**********************

//         // --------------------ControlSaisi---------------------
//         const initialValues = {firstName : "", lastName : "", classe : "", email : "" , password : ""};
//         const[formValues, setFormValues] = useState(initialValues);
//         const[formErrors, setFormErrors] = useState({});
//         const[isSubmit, setIsSubmit] = useState(false);
//         const[showName, setShowName] = useState("");


//         const handleChange = (e) => {
//             const { name , value } = e.target;
//             setFormValues({ ...formValues, [name]: value })
//         }

//         const handleSubmit = (e) => {

//             e.preventDefault();
//             setFormErrors(validate(formValues));
//             setIsSubmit(true);
    
//         }

//         const validate = (values) =>{
//             const errors = {};
//             // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             const espritRegex = /^\w+([\.-]?\w+)*@\esprit(\.tn)+$/;

        
//             if (!values.firstName.replace(/\s+/, '').length) {
//                 errors.firstName = "FirstName Required";
//             }
//             if (!values.lastName.replace(/\s+/, '').length) {
//                 errors.lastName = "Last Name Required";
//             }
//             if (!values.classe.replace(/\s+/, '').length) {
//                 errors.classe = "Class Required";
//             }
//             if (!values.email) {
//                 errors.email = "Email Required";
//             } else if (!espritRegex.test(values.email)) {
//                 errors.email = "Email must be @esprit.tn"
//             }
//             if (!values.password) {
//                 errors.password = "Password Required";
//             } else if (values.password.length < 6) {
//                 errors.password = "Password must be more than 6 characters"
//             }


//             return errors;

//         }
//         // -----------------------------SaveInDB"POST-METHOD"-------------------------
        

//         useEffect(() => {
//             if (Object.keys(formErrors).length === 0 && isSubmit)
//             {
//                 StudentService.create(JSON.stringify(formValues));
//                 setShowName(formValues.firstName)
//                 setFormValues(initialValues);

//             } 
//         },[formErrors] )

//         // **************************************Login**************************************
//         const [loginEmail,setLoginEmail] = useState("");
//         const [loginPassword,setLoginPassword] = useState("");
//         const [loginFailed,setLoginFailed] = useState("");
//         const history =useHistory();
//         const dispatch = useDispatch();
    
//         const sendLoginRequest = (e) => {  
            
            
//             e.preventDefault();
//             const reqBody = {
//                 email : loginEmail,
//                 password : loginPassword
//             };

        
//             fetch("http://localhost:8080/login2", {
//                 headers : {
//                     "Content-Type" : "application/json"
//                 },
//                 method : "post",
//                 body : JSON.stringify(reqBody),
//             })
//             .then((response) => {
//                 if(response.status === 200){
//                 return response.json();                 
//                 }
//                 return Promise.reject("Failed attempt. Please try again !");    
//             })
//             .then((response) => {               
//                 // dispatch(login(response));
//                 localStorage.setItem('AuthUser' , JSON.stringify(response))
//                 if(response.role === "Student") history.push('/profil')
//                 else history.push('/dashboardadmin')
                 
//             })
//             .catch((message) => {
//                 setLoginFailed(message );
//                 setLoginEmail="";
//                 setLoginPassword="";    
//             })       
//         }
    
//         // ---------------------------------Registration-Form--------------------------------------
        
//             return(
                
//                 <div class="container" id="container">
//             <div class="form-container sign-up-container">
//             <form onSubmit={handleSubmit}>
//                 <h1>Create Account</h1>
//                 <span></span>

//                 {/* ------------------------------------FirstName------------------------------ */}
//                 <input type="text" 
//                 className="inputSignIn"
//                     placeholder="FisrtName"
//                     name="firstName"
//                     value={formValues.firstName}
//                     onChange={handleChange} 
//                 />
//                 <span className="danger">{ formErrors.firstName }</span>
//                 {/* -------------------------------------LastName------------------------------------ */}

//                 <input type="text"
//                 className="inputSignIn"
//                     placeholder="LastName" 
//                     name="lastName" 
//                     value={formValues.lastName} 
//                     onChange={handleChange}
//                 />
//                 <span className="danger">{ formErrors.lastName }</span>
//                 {/* --------------------Classe----------------------- */}
//                 <input type="text" 
//                 className="inputSignIn"
//                     placeholder="Class"
//                     name="classe" 
//                     value={formValues.classe}
//                     onChange={handleChange}
//                 />
//                 <span className="danger">{ formErrors.classe }</span>
//                 {/* -------------------------------Email------------------------------- */}
//                 <input type="text"
//                 className="inputSignIn"
//                     placeholder="Email" 
//                     name="email"
//                 value={formValues.email} 
//                 onChange={handleChange}
//                 />
//                 <span className="danger">{ formErrors.email }</span>
//                 {/* ---------------------------------Password---------------------------------------- */}
//                 <input type="password"
//                 className="inputSignIn"
//                     placeholder="Password"
//                     name="password" 
//                     value={formValues.password}
//                     onChange={handleChange}     
//                 />
//                 <span className="danger" >{ formErrors.password }</span>
//                 {/* ---------------------------------SubmitButton-------------------------------- */}
//                 <button  className="button"> Submit </button>
//                 { Object.keys(formErrors).length === 0 && isSubmit ? <span className="succes show_slide"> 
//                 <i class="bi bi-check2-circle "></i> 
//                 Hey <span className="user-name"> {showName} </span>   You are a one of us now !  </span> : ("") } 
//             </form>

//     {/* ----------------------------------LoginForm----------------------------------------------- */}
                
//         </div>
//         <div class="form-container sign-in-container">
//         <form onSubmit={sendLoginRequest}> 

// {/* -----------------------------FailedMessage---------------------------- */}

//         <h4 className="danger">{ loginFailed  }</h4>

//         <h1>Sign in</h1>
        
// {/* ------------------------------------------LoginEmail------------------------------- */}

//         <input type="text"
//         className="inputSignIn"
//         placeholder="Email" 
//         name= "LoginEmail"
//         onChange={(e) => setLoginEmail(e.target.value)}
//         />

// {/* -------------------------------------LoginPassword-------------------------------------- */}
//         <input type="password"
//         className="inputSignIn" 
//         placeholder="Password" 
//         name="LoginPassword"
//         onChange={(e) => setLoginPassword(e.target.value) }
//         // onChange={(e) => setLoginFailed=""}
//         />

      
//         <button variant="primary" className="button">Sign In</button>
       
        
//         <Link to='/'>
//         <a >Forgot your password?</a>

//         </Link> 
        
// {/* ------------------------------------------------------------------------------------------------------- */}
//          </form> 
//         </div>
//         <div class="overlay-container">
//             <div class="overlay">
//                 <div class="overlay-panel overlay-left">
//                     <h1>Welcome!</h1>
//                     <p>Create your personal account now !</p>
//                     <button class="ghost button spacebtn" id="signIn">Sign In</button>
//                 </div>
//                 <div class="overlay-panel overlay-right">
//                     <h1 className="claim">Claim Now !</h1>
//                     {/* <p> To keep connected with us please login with your personal info
//                     </p> */}
//                     <button class="ghost button bbt" id="signUp"> <i class="bi bi-arrow-right-circle"></i>New here ? Join Us Now</button>

//                 </div>
//             </div>
//         </div>
//     </div>
//             )
//         }

//     export default Register