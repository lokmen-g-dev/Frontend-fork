import './App.css';
import Register from './components/Register/Register';
import { BrowserRouter, Route } from 'react-router-dom';
import React, { useEffect, useState, useRef } from "react";
import Profil from './components/Profil/Profil';
import ImageSlider from './components/Slider/ImageSlider';
import EditProfil from './components/EditProfil/EditForm';
import AddClaim from './components/AddClaimForm/AddClaim';
import StudentClaimsList from './components/StudentClaimsList/StudentClaimsList';
import EditClaim from './components/EditClaimForm/EditClaimForm';
import DashboardAdmin from './components/DashbordAdmin/DashboardAdmin';
// import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
// import DataStat from './components/DashboardAdmin/DataStat';
import DataStat from './components/DashbordAdmin/DataStat';
import NavBar from './components/NavBar/NavBar';
import StudentsList from './components/StudentsList/StudentsList';
import ClaimsList from './components/ClaimsList/ClaimsList';
import WaitClaims from './components/ClaimsList/WaitClaims';
import InProgClaims from './components/ClaimsList/InProgClaims';
import FiniClaims from './components/ClaimsList/FiniClaims';
import SignIn from './components/SingIn/SingIn';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/404/404';
import EmployeeClaimsList from './components/EmployeeClaimsList/EmployeeClaimsList';
import Messanger from './components/Messanger/Messanger';
import EmployeesList from './components/EmployeesList/EmployeesList';
import HandlingServiceList from './components/HandlingServiceList/HandlingServiceList'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';





function App() {
  const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));




  return (
    <BrowserRouter>
      <div>

        <Switch>
          <Route exact path="/profil" component={Profil} />
          <Route exact path="/addclaim" component={AddClaim} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/claimlist" component={StudentClaimsList} />
          <Route exact path="/editprofil" component={EditProfil} />
          <Route exact path="/editclaim" component={EditClaim} />
          <Route exact path="/dashboardadmin" component={DashboardAdmin} />
          <Route exact path="/studentslist" component={StudentsList} />
          <Route exact path="/employeeslist" component={EmployeesList} />
          <Route exact path="/servicelist" component={HandlingServiceList} />
          <Route exact path="/claimslist" component={ClaimsList} />
          <Route exact path="/waitclaims" component={WaitClaims} />
          <Route exact path="/inprogclaims" component={InProgClaims} />
          <Route exact path="/finiclaims" component={FiniClaims} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/employee/claims" component={EmployeeClaimsList} />
          <Route exact path="/messanger" component={Messanger} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />

          <Route exact path="/*" component={NotFound} />

        </Switch>





      </div>

    </BrowserRouter>

  );
}



export default App