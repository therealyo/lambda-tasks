export const formatDate = (date: Date) => {
    return `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
};

export const getUNIX = (date: Date) => {
    return date.getTime();
};
