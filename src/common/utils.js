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

export function isDev() {
    return process.env.NODE_ENV === 'development';
}

export const getLabelByLanguage = (language, key, namespace="translation") => {
    return i18n.getDataByLanguage(language)[namespace][key];
};
