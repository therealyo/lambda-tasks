CRYPTO REST API

This project can help you get current or past prices of crypto currencies from these markets:
[1]: https://coinmarketcap.com/ "CoinMarketCap"
[2]: https://www.coinbase.com/ "Coinbase"
[3]: https://coinstats.app/ "Coinstats"
[4]: https://www.kucoin.com/ "Kucoin"
[5]: https://coinpaprika.com/ "Coinpaprika"

To process request go to the https://typescript-crypto-api.herokuapp.com/ and enter your request to query parameters
crypto - csv of crypto currencies you are interested in (required)
market - if specified show info from a certain market (
    optional, 
    possible values: [
        'coinmarket',
        'coinbase',
        'coinpaprika',
        'coinstats',
        'kucoin'
        ];)
startDate and endDate - if you want to get data from a certain period of time you should specifie both of this parameters
    this parameters must be in UTC-0 time zone and in format "YYYY-MM-DD HH-MM-SS"

Example: https://typescript-crypto-api.herokuapp.com/?crypto=BTC&startDate=2022-08-09%209:49:00&endDate=2022-08-09%209:55:00
