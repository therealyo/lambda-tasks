import axios from 'axios';

const MSONEHOUR = 3_600_000;

const substractHoursFromDateTime = (datetime: Date, hours: number) => {
    return new Date(datetime.getTime() - hours * MSONEHOUR);
};

const addHoursToDateTime = (datetime: Date, hours: number) => {
    return new Date(datetime.getTime() + hours * MSONEHOUR);
};

const formatDateToSQLFormat = (datetime: Date) => {
    return (
        `${datetime.getFullYear()}-` +
        `0${datetime.getMonth() + 1}`.slice(-2) +
        '-' +
        `0${datetime.getDate()}`.slice(-2) +
        ' ' +
        `0${datetime.getHours()}`.slice(-2) +
        `:` +
        `0${datetime.getMinutes()}`.slice(-2) +
        `:00`
    );
};

const generateTimeBounds = (datetime: Date) => {
    const startBound = substractHoursFromDateTime(datetime, 1 / 24);
    const endBound = addHoursToDateTime(datetime, 1 / 24);
    return [startBound, endBound];
};

const getSymbolDataForSpecificTime = async (symbol: string, datetime: Date) => {
    const period = generateTimeBounds(datetime).map(formatDateToSQLFormat);
    // console.log(datetime, period);
    const { data } = await axios.get(
        `https://typescript-crypto-api.herokuapp.com/?crypto=${symbol}&startDate=${period[0]}&endDate=${period[1]}`
    );
    if (data.length !== 0) {
        return data.slice(-1)[0];
    } else {
        return 'no info';
    }
};

const generateTimePeriodsForCoinInfo = () => {
    const now = new Date();
    return [
        substractHoursFromDateTime(now, 1 / 2),
        substractHoursFromDateTime(now, 1),
        substractHoursFromDateTime(now, 3),
        substractHoursFromDateTime(now, 6),
        substractHoursFromDateTime(now, 12),
        substractHoursFromDateTime(now, 24)
    ];
};

const generateReply = async (symbol: string) => {
    const times = generateTimePeriodsForCoinInfo();
    return await Promise.all(
        times.map((datetime) => {
            return getSymbolDataForSpecificTime(symbol, datetime);
        })
    );
};

export const handleSymbolRequest = async (symbol: string) => {
    const reply = (await generateReply(symbol)).map((coin) => {
        return coin.avg_price ? `$${coin.avg_price}` : 'no info';
    });
    return `30 minutes ${reply[0]}\n1 hour ${reply[1]}\n3 hours ${reply[2]}\n6 hours ${reply[3]}\n12 hours ${reply[4]}\n24 hours ${reply[5]}`;
};
