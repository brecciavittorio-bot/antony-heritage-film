import { access, mkdir, writeFile } from "node:fs/promises";
import QRCode from "qrcode";

const productionUrl = process.argv[2];
if (!productionUrl) {
  console.error("Usage : npm run qr -- https://votre-url-de-production.vercel.app/");
  process.exit(1);
}

let url;
try {
  url = new URL(productionUrl);
} catch {
  console.error("L’URL fournie n’est pas valide.");
  process.exit(1);
}

if (url.protocol !== "https:") {
  console.error("Le QR de production doit utiliser une URL HTTPS.");
  process.exit(1);
}

const outputDirectory = new URL("../public/qr/", import.meta.url);
const outputFile = new URL("antony-heritage-qr.svg", outputDirectory);
await mkdir(outputDirectory, { recursive: true });

const svg = await QRCode.toString(url.href, {
  type: "svg",
  errorCorrectionLevel: "H",
  margin: 6,
  color: { dark: "#000000", light: "#FFFFFF" },
  width: 1134
});

await writeFile(outputFile, svg, "utf8");
await access(outputFile);
console.log(`QR généré : ${outputFile.pathname}`);
console.log(`Destination : ${url.href}`);
