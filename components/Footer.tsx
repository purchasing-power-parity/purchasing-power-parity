export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-semibold text-slate-900">
            Purchasing Power Parity
          </p>
          <p className="text-sm text-slate-500">
            Make your products affordable worldwide.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rwieruch/purchasing-power-parity"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
          >
            GitHub
          </a>
          <a
            href="https://www.robinwieruch.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
          >
            Robin Wieruch
          </a>
          <span className="text-sm text-slate-400">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
