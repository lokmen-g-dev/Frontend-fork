import React, { useEffect, useRef, useState } from "react";
import './DataStat.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css'
import ClaimService from "../../service/ClaimService";
import moment from "moment"
import {ArcElement} from 'chart.js';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import i18next from "i18next"


const DataStat = () => {
    const AuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    const [claims, setClaims] = useState([]);
    const MONTHS = [
      i18next.t("january"),
      i18next.t("february"),
      i18next.t("march"),
      i18next.t("april"),
      i18next.t("may"),
      i18next.t("june"),
      i18next.t("july"),
      i18next.t("august"),
      i18next.t("september"),
      i18next.t("october"),
      i18next.t("november"),
      i18next.t("december")
      ];
      
    const Months = [1,2,3,4,5,6,7,8,9,10,11,12];
    const [indices,setIndices] = useState([]);

    useEffect(() => {

        ClaimService.getAllClaims()
        .then(
            (result) => {
                const tab=[];
                result.data.map(claim => {
                    tab.push(moment(claim.dateRec).format('M'))
                })
                setClaims(tab)
            },
        )
        const tab2 = [];
        Months.map(m => {
            var x = 0;
            var e = m.toString()
            var idx = claims.indexOf(e);
            while (idx != -1) {
                x+=1;
              idx = claims.indexOf(e, idx + 1);
            }
            tab2.push(x);
        })
        setIndices(tab2);
    },[claims])
  
    const data = {
      labels: MONTHS,
      datasets: [{
        label: i18next.t("claims"),
        data: indices,
        fill: true,
        backgroundColor: 'rgb(192, 57, 43,0.25)',
        borderColor: 'rgb(231, 76, 60)',
        tension: 0.2
      }]
    };
    return (
        
            <Line data={data} className="LineChart" />
       

    )

}

export default DataStat;