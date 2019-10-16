# Purchasing Power Parity

[![Build Status](https://travis-ci.org/rwieruch/purchasing-power-parity.svg?branch=master)](https://travis-ci.org/rwieruch/purchasing-power-parity)

Not everyone is able to pay for the default pricings of the western world. Online products should be made affordable for everyone around the world. This package is a simple way to make [Purchasing Power Parity](https://purchasing-power-parity.com) available in your browser. See how it could look like in your application for someone buying your product from another country:

<img width="1276" alt="screen shot 2017-11-02 at 08 40 54" src="https://user-images.githubusercontent.com/2479967/32305725-a8186744-bfa9-11e7-9d58-a074c5b34982.png">

## How to use it?

**Install:**

`npm install purchasing-power-parity`

**Use:**

```js
import fetchPPP from 'purchasing-power-parity';

let originalPrice = 99.99;
let discountPrice;

fetchPPP().then(response => {
  discountPrice = response.ppp.pppConversionFactor * originalPrice;
});
```

If you don't want to use this library, you can also use the [API](https://api.purchasing-power-parity.com/?target=ID) directly where you are able to pass the country code yourself. Otherwise, this library will figure out the location of the user itself.

After all, you can adjust your prices when the `pppConversionFactor` goes below 1 and add an optional banner for your customers to make them aware of it. What other information is in the returned PPP object?

**ppp-object:**

```js
{
  countryCodeIsoAlpha2: 'ID',
  countryName: 'Indonesia',
  currenciesCountry: [ { code: 'IDR', name: 'Indonesian rupiah', symbol: 'Rp' } ],
  countryCodeIsoAlpha3: 'IDN',
  currencyMain:
   { exchangeRate: 14188,
     code: 'IDR',
     name: 'Indonesian rupiah',
     symbol: 'Rp' },
  ppp: 4242.36,
  pppConversionFactor: 0.299010431350437
}
```

The `currencyMain.exchangeRate` and `ppp` property are used to compute the `pppConversionFactor`.

## Limitations

- runs only in the browser
- takes only USD as baseline

## Who uses PPP?

This node package was inspired by [Wes Bos](https://twitter.com/wesbos) who sells his courses with PPP. There are other people which make their products affordable to everyone around the world by using PPP. You can add your project/company/product/service/... to the list when you are using this package:

- [Road to React](https://roadtoreact.com/)
- ...

## Contribution

The project is in an early stage, so please feel free to contribute to it. It works, but it could be more robust and improved. If you want to know how PPP works, you can read up this [short article](https://www.sapling.com/6218206/calculate-purchasing-power-parity). I would love to see you contributing to it:

- create an Issue
- discuss with maintainers and contributors about the issue
- create a Pull Request if the issue should be solved
