export const formatDate = (date: Date) => {
    return (
        `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()} ` +
        `0${date.getHours()}`.slice(-2) +
        `:` +
        `0${date.getMinutes()}`.slice(-2) +
        `:00`
    );
};

export const getUNIX = (date: Date) => {
    return date.getTime();
};
