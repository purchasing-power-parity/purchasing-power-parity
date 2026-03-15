import { COUNTRY_CODES, getCountryName, getCountryFlag } from "./countries";

const PPP_API = "https://ppp-api.fly.dev";

export type PPPData = {
  countryCode: string;
  countryName: string;
  countryFlag: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  ppp: number;
  pppConversionFactor: number;
};

type APIResponse = {
  countryCodeIsoAlpha2: string;
  countryCodeIsoAlpha3: string;
  currenciesCountry: Record<
    string,
    { symbol: string; name: string }
  >;
  currencyMain: {
    exchangeRate: number;
    name: string;
    symbol: string;
  };
  ppp: number;
  pppConversionFactor: number;
};

async function fetchPPPForCountry(
  code: string
): Promise<PPPData | null> {
  try {
    const res = await fetch(`${PPP_API}/?target=${code}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data: APIResponse = await res.json();

    const currencyEntries = Object.entries(
      data.currenciesCountry ?? {}
    );
    const [currencyCode, currencyInfo] = currencyEntries[0] ?? [
      "USD",
      { name: "US Dollar", symbol: "$" },
    ];

    // Only include countries with a sensible conversion factor (0 < factor <= 1.5)
    if (
      data.pppConversionFactor <= 0 ||
      data.pppConversionFactor > 1.5
    ) {
      return null;
    }

    return {
      countryCode: data.countryCodeIsoAlpha2,
      countryName: getCountryName(data.countryCodeIsoAlpha2),
      countryFlag: getCountryFlag(data.countryCodeIsoAlpha2),
      currencyCode,
      currencyName: currencyInfo.name,
      currencySymbol: currencyInfo.symbol,
      ppp: data.ppp,
      pppConversionFactor: data.pppConversionFactor,
    };
  } catch {
    return null;
  }
}

export async function fetchAllPPP(): Promise<PPPData[]> {
  const results = await Promise.allSettled(
    COUNTRY_CODES.map((code) => fetchPPPForCountry(code))
  );

  const pppData = results
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter((d): d is PPPData => d !== null);

  pppData.sort((a, b) => a.countryName.localeCompare(b.countryName));

  return pppData;
}
