import i18n from "i18next";

export const formatAmount = (amount) => {
    if(amount!==null){
        return Intl.NumberFormat('nb-NO',
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,

            }).format(amount);
    } else {
        return;
    }

};

export const formatNumber = (number) => {
    if(number!==null){
        return number.toLocaleString("nb-NO", {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
};

export function isDev() {
    return process.env.NODE_ENV === 'development';
}

export const getLabelByLanguage = (language, key, namespace="translation") => {
    const label = i18n.getDataByLanguage(language)[namespace][key];
    return label ? label : key;
};

export const getCurrentLocale = () => {
    const language = i18n.language;
    switch (language) {
        case "nb":
            return "no-NO";
        case "nn":
            return "no-NO";
        case "en":
            return "en-GB";
        default:
            return "no-NO";
    }
}
