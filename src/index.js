import axios from 'axios';

const GEO_API_URL = 'https://freegeoip.app/json/';
const PPP_API_URL =
  'https://api.purchasing-power-parity.com/?target=';

const mapGeo = response => ({
  countryCodeIsoAlpha2: response.data.country_code,
  countryName: response.data.country_name,
});

const fetchGeo = () => axios.get(GEO_API_URL).then(mapGeo);

const mapPPP = geo => response => ({ ...geo, ...response.data.ppp });

const fetchPPP = geo =>
  axios
    .get(`${PPP_API_URL}${geo.countryCodeIsoAlpha2}`)
    .then(mapPPP(geo));

export default () => fetchGeo().then(fetchPPP);
