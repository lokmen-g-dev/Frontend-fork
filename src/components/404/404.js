import React, { useEffect, useState } from "react"
import i18next from "i18next"
import notfound from './notfound.png'
import './404.css'


const AddClaim = () => {

    return (
        <div className="page404">
            <h1 className="sorry404">{i18next.t("Sorry")}...</h1>
            <div className='titleHome2'>{i18next.t("We couldn't find the page you're looking for")}.</div>
            <img src={notfound} />
            <button className="return404" onClick={() => window.location.href="/profil"}>{i18next.t("Return")}</button>
        </div>
    )
}

export default AddClaim;
