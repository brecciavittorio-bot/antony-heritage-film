import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(new URL("../site/", import.meta.url), dist, { recursive: true });
await cp(new URL("../public/", import.meta.url), dist, { recursive: true });

console.log(`Site statique généré dans ${dist.pathname.replace(root.pathname, "")}`);
