import i18n from "i18next";

export const formatAmount = (amount) => {
    if(amount!==null){
        return Intl.NumberFormat('nb-NO',
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,

            }).format(Math.abs(amount));
    } else {
        return;
    }

};

export const formatNumber = (number) => {
    return number.toLocaleString("nb-NO", {minimumFractionDigits: 2, maximumFractionDigits: 2})
};

export function isDev() {
    return process.env.NODE_ENV === 'development';
}

export const getLabelByLanguage = (language, key, namespace="translation") => {
    const label = i18n.getDataByLanguage(language)[namespace][key];
    return label ? label : key;
};
