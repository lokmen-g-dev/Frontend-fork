import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import common_fr from "./components/Translations/fr.json"
import common_en from "./components/Translations/en.json"

const resources = {
    en : {
        translation : common_en
    },
    fr : {
        translation : common_fr
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng : 'en',
    keySeparator : false,
    interpolation : {
        escapeValue : false
    }
});

export default i18n;