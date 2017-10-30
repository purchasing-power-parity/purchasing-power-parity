import axios from 'axios';

const BASE_CURRENCY = 'USD';
const GEO_API_URL = 'https://freegeoip.net/json/';
const COUNTRY_META_API = 'https://restcountries.eu/rest/v2/alpha/';
const EXCHANGE_RATES_API = `https://api.fixer.io/latest?base=${BASE_CURRENCY}`;
const QUANDL_API = 'https://www.quandl.com/api/v3/';

const getYear = () =>
  new Date().getFullYear();

const getLastYear = () =>
  getYear() - 1;

const getQuandlApiUrl = countryCodeIsoAlpha3 =>
  `${QUANDL_API}datasets/ODA/${countryCodeIsoAlpha3}_PPPEX.json?start_date=${getLastYear()}-01-01&end_date=${getYear()}-01-01`;

const mapGeoToPpp = response => ({
  countryName: response.data.country_name,
  countryCodeIsoAlpha2: response.data.country_code,
});

const getGeo = () =>
  axios.get(GEO_API_URL)
    .then(mapGeoToPpp);

const mapCountryMetaToPpp = pppInformation => response => ({
  ...pppInformation,
  currenciesCountry: response.data.currencies,
  countryCodeIsoAlpha3: response.data.alpha3Code,
});

const fetchCountryMeta = pppInformation =>
  axios.get(`${COUNTRY_META_API}${pppInformation.countryCodeIsoAlpha2}`)
    .then(mapCountryMetaToPpp(pppInformation));

const findExchangeRate = (exchangeRates, currenciesCountry) => {
  for (let i = 0; i < currenciesCountry.length; i++) {
    if (exchangeRates[currenciesCountry[i].code]) {
      return {
        exchangeRate: exchangeRates[currenciesCountry[i].code],
        ...currenciesCountry[i],
      };
    } else {
      return {
        exchangeRate: 1,
      }
    }
  }
};

const mapExchangeRatesToPpp = pppInformation => response =>
  ({
    ...pppInformation,
    currencyMain: findExchangeRate(response.data.rates, pppInformation.currenciesCountry),
  });

const fetchExchangedRates = country =>
  axios.get(EXCHANGE_RATES_API)
    .then(mapExchangeRatesToPpp(country));

const mapToPpp = pppInformation => response =>
  ({
    ...pppInformation,
    ppp: response.data.dataset.data[0][1],
  });

const fetchPpp = pppInformation =>
  axios.get(getQuandlApiUrl(pppInformation.countryCodeIsoAlpha3))
    .then(mapToPpp(pppInformation));

const computePppConversionFactor = ({ currencyMain, ppp }) =>
  ppp / currencyMain.exchangeRate;

const getPppConversionFactor = pppInformation => ({
  ...pppInformation,
  pppConversionFactor: computePppConversionFactor(pppInformation),
});

const getPpp = () =>
  getGeo()
    .then(fetchCountryMeta)
    .then(fetchExchangedRates)
    .then(fetchPpp)
    .then(getPppConversionFactor)
    .catch(() => {
      try {
        throw new Error('Failed to fetch purchasing parity power.');
      } catch (e) {
        throw e;
      }
    });

export default getPpp;