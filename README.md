# Purchasing Parity Power

Online products should be made affordable for everyone around the world. This module is a simple way to make [Purchasing Parity Power](https://en.wikipedia.org/wiki/Purchasing_power_parity) available in your browser.

Install:

`npm install purchasing-parity-power`

Use:

```
import getPpp from 'purchasing-parity-power'

let originalPrice = 99.99;
let discountPrice;

getPpp().then(function (ppp) => {
  discountPrice = ppp.pppConversionFactor * originalPrice;
});
```

ppp-Object:

```
{
  countryCodeIsoAlpha2: "IN",
  countryCodeIsoAlpha3: "IND",
  countryName: "India",
  currenciesCountry: [{

  }],
  currencyMain: {
    exchangeRate: 65.06,
    code: "INR",
    name: "Indian rupee",
    symbol: "₹"
  },
  ppp: 17.536,
  pppConversionFactor: 0.2695358130956041,
}
```

The `currencyMain` property with its `exchangeRate` property is used to compute the `pppConversionFactor` by using the `ppp`.

## Who is using PPP?

Make a public statement that you are using PPP to make your products affordable for everyone. Add yourself to the list:

* [Road to React](https://roadtoreact.com/)
* ...

## Contribution

The project is in an early stage, so please feel free to contribute to it. Contribution in three steps:

* create an Issue
* discuss with maintainers and contributors about the issue
* create a Pull Request if the issue should be solved