import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../site/index.html", import.meta.url), "utf8");
const contact = await readFile(new URL("../public/antony-contact.vcf", import.meta.url), "utf8");
const app = await readFile(new URL("../site/app.js", import.meta.url), "utf8");
const config = await readFile(new URL("../site/video-config.js", import.meta.url), "utf8");

test("les textes et liens exigés sont présents", () => {
  for (const expected of [
    "Vieux-Ferrette · Alsace",
    "Depuis 1979,",
    "une histoire qui s'affine",
    "Une histoire de famille, de producteurs et de patience.",
    "Entrez dans les caves de la Fromagerie Antony.",
    "Découvrir la Fromagerie",
    "Les tables qui nous font confiance",
    "5 rue de la Montagne",
    "68480 Vieux-Ferrette · France",
    "+33 (0)3 89 40 42 22",
    "https://www.fromagerieantony.fr/",
    "https://www.fromagerieantony.fr/les-tables-qui-nous-font-confiance/"
  ]) assert.ok(html.includes(expected), `Texte manquant : ${expected}`);
});

test("la page propose une vCard Antony complète", () => {
  assert.match(html, /href="\/antony-contact\.vcf"/);
  assert.match(html, /download="fromagerie-antony\.vcf"/);
  for (const expected of [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Fromagerie Antony",
    "ORG:Fromagerie Antony",
    "TEL;TYPE=work,voice:+33389404222",
    "5 rue de la Montagne",
    "68480",
    "https://www.fromagerieantony.fr/",
    "END:VCARD"
  ]) assert.ok(contact.includes(expected), `Donnée vCard manquante : ${expected}`);
});

test("aucun tracker, cookie applicatif ou formulaire n’est présent", () => {
  assert.doesNotMatch(html + app, /google-analytics|gtag\(|facebook\.net|document\.cookie|<form/i);
});

test("le film respecte la confidentialité et ne démarre pas automatiquement", () => {
  assert.match(app, /youtube-nocookie\.com/);
  assert.match(app, /autoplay=0/);
  assert.doesNotMatch(app, /autoplay=1/);
  assert.match(config, /youtubeVideoId/);
  assert.match(html, /Le film sera bientôt disponible/);
});

test("les ressources de marque sont locales", () => {
  assert.match(html, /\/assets\/fromagerie-antony-logo\.png/);
  assert.match(html, /\/assets\/favicon\.png/);
  assert.doesNotMatch(html, /src="https:\/\/(?!antony-heritage-film)/);
});
