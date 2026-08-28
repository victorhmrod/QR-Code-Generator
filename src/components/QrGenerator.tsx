import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const ERROR_LEVELS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: "L", label: "Low (7%)" },
  { value: "M", label: "Medium (15%)" },
  { value: "Q", label: "High (25%)" },
  { value: "H", label: "Max (30%)" },
];

const PRESETS: { label: string; fg: string; bg: string }[] = [
  { label: "Classic", fg: "#c9d1d9", bg: "#1a1d22" },
  { label: "Blue", fg: "#58a6ff", bg: "#0d1117" },
  { label: "Green", fg: "#3fb950", bg: "#0d1117" },
  { label: "Red", fg: "#f85149", bg: "#0d1117" },
  { label: "High contrast", fg: "#000000", bg: "#ffffff" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-wide text-app-text-muted">
      {children}
    </span>
  );
}

export default function QrGenerator() {
  const [text, setText] = useState("https://github.com/");
  const [fgColor, setFgColor] = useState("#c9d1d9");
  const [bgColor, setBgColor] = useState("#1a1d22");
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setErrorMsg] = useState<string | null>(null);
  const svgRef = useRef<string>("");

  const generate = useCallback(async () => {
    if (!text.trim()) {
      setDataUrl(null);
      svgRef.current = "";
      setErrorMsg(null);
      return;
    }
    try {
      const [png, svg] = await Promise.all([
        QRCode.toDataURL(text, {
          width: size,
          margin,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        }),
        QRCode.toString(text, {
          type: "svg",
          margin,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        }),
      ]);
      setDataUrl(png);
      svgRef.current = svg;
      setErrorMsg(null);
    } catch {
      setErrorMsg("Couldn't generate a QR code for this content.");
      setDataUrl(null);
    }
  }, [text, size, margin, fgColor, bgColor, errorLevel]);

  useEffect(() => {
    // generate() resolves asynchronously; setState happens in a microtask,
    // not synchronously within the effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
  }, [generate]);

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const downloadSvg = () => {
    if (!svgRef.current) return;
    const blob = new Blob([svgRef.current], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass =
    "w-full rounded border border-app-border-strong bg-app-card px-3 py-2 text-[13px] text-app-text outline-none transition focus:border-app-accent";
  const buttonClass =
    "rounded border border-app-border-strong bg-app-button px-3.5 py-2 text-[13px] text-app-text transition hover:bg-app-button-hover";

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5 rounded-lg border border-app-border bg-app-panel p-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="content">
            <SectionLabel>Content</SectionLabel>
          </label>
          <textarea
            id="content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="URL, text, Wi-Fi, contact..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fg">
              <SectionLabel>Foreground color</SectionLabel>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="fg"
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-app-border-strong bg-app-card"
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bg">
              <SectionLabel>Background color</SectionLabel>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="bg"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-app-border-strong bg-app-card"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Presets</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const isActive = fgColor === preset.fg && bgColor === preset.bg;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setFgColor(preset.fg);
                    setBgColor(preset.bg);
                  }}
                  className={`flex items-center gap-2 rounded border px-3 py-1.5 text-[12px] transition ${
                    isActive
                      ? "border-app-accent bg-app-card text-app-text-heading"
                      : "border-app-border-strong bg-app-button text-app-text hover:bg-app-button-hover"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-white/10"
                    style={{ backgroundColor: preset.fg }}
                  />
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="size">
              <SectionLabel>Size: {size}px</SectionLabel>
            </label>
            <input
              id="size"
              type="range"
              min={128}
              max={1024}
              step={32}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="accent-app-accent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="margin">
              <SectionLabel>Margin: {margin}</SectionLabel>
            </label>
            <input
              id="margin"
              type="range"
              min={0}
              max={8}
              step={1}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="accent-app-accent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Error correction</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {ERROR_LEVELS.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setErrorLevel(level.value)}
                className={`rounded border px-3 py-1.5 text-[12px] transition ${
                  errorLevel === level.value
                    ? "border-app-accent bg-app-accent text-white"
                    : "border-app-border-strong bg-app-button text-app-text hover:bg-app-button-hover"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-app-border bg-app-panel p-6">
          {dataUrl ? (
            <img
              src={dataUrl}
              alt="Generated QR code"
              className="h-full w-full object-contain"
            />
          ) : (
            <p className="text-center text-[12px] text-app-text-muted">
              {error ?? "Type something to generate a QR code"}
            </p>
          )}
        </div>
        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={downloadPng}
            disabled={!dataUrl}
            className="flex-1 rounded border border-app-accent bg-app-accent px-4 py-2 text-[13px] font-medium text-white transition hover:bg-app-accent-hover disabled:cursor-not-allowed disabled:border-app-border-strong disabled:bg-app-button disabled:text-app-text-muted"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={downloadSvg}
            disabled={!dataUrl}
            className={`flex-1 ${buttonClass} disabled:cursor-not-allowed disabled:text-app-text-muted`}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
