const express = require('express');
const compression = require('compression');
const zlib = require('zlib');

const app = express();

app.use(compression());

const testData = `
<html>
  <head><title>LinkedIn Test Page</title></head>
  <body>
    <h1>Test Data for LinkedIn Preview</h1>
    <p>This is a large test response designed for testing LinkedIn bot compatibility. This response should appear fully parsed in the LinkedIn Post Inspector tool.</p>
    <div>${'This is a repeated block of text. '.repeat(40000)}</div>
  </body>
</html>
`;

const compressedData = zlib.gzipSync(Buffer.from(testData));

console.log("LG", compressedData.length);

const headers = {
  'Accept-Ranges': 'bytes',
  'Access-Control-Allow-Credentials': 'true',
  'Age': '7',
  'Alt-Svc': 'h3=":443";ma=86400,h3-29=":443";ma=86400,h3-27=":443";ma=86400',
  'Backend': 'dnsresolver',
  'Cache-Control': 'public, max-age=1800',
  'Content-Encoding': 'gzip',
  'Content-Length': compressedData.length,
  'Content-Security-Policy': 'upgrade-insecure-requests',
  'Content-Type': 'text/html; charset=utf-8',
  'Date': new Date().toUTCString(),
  'Is-Vwo-Enabled': 'false',
  'Server': 'rhino-core-shield',
  'Set-Cookie': 'VWO=70.900; Max-Age=34560000; Path=/;',
  'State': 'HIT',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Vary': 'X-Country-Code, Accept-Encoding, X-is-EU, X-is-CN, X-is-US-DPA, X-is-US, X-Device, canary, X-Is-Ad-Light, is-vwo-enabled, x-malcolm, x-malcolm, X-is-EU, X-is-CN, X-is-US-DPA, X-is-US, X-Device, x-backend, canary, X-Is-Ad-Light, is-vwo-enabled',
  'Via': '1.1 google, 1.1 google, 1.1 varnish',
  'X-Backend': 'simple-site-prod',
  'X-Cache': 'HIT',
  'X-Cache-Hits': '2',
  'X-Cicero-Cache': 'MISS',
  'X-City-Code': 'tbilisi',
  'X-Country-Code': 'GE',
  'X-Device': 'doge',
  'X-Envoy-Decorator-Operation': 'production.dns-proxy.svc.cluster.local:80/*',
  'X-Envoy-Upstream-Service-Time': '742',
  'X-Fastly-Backend': '24YyrkkiTBhSwXWzJgvwW6--F_GCP_Cicero_Varnish',
  'X-Fastly-X-Is-Cn': 'false',
  'X-Fastly-X-Is-Us-Dpa': 'false',
  'X-Fastlyttl': '86400.000',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Malcolm': 'A',
  'X-Postal-Code': '0112',
  'X-Region': 'TB',
  'X-Served-By': 'cache-sof1510027-SOF',
  'X-Timer': 'S1715186497.713045,VS0,VE1',
  'X-Yourttl': '1800.000'
};

app.get('/', (req, res) => {
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  
  res.send(compressedData);
});

app.listen(3000, () => {
  console.log('Test server listening on port 3000');
});
