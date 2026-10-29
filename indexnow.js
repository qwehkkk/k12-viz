#!/usr/bin/env node
/**
 * Push every URL in dist/sitemap.xml to IndexNow.
 *
 * IndexNow is an open "ping" protocol: instead of waiting for a crawler to
 * come back on its own schedule, the site tells participating search engines
 * which URLs changed. Bing, Yandex, Seznam and Naver accept it today.
 *
 * The key file must be reachable on the live site before the first submit:
 *   1. node build.js            (build.js copies <key>.txt into dist)
 *   2. commit + push            (Pages deploys)
 *   3. verify https://teach.toolona.com/<key>.txt returns 200
 *   4. node indexnow.js         (submit every URL in dist/sitemap.xml)
 *
 *   node indexnow.js --dry      # print the payload, submit nothing
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.json'), 'utf8'));
const key = site.indexNowKey;
if (!key || !site.url) {
  console.error('site.json must contain "url" and "indexNowKey".');
  process.exit(1);
}
const keyFile = key + '.txt';

const xml = fs.readFileSync(path.join(ROOT, 'dist', 'sitemap.xml'), 'utf8');
const urls = [];
const re = /<loc>([^<]+)<\/loc>/g;
let m;
while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());

if (!urls.length) {
  console.error('No URLs found in dist/sitemap.xml — run node build.js first.');
  process.exit(1);
}

const host = site.url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
const payload = {
  host: host,
  key: key,
  keyLocation: site.url.replace(/\/+$/, '') + '/' + keyFile,
  urlList: urls
};

console.log('host        ' + host);
console.log('key file    /' + keyFile);
console.log('submitting  ' + urls.length + ' URLs');

if (process.argv.includes('--dry')) {
  console.log(JSON.stringify(payload).slice(0, 400) + ' ...');
  process.exit(0);
}

fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload)
})
  .then(function (res) {
    return res.text().then(function (body) {
      if (res.status === 200 || res.status === 202) {
        console.log('OK  ' + res.status + '  search engines accepted the URLs.');
      } else {
        console.log('status ' + res.status + '  ' + body.slice(0, 300));
        process.exitCode = 1;
      }
    });
  })
  .catch(function (err) {
    console.error('Request failed: ' + err.message);
    process.exitCode = 1;
  });
