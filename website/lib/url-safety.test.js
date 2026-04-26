import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateTargetUrl } from './url-safety.js';

test('accepts https URL', () => {
  const r = validateTargetUrl('https://stripe.com');
  assert.equal(r.ok, true);
  assert.equal(r.url, 'https://stripe.com/');
});

test('accepts http URL on port 80', () => {
  const r = validateTargetUrl('http://example.com:80');
  assert.equal(r.ok, true);
});

test('normalizes bare hostname to https', () => {
  const r = validateTargetUrl('example.com');
  assert.equal(r.ok, true);
  assert.equal(r.url, 'https://example.com/');
});

test('rejects localhost', () => {
  const r = validateTargetUrl('http://localhost');
  assert.equal(r.ok, false);
  assert.equal(r.status, 400);
});

test('rejects *.local hostnames', () => {
  const r = validateTargetUrl('https://printer.local');
  assert.equal(r.ok, false);
});

test('rejects *.localhost hostnames', () => {
  const r = validateTargetUrl('https://app.localhost');
  assert.equal(r.ok, false);
});

test('rejects 127.0.0.1', () => {
  const r = validateTargetUrl('http://127.0.0.1');
  assert.equal(r.ok, false);
});

test('rejects 10.x private range', () => {
  const r = validateTargetUrl('http://10.1.2.3');
  assert.equal(r.ok, false);
});

test('rejects 192.168.x private range', () => {
  const r = validateTargetUrl('http://192.168.0.1');
  assert.equal(r.ok, false);
});

test('rejects 172.16–31.x private range', () => {
  const r = validateTargetUrl('http://172.20.0.5');
  assert.equal(r.ok, false);
});

test('allows 172.15.x (outside private range)', () => {
  const r = validateTargetUrl('http://172.15.0.1');
  assert.equal(r.ok, true);
});

test('rejects 169.254.x link-local', () => {
  const r = validateTargetUrl('http://169.254.0.1');
  assert.equal(r.ok, false);
});

test('rejects file:// scheme', () => {
  const r = validateTargetUrl('file://evil');
  assert.equal(r.ok, false);
});

test('rejects javascript: scheme', () => {
  const r = validateTargetUrl('javascript:alert(1)');
  assert.equal(r.ok, false);
});

test('rejects non-80/443 port', () => {
  const r = validateTargetUrl('https://example.com:22');
  assert.equal(r.ok, false);
});

test('rejects port 3000', () => {
  const r = validateTargetUrl('https://example.com:3000');
  assert.equal(r.ok, false);
});

test('rejects IPv6 loopback ::1', () => {
  const r = validateTargetUrl('http://[::1]');
  assert.equal(r.ok, false);
});

test('rejects IPv6 [::1]:3000', () => {
  const r = validateTargetUrl('http://[::1]:3000');
  assert.equal(r.ok, false);
});

test('rejects IPv6 unique-local fc00::', () => {
  const r = validateTargetUrl('http://[fc00::1]');
  assert.equal(r.ok, false);
});

test('rejects IPv6 link-local fe80::', () => {
  const r = validateTargetUrl('http://[fe80::1]');
  assert.equal(r.ok, false);
});

test('rejects IPv4-mapped IPv6 loopback ::ffff:127.0.0.1', () => {
  const r = validateTargetUrl('http://[::ffff:127.0.0.1]');
  assert.equal(r.ok, false);
});

test('rejects IPv4-mapped IPv6 in hex-piece form ::ffff:7f00:1', () => {
  // WHATWG URL parser re-serializes "::ffff:127.0.0.1" as "::ffff:7f00:1".
  const r = validateTargetUrl('http://[::ffff:7f00:1]');
  assert.equal(r.ok, false);
});

test('rejects IPv4-mapped IPv6 cloud metadata ::ffff:169.254.169.254', () => {
  const r = validateTargetUrl('http://[::ffff:169.254.169.254]');
  assert.equal(r.ok, false);
});

test('rejects IPv4-mapped IPv6 RFC1918 ::ffff:10.0.0.1', () => {
  const r = validateTargetUrl('http://[::ffff:10.0.0.1]');
  assert.equal(r.ok, false);
});

test('rejects IPv4-compatible IPv6 ::127.0.0.1', () => {
  const r = validateTargetUrl('http://[::127.0.0.1]');
  assert.equal(r.ok, false);
});

test('rejects NAT64 64:ff9b:: with private IPv4 tail', () => {
  const r = validateTargetUrl('http://[64:ff9b::169.254.169.254]');
  assert.equal(r.ok, false);
});

test('rejects fully expanded IPv4-mapped 0:0:0:0:0:ffff:7f00:1', () => {
  const r = validateTargetUrl('http://[0:0:0:0:0:ffff:7f00:1]');
  assert.equal(r.ok, false);
});

test('allows public IPv6 (Google DNS)', () => {
  const r = validateTargetUrl('http://[2001:4860:4860::8888]');
  assert.equal(r.ok, true);
});

test('allows public IPv6 (Cloudflare DNS)', () => {
  const r = validateTargetUrl('http://[2606:4700:4700::1111]');
  assert.equal(r.ok, true);
});

test('allows IPv4-mapped public IPv4 ::ffff:8.8.8.8', () => {
  const r = validateTargetUrl('http://[::ffff:8.8.8.8]');
  assert.equal(r.ok, true);
});

test('rejects empty string', () => {
  const r = validateTargetUrl('');
  assert.equal(r.ok, false);
});

test('rejects garbage', () => {
  const r = validateTargetUrl('http://');
  assert.equal(r.ok, false);
});
