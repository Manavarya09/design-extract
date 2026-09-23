// A page whose network never goes idle (analytics beacons, polling, video)
// must not cost Playwright's full 30s default wait for `networkidle`.
// duolingo.com and paypal.com both hit that 30s ceiling on every run.

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

import { crawlPage } from '../src/crawler.js';

const BUSY_PAGE = `<!doctype html><html><head><title>busy</title>
<style>body{font-family:Georgia,serif;color:#123456;background:#fff}</style></head>
<body><h1>Always polling</h1>
<script>setInterval(() => fetch('/poll?' + Date.now()).catch(() => {}), 200);</script>
</body></html>`;

describe('crawlPage — busy network', () => {
  let server;
  let url;

  before(async () => {
    server = createServer((req, res) => {
      if (req.url.startsWith('/poll')) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end('ok');
        return;
      }
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(BUSY_PAGE);
    });
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    url = `http://127.0.0.1:${server.address().port}/`;
  });

  after(() => new Promise((r) => server.close(r)));

  it('stops waiting for networkidle well before 30s', { timeout: 60000 }, async () => {
    const started = Date.now();
    const data = await crawlPage(url);
    const seconds = (Date.now() - started) / 1000;
    assert.ok(data.light.computedStyles.length > 0, 'page was still extracted');
    assert.ok(seconds < 20, `crawl took ${seconds.toFixed(1)}s`);
  });
});
