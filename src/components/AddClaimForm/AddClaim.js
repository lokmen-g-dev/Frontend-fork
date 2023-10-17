import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { select1Claim } from "../../redux/features/ClaimSlide";
import ClaimService from "../../service/ClaimService";
import NotifService from "../../service/NotifService";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import './AddClaim.css'
import i18next from "i18next"
import NotFound from './../404/404'



const AddClaim = () => {

    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const initialValues = { title: "", description: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSend, setIsSend] = useState(false);
    const deletedMsg = useSelector(select1Claim);
  



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const reqBody = {
        title: formValues.title,
        description: formValues.description
    }

    const NotifBody = { notificationMessage: AuthUser?.firstName + " Send New Claim" }

    const validate = (values) => {
        const errors = {};

        if (!values.title.replace(/\s+/, '').length) {
            errors.title = "Claim Title Required";
        }
        if (!values.description.replace(/\s+/, '').length) {
            errors.description = "Description Required";
        }
        return errors;

    }

    const cancelClaim = (e) => {
        setFormValues(initialValues);
        setIsSend(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setIsSend(false);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            ClaimService.createClaim(reqBody, AuthUser?.id);
            NotifService.sendNotifsAdmin(NotifBody);
            setIsSend(true);
            setFormValues(initialValues);

        }
    }, [formErrors])

    if (!AuthUser) {
        return <Redirect to="/login" />;
    }

    if (AuthUser.role !== "Student") {
        return <NotFound />;
    }
    return (
        <div>
            <SideBar />
            <NavBar />

            {/* ----------------------------FormTitle----------------------- */}
            <h5 className="AddClaimTitle"> {i18next.t("add claim")}  </h5>


            {deletedMsg ? <h1>{deletedMsg}</h1> : ""}
            {/* --------------------------------EditForm--------------------------- */}
            <form className="claimCard" onSubmit={handleSubmit}>


                <span className="spanLegend"> {i18next.t("claim")}</span>
                <input type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    className="EditInput"
                    placeholder={i18next.t("title")} />


                <span className="spanLegend"> Description</span>


                <textarea
                    class="DescInput "
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder= {i18next.t("please provide all the information about the issue you have")}
                />




                <button class="ClaimAddButton"><i class="bi bi-plus-square "></i> Send Claim</button>

            </form>
            <button class="Claimcancel" onClick={cancelClaim}><i class="bi bi-x"></i> Cancel</button>
            {isSend ? (<span className="succes3 show_slide">
                <i class="bi bi-check2-circle "></i>  Claim send successfully  </span>) : ("")}
            <div className="errors">
                {Object.keys(formErrors).length ? <i class="bi bi-exclamation-lg errIcon"></i> : ""}
                <div>
                    {formErrors.title ? <div> {formErrors.title} <br /> </div> : ""}
                    {formErrors.description}
                </div>

            </div>
        </div>
    )
}

export default AddClaim;
