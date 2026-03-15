export const COUNTRY_CODES = [
  "AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU",
  "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ",
  "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD",
  "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU",
  "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC",
  "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FR", "GA", "GB",
  "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY",
  "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ",
  "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI",
  "KM", "KN", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK",
  "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME",
  "MG", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW",
  "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP",
  "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PY",
  "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE",
  "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST",
  "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN",
  "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY",
  "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW",
] as const;

export function getCountryName(code: string): string {
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  try {
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function getCountryFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}
