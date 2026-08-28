<p align="center">
  <img src="public/icon.png" width="120" alt="QR Code Generator icon">
</p>

<h1 align="center">QR Code Generator</h1>

<p align="center">
  A fast, native desktop app for generating custom QR codes.<br>
  Colors, size, error correction, PNG/SVG export — all offline, no server involved.
</p>

<p align="center">
  <img alt="platform" src="https://img.shields.io/badge/platform-Windows-0078D6">
  <img alt="language" src="https://img.shields.io/badge/language-TypeScript-blue">
  <img alt="UI" src="https://img.shields.io/badge/UI-React%20%2B%20Electron-41CD52">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
</p>

---

## What it is

QR Code Generator is a small, focused desktop tool: type text or a URL, tune
the look, and export a real, scannable QR code — no browser tab, no upload,
no tracking. Codes are generated locally with the [`qrcode`](https://www.npmjs.com/package/qrcode)
library (ISO/IEC 18004-compliant) and rendered directly to PNG and SVG.

## Features

- **Live preview** — the QR code updates as you type, no "generate" button.
- **Full color control** — pick foreground and background colors (color
  picker or hex input), or use one of the built-in presets.
- **Size and margin** — from 128px up to 1024px, adjustable quiet-zone margin.
- **Error correction levels** — Low/Medium/High/Max (7%–30%), so the code
  still scans even if partially damaged or covered by a logo.
- **PNG and SVG export** — raster for quick sharing, vector for print.
- **Dark, information-dense UI** — no unnecessary chrome, built to match a
  focused dev-tool aesthetic.
- **Fully offline** — runs as a native Electron app, nothing leaves your
  machine.

## Installing

Grab the latest `QR Code Generator Setup <version>.exe` from the
[Releases](../../releases) page and run it, or use the portable
`QR Code Generator <version>.exe` build — no installation required.

The installer is not code-signed yet. Microsoft Defender SmartScreen may show
a "Windows protected your PC" warning with "Unknown publisher" when you run
it. Choose **More info** and then **Run anyway** to continue.

## Building from source

### Prerequisites

- [Node.js](https://nodejs.org/) 20+

### Run in development

```bash
npm install
npm run dev
```

This opens the app window with hot reload.

### Build the installer

```bash
npm run build
```

Produces `QR Code Generator Setup <version>.exe` (installer) and
`QR Code Generator <version>.exe` (portable) in `dist-installer/`.

## Stack

- [Electron](https://www.electronjs.org) — desktop packaging
- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript — UI
- [Tailwind CSS](https://tailwindcss.com) — styling
- [qrcode](https://www.npmjs.com/package/qrcode) — QR code generation

## License

MIT — Copyright (C) 2026 Victor H
