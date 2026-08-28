import QrGenerator from "@/components/QrGenerator";

export default function App() {
  return (
    <div className="flex h-full flex-1 flex-col bg-app-bg text-[13px] text-app-text">
      <header className="flex items-center gap-3 border-b border-app-border bg-app-sidebar px-5 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-app-card text-app-accent">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" />
          </svg>
        </div>
        <div>
          <h1 className="text-[13px] font-semibold text-app-text-heading">
            QR Code Generator
          </h1>
          <p className="text-[11px] text-app-text-muted">
            Generate and export custom QR codes
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-5 py-5">
        <QrGenerator />
      </main>
    </div>
  );
}
