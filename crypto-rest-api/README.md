## CRYPTO REST API ##

This project can help you get current or past prices of crypto currencies from these markets: <br />
1. [CoinMarketCap](https://coinmarketcap.com/ "CoinMarketCap")
2. [Coinbase](https://www.coinbase.com/ "Coinbase")
3. [Coinstats](https://coinstats.app/ "Coinstats")
4. [Kucoin](https://www.kucoin.com/ "Kucoin")
5. [Coinpaprika](https://coinpaprika.com/ "Coinpaprika")

- To process request go to the https://typescript-crypto-api.herokuapp.com/ and enter your request to query parameters <br />
- crypto - csv of crypto currencies you are interested in (required) <br />
- market - if specified show info from a certain market ( <br />
&emsp;optional, <br />
&emsp;possible values: [ <br />
&emsp;&emsp;'coinmarket', <br />
&emsp;&emsp;'coinbase', <br />
&emsp;&emsp;'coinpaprika', <br />
&emsp;&emsp;'coinstats', <br /> 
&emsp;&emsp;'kucoin' <br />
        ];)
- startDate and endDate - if you want to get data from a certain period of time you should specifie both of this parameters <br />
&emsp; this parameters must be in UTC-0 time zone and in format "YYYY-MM-DD HH-MM-SS"

Example: https://typescript-crypto-api.herokuapp.com/?crypto=BTC&startDate=2022-08-09%209:49:00&endDate=2022-08-09%209:55:00
