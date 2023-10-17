import React, { useState } from "react";
import ClaimService from "../../service/ClaimService";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './EditClaimForm.css';
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar/NavBar"
import SideBar from "../SideBar/SideBar"
import NotFound from './../404/404'



const EditClaim = () => {




  const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
  const thisClaim = JSON.parse(localStorage.getItem("thisObject"));
  const [initialValues, setInitialValues] = useState({ title: thisClaim?.title, description: thisClaim?.description });
  const [formValues, setFormValues] = useState(initialValues);
  const history = useHistory();

  const cancelUpdate = (e) => {
    setFormValues(initialValues);
    history.push('/claimlist');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const sendUpdateRequest = (e) => {

    e.preventDefault();

    const reqBody = {
      title: formValues.title,
      description: formValues.description
    }

    ClaimService.updateClaim(reqBody, AuthUser.id, thisClaim.id)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "#popup4";
        }
        return Promise.reject("Failed . Please try again !");
      })

  }
  if (!AuthUser) {
    return <Redirect to="/login" />;
  }

  if (!thisClaim) {
    return <Redirect to='/claimlist' />
  }

  if (AuthUser.role !== "Student") {
    return <NotFound />;
  }

  return (
    <div>
      <SideBar />
      <NavBar />
      <h5 className="FormTitle2"> EDIT CLAIM  </h5>
      <div class="popup3">
        <span className="spanLegend">Claim</span>
        <input type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="EditInput"
          placeholder="Title " />
        <span className="spanLegend">Description</span>
        <textarea
          class="DescInput "
          name="description"
          value={formValues.description}
          onChange={handleChange}
          rows="6"
          placeholder="      
                        Please provide all the information about your issue you can."
        />
        <div>
          <button class="ClaimUpdateButton" onClick={sendUpdateRequest}><i class="bi bi-arrow-repeat "></i> Update</button>
          <button class="Claimcancel2" onClick={cancelUpdate}><i class="bi bi-x"></i> Cancel</button>
          {/* <a class="close" onClick={cancelUpdate}>Cancel</a> */}
        </div>
      </div>
      <div id="popup4" class="overlay12">
        <div class="popup4">
          <h2>Updated successfully <i class="bi bi-check2-circle"></i></h2>
          <a class="close1" href="/claimlist">Ok</a>
        </div>
      </div>
    </div>
  )
}


export default EditClaim;