const axios = require("axios");

let monoCache = {
    usd: {
        buy: 0,
        sell: 0,
    },
    eur: {
        buy: 0,
        sell: 0,
    },
};

async function getBankReply(bankName) {
    let endpoint;
    if (bankName === "mono") {
        endpoint = "https://api.monobank.ua/bank/currency";
    } else {
        endpoint =
            "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";
    }

    return await axios.get(endpoint);
}

async function getMonoReply() {
    const data = getBankReply("mono");
    let msg = await createResponseMessage(data);
    return "Монобанк\n" + msg;
}

async function getPrivatReply() {
    const data = getBankReply("privat");
    let msg = await createResponseMessage(data);
    return "ПриватБанк\n" + msg;
}

async function getRatesFromResponse(ratesPromise) {
    let usd;
    let eur;

    await ratesPromise
        .then((r) => {
            const data = r.data;
            let usdRate = data.find((obj) => {
                return obj["currencyCodeA"] === 840;
            });
            let eurRate = data.find((obj) => {
                return obj["currencyCodeA"] === 978;
            });

            if (usdRate && eurRate) {
                monoCache.usd["buy"] = usdRate["rateBuy"];
                monoCache.usd["sell"] = usdRate["rateSell"];
                monoCache.eur["buy"] = eurRate["rateBuy"];
                monoCache.eur["sell"] = eurRate["rateSell"];
                usd = monoCache.usd;
                eur = monoCache.eur;
            } else {
                usd = data.find((obj) => {
                    return obj["ccy"] === "USD";
                });
                usd.sell = usd.sale;
                delete usd.sale;
                eur = data.find((obj) => {
                    return obj["ccy"] === "EUR";
                });
                eur.sell = eur.sale;
                delete eur.sale;
            }
        })
        .catch((err) => {
            usd = monoCache.usd;
            eur = monoCache.eur;
        });

    return [usd, eur];
}

async function createResponseMessage(response) {
    const rates = await getRatesFromResponse(response);
    let usd = rates[0];
    let eur = rates[1];
    return `Доллар:\nПокупка: ${usd.buy}\nПродажа: ${usd.sell}\nЕвро:\nПокупка: ${eur.buy}\nПродажа: ${eur.sell}`;
}

module.exports = {
    getMonoReply: getMonoReply,
    getPrivatReply: getPrivatReply,
};
