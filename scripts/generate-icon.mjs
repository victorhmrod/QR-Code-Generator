// Generates the app icon (public/icon.png, public/icon.ico) from a QR code
// encoding "QR", rendered in the app's own accent color on its dark
// background — the icon is a real, functioning QR code, not just an image
// styled to look like one.
import QRCode from "qrcode";
import pngToIco from "png-to-ico";
import { writeFileSync } from "node:fs";

const ACCENT = "#58a6ff";
const BG = "#1e2126";

await QRCode.toFile("public/icon.png", "QR", {
  width: 512,
  margin: 1,
  errorCorrectionLevel: "H",
  color: { dark: ACCENT, light: BG },
});

const ico = await pngToIco("public/icon.png");
writeFileSync("public/icon.ico", ico);

console.log("Wrote public/icon.png and public/icon.ico");
