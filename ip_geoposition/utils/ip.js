const fs = require("fs");

const GEOPOSITIONS = "../data/locations.csv";
const IP_CONSTS = [16777216, 65536, 256, 1];

const dotProduct = (arr1, arr2) => {
    const product = arr1.map((x, i) => arr1[i] * arr2[i]);
    return product.reduce((a, b) => {
        return a + b;
    });
};

const removeQuotes = (strArray) => {
    return strArray.map((el) => el.replaceAll('"', ""));
};

const formatString = (str) => {
    return removeQuotes(str.split(","));
};

const getInterval = (ipString) => {
    return [parseInt(ipString[0]), parseInt(ipString[1])];
};

const convertToNumber = (ip) => {
    const values = ip.split(".");
    return dotProduct(values, IP_CONSTS);
};

const readGeopositions = async (path) => {
    return (await fs.promises.readFile(path, "utf-8"))
        .split("\n")
        .map((str) => formatString(str));
};

const inInterval = (ipNumber, interval) => {
    return ipNumber >= interval[0] && ipNumber <= interval[1];
};

const search = (ipNumber, ipsIntervals) => {
    let start = 0,
        end = ipsIntervals.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const interval = getInterval(ipsIntervals[mid]);

        if (inInterval(ipNumber, interval)) return mid;
        else if (ipNumber > interval[1]) start = mid + 1;
        else end = mid - 1;
    }
    return false;
};

const findGeoposition = async (ip) => {
    const ips = await readGeopositions(GEOPOSITIONS);
    const ipNumber = convertToNumber(ip);
    const found = search(ipNumber, ips);
    return ips[found];
};

const createResponse = async (ip) => {
    const geopostion = await findGeoposition(ip);

    const responseJSON = {
        ip: ip,
        ipDecimal: convertToNumber(ip),
        interval: getInterval(geopostion),
        countryCode: geopostion[2],
        country: geopostion[3].replaceAll("\r", ""),
    };

    return JSON.stringify(responseJSON, null, 3);
};

module.exports = {
    createResponse,
};
