"use client";

import { useState, useMemo } from "react";
import { usePPP } from "@/lib/use-ppp";

export default function Calculator() {
  const { data: countries = [], isLoading, isError } = usePPP();
  const [price, setPrice] = useState("99");
  const [search, setSearch] = useState("");

  const basePrice = parseFloat(price) || 0;

  const filtered = useMemo(() => {
    if (!search) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.countryName.toLowerCase().includes(q) ||
        c.countryCode.toLowerCase().includes(q)
    );
  }, [countries, search]);

  return (
    <section id="calculator" className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Price Calculator
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Enter your product price in USD and see what it should cost in
            different countries based on purchasing power parity.
          </p>
        </div>

        <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-slate-400">
              $
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="99.00"
              min="0"
              step="0.01"
              className="h-14 w-48 rounded-xl border border-slate-300 bg-white pl-8 pr-4 text-lg font-semibold text-slate-900 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <span className="text-sm font-medium text-slate-500">USD</span>
          <div className="h-px w-12 bg-slate-300 sm:h-8 sm:w-px" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search countries..."
            className="h-14 w-64 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-3 w-12 rounded bg-slate-200" />
                  </div>
                </div>
                <div className="mb-3 h-8 w-28 rounded bg-slate-200" />
                <div className="h-1.5 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="py-12 text-center text-red-500">
            Failed to load PPP data. Please try refreshing the page.
          </p>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((country) => {
                const adjusted = basePrice * country.pppConversionFactor;
                const discount = Math.round(
                  (1 - country.pppConversionFactor) * 100
                );
                const isDiscount = country.pppConversionFactor < 1;

                return (
                  <div
                    key={country.countryCode}
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{country.countryFlag}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {country.countryName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {country.currencyCode}
                          </p>
                        </div>
                      </div>
                      {isDiscount && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <span className="text-2xl font-bold text-slate-900">
                        ${adjusted.toFixed(2)}
                      </span>
                      {isDiscount && basePrice > 0 && (
                        <span className="ml-2 text-sm text-slate-400 line-through">
                          ${basePrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          country.pppConversionFactor < 0.4
                            ? "bg-emerald-500"
                            : country.pppConversionFactor < 0.7
                              ? "bg-amber-500"
                              : "bg-indigo-500"
                        }`}
                        style={{
                          width: `${Math.min(country.pppConversionFactor * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-right text-xs text-slate-400">
                      Factor: {country.pppConversionFactor.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-slate-500">
                No countries found matching &quot;{search}&quot;
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
