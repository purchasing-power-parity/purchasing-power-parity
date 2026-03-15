const steps = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.468.73-3.56" />
      </svg>
    ),
    title: "What is PPP?",
    description:
      "Purchasing Power Parity measures the relative cost of living between countries. A dollar buys different amounts of goods depending on where you are.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Why it matters",
    description:
      "A $99 product is affordable in the US, but could cost a week's salary in some countries. PPP helps you price fairly for every market.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "How to use it",
    description:
      "Call the PPP API with a country code, get back a conversion factor, and multiply it by your base price. That's it.",
  },
];

const examples = [
  { flag: "🇺🇸", country: "United States", factor: 1.0, price: 99 },
  { flag: "🇩🇪", country: "Germany", factor: 0.81, price: 80.19 },
  { flag: "🇧🇷", country: "Brazil", factor: 0.41, price: 40.59 },
  { flag: "🇮🇳", country: "India", factor: 0.27, price: 26.73 },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Three simple concepts behind fair global pricing
          </p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                {step.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12">
          <h3 className="mb-6 text-center text-lg font-semibold text-slate-900">
            $99 product adjusted by PPP
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {examples.map((ex) => (
              <div
                key={ex.country}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
              >
                <span className="text-3xl">{ex.flag}</span>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {ex.country}
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    ${ex.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {ex.factor < 1
                      ? `${Math.round((1 - ex.factor) * 100)}% discount`
                      : "Base price"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
