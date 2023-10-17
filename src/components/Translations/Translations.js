import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import fr from './fr.png';
import en from './en.png'



const Translations = () => {


    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="langDisplay">
            <p className="lang-name">{option.code}</p>
                    <span><img src={option.img} className="lang-img2" /></span>
            </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    const countryOptionTemplate = (option) => {
        return (
            <div className="langDisplay">
            <p className="lang-name">{option.name}</p>
                    <span><img src={option.img} className="lang-img" /></span>
            </div>
        );
    }

    const countries = [
        { name: 'Francais', code: 'fr' , img : fr },
        { name: 'Englais', code: 'en',img : en }
    ];
    const lang = JSON.parse(localStorage.getItem("lang")) || countries[1]
    const [selectedCountry, setSelectedCountry] = useState(lang);

    const onCountryChange = (e) => {
        setSelectedCountry(e.value);
        localStorage.setItem('lang', JSON.stringify(e.value));
        window.location.href=''
        
    }



    return (
           <Dropdown panelClassName="fffr" className="buttonLang" value={selectedCountry}  options={countries} onChange={onCountryChange} dropdownIcon="r" optionLabel="name"  ffff
                    valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} />

    )
}


export default Translations