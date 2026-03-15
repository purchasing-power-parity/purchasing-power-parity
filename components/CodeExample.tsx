const apiExample = `// Fetch PPP data for Indonesia
const response = await fetch(
  "https://ppp-api.fly.dev/?target=ID"
);
const data = await response.json();

// data.pppConversionFactor = 0.23
// Adjust your price:
const adjustedPrice = 99 * data.pppConversionFactor;
// → $22.77`;

const responseExample = `{
  "countryCodeIsoAlpha2": "ID",
  "countryCodeIsoAlpha3": "IDN",
  "currenciesCountry": {
    "IDR": {
      "symbol": "Rp",
      "name": "Indonesian rupiah"
    }
  },
  "currencyMain": {
    "exchangeRate": 15947.5,
    "name": "USD",
    "symbol": "$"
  },
  "ppp": 4917.56,
  "pppConversionFactor": 0.31
}`;

export default function CodeExample() {
  return (
    <section id="api" className="bg-slate-950 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Simple API
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            One HTTP request. No API key required. Just pass a country code
            and get the PPP conversion factor.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
              GET
            </span>
            <code className="font-mono text-sm text-slate-300">
              https://ppp-api.fly.dev/?target=&#123;COUNTRY_CODE&#125;
            </code>
          </div>
          <p className="text-sm text-slate-500">
            Replace <code className="text-slate-400">COUNTRY_CODE</code>{" "}
            with an ISO 3166-1 alpha-2 code (e.g.,{" "}
            <code className="text-slate-400">US</code>,{" "}
            <code className="text-slate-400">DE</code>,{" "}
            <code className="text-slate-400">BR</code>)
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Usage Example
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <span className="ml-2 text-xs text-slate-600">
                  JavaScript
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-slate-300">
                {apiExample}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              API Response
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-700" />
                <span className="ml-2 text-xs text-slate-600">JSON</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-emerald-400">
                {responseExample}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
