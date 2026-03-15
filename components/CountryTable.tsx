"use client";

import { useState, useMemo } from "react";
import { usePPP } from "@/lib/use-ppp";

type SortKey = "countryName" | "pppConversionFactor" | "currencyCode";
type SortDir = "asc" | "desc";

export default function CountryTable() {
  const { data: countries = [], isLoading, isError } = usePPP();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("countryName");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    let data = countries;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.countryName.toLowerCase().includes(q) ||
          c.countryCode.toLowerCase().includes(q) ||
          c.currencyCode.toLowerCase().includes(q)
      );
    }
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp =
        typeof aVal === "string"
          ? aVal.localeCompare(bVal as string)
          : (aVal as number) - (bVal as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [countries, search, sortKey, sortDir]);

  const SortIcon = ({ active, dir }: { active: boolean; dir: SortDir }) => (
    <svg
      className={`ml-1 inline h-3 w-3 ${active ? "text-indigo-600" : "text-slate-400"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {dir === "asc" ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );

  return (
    <section id="countries" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            All Countries
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Complete list of PPP conversion factors. A factor below 1 means
            the country has lower purchasing power than the US.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country, code, or currency..."
            className="h-12 w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="ml-auto h-4 w-16 rounded bg-slate-200" />
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="py-12 text-center text-red-500">
            Failed to load PPP data. Please try refreshing the page.
          </p>
        )}

        {!isLoading && !isError && (<>
        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 md:block">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">
                  <button
                    onClick={() => handleSort("countryName")}
                    className="inline-flex items-center hover:text-indigo-600"
                  >
                    Country
                    <SortIcon
                      active={sortKey === "countryName"}
                      dir={sortKey === "countryName" ? sortDir : "asc"}
                    />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button
                    onClick={() => handleSort("currencyCode")}
                    className="inline-flex items-center hover:text-indigo-600"
                  >
                    Currency
                    <SortIcon
                      active={sortKey === "currencyCode"}
                      dir={sortKey === "currencyCode" ? sortDir : "asc"}
                    />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button
                    onClick={() => handleSort("pppConversionFactor")}
                    className="inline-flex items-center hover:text-indigo-600"
                  >
                    PPP Factor
                    <SortIcon
                      active={sortKey === "pppConversionFactor"}
                      dir={
                        sortKey === "pppConversionFactor" ? sortDir : "asc"
                      }
                    />
                  </button>
                </th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">$99 Adjusted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((country) => {
                const discount = Math.round(
                  (1 - country.pppConversionFactor) * 100
                );
                return (
                  <tr
                    key={country.countryCode}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{country.countryFlag}</span>
                        <div>
                          <p className="font-medium text-slate-900">
                            {country.countryName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {country.countryCode}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-600">
                      {country.currencyCode} ({country.currencySymbol})
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-sm font-semibold text-slate-900">
                        {country.pppConversionFactor.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {discount > 0 ? (
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          -{discount}%
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                          Base
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-sm font-semibold text-indigo-600">
                      ${(99 * country.pppConversionFactor).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-3 md:hidden">
          {sorted.map((country) => {
            const discount = Math.round(
              (1 - country.pppConversionFactor) * 100
            );
            return (
              <div
                key={country.countryCode}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.countryFlag}</span>
                    <span className="font-medium text-slate-900">
                      {country.countryName}
                    </span>
                  </div>
                  {discount > 0 && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slate-500">
                    {country.currencyCode} &middot; Factor:{" "}
                    {country.pppConversionFactor.toFixed(2)}
                  </span>
                  <span className="font-mono text-lg font-bold text-indigo-600">
                    ${(99 * country.pppConversionFactor).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <p className="py-12 text-center text-slate-500">
            No countries found matching &quot;{search}&quot;
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Showing {sorted.length} of {countries.length} countries
        </p>
        </>)}
      </div>
    </section>
  );
}
