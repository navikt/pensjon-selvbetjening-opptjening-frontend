export const formatAmount = (amount) => {
    return Intl.NumberFormat('nb-NO',
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,

        }).format(Math.abs(amount));
};

export function isDev() {
    return process.env.NODE_ENV === 'development';
}
