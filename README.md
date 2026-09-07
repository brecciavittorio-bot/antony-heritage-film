# Antony Heritage Film

Landing patrimoniale mobile-first de la Fromagerie Antony. Le site est entièrement statique, sans base de données, authentification, paiement, traceur, cookie applicatif ni API payante. Le film reste hébergé sur YouTube en mode **Non répertorié** et est intégré avec le domaine de confidentialité renforcée `youtube-nocookie.com`.

## Développement local

Prérequis : Node.js 20 ou une version plus récente.

```bash
npm install
npm run build
npm run dev
```

Ouvrez ensuite `http://127.0.0.1:4173`. Le projet se construit sans variable d’environnement.

## 1. Publier sur Vercel

1. Créez ou importez le dépôt GitHub `antony-heritage-film` dans Vercel.
2. Conservez les réglages détectés dans `vercel.json` : commande `npm run build`, dossier de sortie `dist`.
3. N’ajoutez aucune variable d’environnement.
4. Lancez le déploiement Production.
5. Vérifiez l’adresse canonique dans `site/index.html`. Elle doit correspondre exactement à l’URL Vercel Production, puis redéployez si elle diffère.

Vercel ne reçoit aucun fichier vidéo : seules les pages, les styles, les images de marque et les scripts légers sont déployés.

## 2. Insérer ou remplacer le film YouTube

Dans YouTube Studio, réglez la visibilité du film sur **Non répertoriée**. Modifiez ensuite un seul fichier :

```text
site/video-config.js
```

Insérez uniquement l’identifiant de onze caractères, et non l’URL complète :

```js
window.ANTONY_FILM = Object.freeze({
  youtubeVideoId: "AbCdEf12345"
});
```

Relancez `npm run build`, puis déployez. Avec un identifiant vide, la visiteuse ou le visiteur voit l’élégant message « Le film sera bientôt disponible ». La lecture automatique est désactivée.

## 3. Générer le QR définitif

Attendez que l’URL Vercel Production soit définitive, puis lancez :

```bash
npm run qr -- https://antony-heritage-film.vercel.app/
```

Le fichier est créé ici :

```text
public/qr/antony-heritage-qr.svg
```

Le QR utilise des modules noirs, un fond ivoire, une zone calme de six modules et la correction d’erreur H. Le SVG est vectoriel et convient à une impression de **30 × 30 mm minimum**. Le QR doit toujours contenir l’URL de la landing, jamais celle de YouTube.

### Contrôle avant impression

1. Imprimez un exemplaire réel à 30 × 30 mm, sans recadrer la zone calme.
2. Testez-le sur un iPhone avec l’appareil photo natif, à 20 cm puis 50 cm, en lumière forte et faible.
3. Testez-le sur Android avec l’appareil photo natif ou Google Lens dans les mêmes conditions.
4. Vérifiez que les deux appareils ouvrent l’URL HTTPS Vercel de la landing.
5. Testez aussi une épreuve posée sur le support bois définitif ; le contraste, le vernis et les reflets peuvent modifier la lecture.
6. Validez le fichier imprimeur uniquement après ces contrôles.

## 4. Transférer le projet à un autre compte Vercel

Le projet n’utilise ni secret ni ressource liée au compte actuel. Deux solutions sont possibles :

- transférer le projet depuis **Vercel → Project Settings → General → Transfer Project** ;
- importer le même dépôt GitHub dans le nouveau compte, puis effectuer un déploiement Production.

Après transfert, contrôlez l’URL Production. Si elle change, mettez à jour l’URL canonique, `og:url` et `og:image` dans `site/index.html`, puis régénérez le QR avant toute nouvelle impression.

## 5. Relier plus tard `heritage.fromagerieantony.fr`

1. Ajoutez `heritage.fromagerieantony.fr` dans **Vercel → Project Settings → Domains**.
2. Créez chez le gestionnaire DNS le CNAME demandé par Vercel.
3. Attendez la validation HTTPS de Vercel.
4. Remplacez dans `site/index.html` l’URL canonique, `og:url` et la racine de `og:image` par `https://heritage.fromagerieantony.fr/`.
5. Redéployez et testez.

Le code fonctionnel ne nécessite aucune autre modification. L’ancien QR peut continuer à fonctionner si l’URL Vercel reste active ; pour une nouvelle impression, générez un QR pointant vers le sous-domaine officiel.

## 6. Mettre à jour textes, logo et liens

- Textes, métadonnées et liens : `site/index.html`
- Styles et couleurs : `site/styles.css`
- Identifiant YouTube : `site/video-config.js`
- Logo officiel local : `public/assets/fromagerie-antony-logo.png`
- Favicon : `public/assets/favicon.png`
- Visuel Open Graph : `public/assets/antony-heritage-og.png`

Conservez le logo officiel sans transformation. Après chaque changement :

```bash
npm test
npm run build
```

## Structure

```text
site/                 Page, styles, JavaScript et configuration vidéo
public/assets/        Logo, favicon et visuel de partage locaux
public/qr/            Destination du QR définitif
scripts/              Build, serveur local et générateur QR
tests/                Contrôles automatiques
vercel.json           Configuration d’hébergement et en-têtes de sécurité
```
