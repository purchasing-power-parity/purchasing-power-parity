export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
          Open Source
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Make your products{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            affordable worldwide
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 md:text-xl">
          Not everyone can pay Western prices. Use Purchasing Power Parity to
          automatically adjust your pricing so customers from every country
          can access your products.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#calculator"
            className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
          >
            Try the Calculator
          </a>
          <a
            href="#api"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
          >
            View API
          </a>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-100 opacity-50 blur-3xl"
      />
    </section>
  );
}
